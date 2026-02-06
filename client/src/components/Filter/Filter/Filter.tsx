import TypeBar from '../TypeBar'
import BrandBar from '../BrandBar'
import LimitBar from '../LimitBar'
import { Accordion, Button, Offcanvas } from 'react-bootstrap'
import './Filter.css'
import { useState } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'

const Filter = () => {

    const [show, setShow] = useState(false)

  return (
    <div className='flex flex-col gap-3'>
        <div className='hidden sm:block flex flex-col space-y-4'>
            <div className='font-bold text-2xl mb-3'>Filter</div>
            <Accordion>
                <Accordion.Header className='custom-accordion-header'>Type</Accordion.Header>
                <Accordion.Body className='px-0'>
                    <TypeBar/>
                </Accordion.Body>
            </Accordion>
            <Accordion>
                <Accordion.Header className='custom-accordion-header'>Brand</Accordion.Header>
                <Accordion.Body className='px-0'>
                    <BrandBar/>
                </Accordion.Body>
            </Accordion>
            <LimitBar/>
        </div>
        
        <div className='sm:hidden'>
            <Offcanvas show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='flex flex-col gap-3'>
                    <Accordion>
                        <Accordion.Header className='custom-accordion-header'>Type</Accordion.Header>
                        <Accordion.Body className='border-1 border-zinc-700 rounded-b-xl'>
                            <TypeBar/>
                        </Accordion.Body>
                    </Accordion>
                    <Accordion>
                        <Accordion.Header className='custom-accordion-header'>Brand</Accordion.Header>
                        <Accordion.Body className='border-1 border-zinc-700 rounded-b-xl'>
                            <BrandBar/>
                        </Accordion.Body>
                    </Accordion>
                    <LimitBar/>

                    <Button variant='secondary' onClick={() => setShow(false)}>Confirm</Button>
                </Offcanvas.Body>
            </Offcanvas>
            <div className='font-bold text-2xl mb-3 flex align-items-center gap-2 justify-end'>
                <span>Filter</span>
                <AdjustmentsHorizontalIcon className='w-6 h-6' onClick={() => setShow(true)} />
            </div>
        </div>
    </div>
  )
}

export default Filter