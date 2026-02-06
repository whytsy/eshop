import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import { getDevice } from "../../../http/deviceAPI"
import { toast } from "react-toastify"
import { addToCart } from "../../../http/userAPI"
import { Button, Carousel, Col, Container, Row } from "react-bootstrap"
import { useStore } from "../../../store/StoreContext"
import type { FullDeviceDto } from "../../../types/device.types"
import { hostURL } from "../../../http/helper"
import { handlerUncaughtError, isErrorResponse } from "../../../http/errors/ErrorHandler"

const Device = observer(() => {
  const {id} = useParams()
  const {user} = useStore()
  const [currentDevice, setCurrentDevice] = useState<FullDeviceDto>()
  const [loading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    const findDevice = async (id: number) => {
      try {
        const result = await getDevice(id)
        if (!result || isErrorResponse(result)) {
          return navigate("not-found")
        }
        
        setCurrentDevice(result)
        setIsLoading(false)
      } catch (e) {
        handlerUncaughtError(e)
      }
    }

    findDevice(Number(id))
  }, [])

  const click = async () => {
    if (!user.isAuth) {
      toast.info("Need to login first")
      return navigate("/login")
    }

    if (!currentDevice) {
      return toast.error("Device is not defined")
    }

    if (currentDevice.quantityInStock < 1) {
      return toast.error("Not enough items in stock")
    }
    
    const response = await addToCart(currentDevice.id)

    if (response && isErrorResponse(response)) {
      response.errors.forEach(error => toast.error(error.msg))
    } else {
      toast.success("Item added successfully")
    }
  }

  return (
    <>
      {currentDevice && !loading ?
      <Container>
        <Row>
          <Col sm={12} md={8}>
            <Carousel>
              {currentDevice.images.map(image => 
                      <Carousel.Item className="w-60 h-95">
                          <img
                              src={hostURL + image.imageUrl}
                              className="w-full h-full object-fit-contain"
                          />
                      </Carousel.Item>
              )}
            </Carousel>
          </Col>
          <Col sm={4} className="flex flex-col border-1 border-[var(--bs-border-color)] rounded-lg p-4 gap-4">
            <span
              className="font-bold text-3xl text-center"
            >In Stock: {currentDevice.quantityInStock}
            </span>
            <span
              className="font-bold text-3xl text-center"
            >Price: {currentDevice.price}</span>
            <Button
              active={currentDevice.quantityInStock > 0}
              variant="success"
              onClick={click}
              className=""
            >Add to cart</Button>
          </Col>
        </Row>
        <Row>
          <Col className="p-4 space-y-6">
            <Row>
              <span
                className="font-bold text-3xl"
              >{`${currentDevice.type.name} ${currentDevice.name}`}</span>
            </Row>
            <Row>
              <h1>Specifications</h1>
              {
                currentDevice.info.map(info => 
                  <Row key={info.id}
                    className="p-3 border-b-1 border-[var(--bs-border-color)] even:bg-gray-300 odd:bg-gray-200 dark:even:bg-gray-600 dark:odd:bg-gray-700"
                  >
                    <Col sm={3}>{info.title}</Col>
                    <Col sm={8}>{info.description}</Col>
                  </Row>
                )
              }
            </Row>
          </Col>
        </Row>
      </Container>
      :
      <></>
      }
    </>
  )
})

export default Device