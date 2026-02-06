import { Col, Container, Row } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <>
    <div className='w-8/10 mt-auto'>
        <Container fluid className='p-4 bg-linear-to-bl from-zinc-700 to-black text-zinc-50 rounded-xl'>
            <Row>
                <Col xs={9} className='flex flex-col gap-2'>
                    <span className='font-bold text-xl'>Support</span>
                    <div className='flex flex-col'>
                        <a className='link-support' href='mailto:support@mail.com'>Contact Us</a>
                        <a className='link-support' href='#'>Shipping</a>
                        <a className='link-support' href='#'>Return</a>
                        <a className='link-support' href='#'>FAQ</a>
                    </div>
                </Col>
                <Col>
                    <div className='flex flex-col justify-end h-full'>
                        <span className='text-zinc-500'>Social media</span>

                    </div>
                </Col>
            </Row>
            
        </Container>
    </div>
    
    <div className='w-full h-full flex align-items-center border-t-1 border-zinc-300 dark:border-zinc-600 px-5 py-4 mt-3'>
        <div className='text-zinc-500'>Copyright &copy; 2025. All rights Reserved.</div>
    </div>
    </>
  )
}

export default Footer