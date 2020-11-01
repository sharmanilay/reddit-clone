import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useHistory } from 'react-router-dom'

export default function SubDetail (props) {
  const { title, displayName } = props
  let history = useHistory();

  const home = () => {
    history.push('/')
  }

  return (
    <div className="p-4 bg-secondary">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="d-flex">
              <div className="sub-avatar">
                <Image src="https://placeimg.com/50/50/any" roundedCircle/>
              </div>
              <div className="mx-4 sub-info">
                <div onClick={home} className="cursor-pointer sub-title text-light">
                  { title }
                </div>
                <div className="sub-name text-light">
                  { displayName }
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}