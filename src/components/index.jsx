import React, { Fragment, useState } from 'react'
import useFetch from 'hooks/useFetch'
import Feed from './Feed'
import Sidebar from './Sidebar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { addNewPost } from 'mockApi'


export default function SubReddit (props) {
  const { subName } = props
  const { response, loading, error } = useFetch(
    `https://www.reddit.com/r/${subName}/about.json`
  );
  const [show, setShow] = useState(false);
  const [updating, setUpdating] = useState(false)
  const [form, setForm] = useState({userType: 'patient'})
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sideBar = () => {
    const subData = response.data
    return (
      <Sidebar
        title={subData.title}
        description={subData.public_description}
        members={subData.subscribers}
        active={subData.accounts_active}
        createdOn={subData.created}
        showModal={handleShow}
      />
    )
  }

  const showLoading = () => {
    return <div>Loading...</div>
  }

  const showError = () => {
   return <div>Something went wrong...please refresh</div>;
  }

  const handleChange = (e) => {
    const id = e.target.id
    console.log(e.target.type)
    let obj = form
    obj[id] = e.target.value
    setForm(obj)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let postObj = {
      subreddit: "backpain",
      userType: form.userType,
      type: 'experience',
      selftext: form.selfText,
      author_fullname: "john",
      saved: false,
      title: form.title,
      subreddit_name_prefixed: "r/backpain",
      downs: 0,
      name: "john",
      upvote_ratio: 0,
      ups: 0,
      score: 0,
      created: Date.now(),
      subreddit_id: "t5_2rdud",
      id: Math.floor(Math.random() * 1000),
      author: "John",
      num_comments: 0,
      tags
    }
    setUpdating(true)
    await addNewPost(postObj)
    setTags([])
    setForm({userType: 'patient'})
    handleClose()
    setUpdating(false)

  } 

  const tagInput = (e) => {
    e.preventDefault()
    const val = e.target.value
    setTag(val)
  }


  const addTag = () => {
    if (!tags.includes(tag)) {
      let newTags = tags
      newTags.push(tag)
      setTags(newTags)
      setTag('')
    } 
  }

  const mainContent = () => {
    return (
      <Fragment>
        <div className="main-content-wrapper">
          <Container>
            <Row>
              <Col xs={12} md={7}>
                { updating 
                ? showLoading()
                : <Feed subName={subName}/>
                }
              </Col>
              <Col xs={0} md={4}>
                { sideBar() }
              </Col>
            </Row>
            <Row>
            <Modal
              contentClassName="newpost-modal bg-dark text-light"
              centered
              show={show} 
              onHide={handleClose}
            >
              <Modal.Header className="py-2" closeButton>
                <div className="my-1">Add New Post</div>
              </Modal.Header>
              <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} xs="12">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      className="reply-input"
                      id="title"
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs="12">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      className="reply-input"
                      id="selfText"
                      type="textarea"
                      as="textarea"
                      name="content"
                      value={form.selfText}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs="12" onChange={handleChange}>
                    <Form.Label className="about-description">User Type</Form.Label>
                    <Form.Control required id="userType" as="select">
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="d-flex" as={Col} xs="12">
                    <Form.Control
                      className="reply-input flex-fill"
                      id="tags"
                      type="text"
                      name="tag"
                      value={tag}
                      placeholder="Enter Relevant Tags"
                      onChange={tagInput}
                    />
                    <Button onClick={addTag} className="text-light reply-button">Add</Button>
                  </Form.Group>
                  <Form.Group className="d-flex" as={Col} xs="12">
                    <div className="d-flex">Current Tags:
                      {tags.map(item => {
                        return <div className="mx-1 px-2 border" key={`${item}-form-tag`}>{item}</div>
                      })}
                    </div>
                  </Form.Group>
                  <Button className="ml-auto mr-2" type="submit">Add Post</Button>
                </Form.Row>
              </Form>
              </Modal.Body>
            </Modal>
            </Row>
          </Container>
        </div>
      </Fragment>
    )
  }

  return (
    <div className="sub-wrapper">

      {loading && showLoading()}
      {response && mainContent()}
      {error && showError()}
    </div>
  )
}