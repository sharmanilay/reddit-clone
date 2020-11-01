import React, { useState } from 'react'
import { addNewComment } from 'mockApi'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function ReplyInput (props) {
  const { id, update, type } = props
  const [reply, setReply] = useState('')

  const addComment = async (e) => {
    e.preventDefault()
    const commentObject = {
      type,
      text: reply,
      author: 'John',
      commentToId: id
    }
    await addNewComment(commentObject)
    setReply('')
    update()
  }

  const setReplyInput = (e) => {
    const value = e.target.value
    setReply(value)
  }

  return (
    <Form onSubmit={addComment} className="d-flex comment-form">
      <Form.Control value={reply} onChange={setReplyInput} required className="reply-input flex-fill" type="text" placeholder="Enter your reply" />
      <Button className="text-light reply-button" type="submit">Reply</Button>
    </Form>
  )
}