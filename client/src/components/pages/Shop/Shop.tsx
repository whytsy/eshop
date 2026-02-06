import { observer } from "mobx-react-lite"
import SearchBar from "../../Search/SearchBar"
import { Col, Container, Row } from "react-bootstrap"
import DeviceList from "../../DeviceList/DeviceList"
import Filter from "../../Filter/Filter/Filter"

const Shop = observer(() => {
  return (
    <Container fluid className="space-y-12">
      <Row className="px-4 space-y-4 pb-6 md:pb-0 h-28 md:h-20 items-center border-b-1 border-zinc-300 dark:border-zinc-600">
        <Col xs={12} md={4} className="font-bold text-sm md:text-2xl text-center sm:text-left">
          Reimagine Your Tech
        </Col>
        <Col className="flex justify-center md:justify-end">
          <SearchBar/>
        </Col>
      </Row>
      
      <Row>
        <Col xs={12} md={3} xl={3}>
          <Filter/>
        </Col>
        <Col>
          <DeviceList />
        </Col>
      </Row>
    </Container>
  )
})

export default Shop