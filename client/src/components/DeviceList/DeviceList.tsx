import { observer } from 'mobx-react-lite'
import DeviceItem from "./DeviceItem"
import { useStore } from "../../store/StoreContext"
import PaginationBlock from "../Pagination/PaginationBlock"
import { useEffect, useState } from "react"
import { getAllDevices } from "../../http/deviceAPI"
import { isErrorResponse } from "../../http/errors/ErrorHandler"
import { toast } from "react-toastify"
import { getAllBrands } from "../../http/brandAPI"
import { getAllTypes } from "../../http/typeAPI"
import { Col, Container, Row, Spinner } from "react-bootstrap"

const DeviceList = observer(() => {

  const {device} = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllTypes().then(data => {
      if (isErrorResponse(data)) {
        return toast.error("Error while getting types")
      }
      device.setTypes(data)
    })
    getAllBrands().then(data => {
      if (isErrorResponse(data)) {
        return toast.error("Error while getting brands")
      }

      device.setBrands(data)
    })
    getAllDevices(device.page, device.limit).then(data => {
      if (isErrorResponse(data)) {
        return toast.error("Error while getting devices")
      }

      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getAllDevices(device.page, device.limit, device.selectedType?.id, device.selectedBrand?.id, device.query).then(data => {
      if (isErrorResponse(data)) {
        return toast.error("Error while getting devices")
      }
      
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
      setLoading(false)
    })
  }, [device.page, device.limit, device.selectedBrand, device.selectedType])

  const renderDevices = () => {
    return (
        device.devices.map(deviceItem =>
          <Col xs={12} sm={6} lg={4} className='mb-6' key={deviceItem.id}>
            <DeviceItem key={deviceItem.id} deviceItem={deviceItem} />
          </Col>
        )
    )
  }

  return (
    <>
      {
        loading ? <Spinner animation="grow"/> :
        <>
          <Container className="px-8 max-w-9/10 space-y-8 mt-5">
            {
              device.devices.length === 0
              ?
                <div className="font-bold text-2xl text-center">No items found</div>
              :
              <>
                <Row>
                  {renderDevices()}
                </Row>
                <Row>
                  <Col>
                    <PaginationBlock />
                  </Col>
                </Row>
              </>
            }
          </Container>
          
        </>
      }
    </>
  )
})

export default DeviceList