import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp,faArrowAltCircleDown, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import { upvoteApi, downvoteApi } from 'mockApi'
import Comments from './Comments'
import ReplyInput from './ReplyInput'


export default function SingleComment (props) {
  const { score, author, text, replies, id, refreshList, userUp, userDown } = props
  const [showReply, setShowReply] = useState(false)

  useEffect(() => {
    refreshList(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replies]);

  const showComments = () => {
    return (
      <Comments key={`comment-wrapper-${id}`} id={id} type="reply" />
    )
  }

  const updateComment = () => {
    setShowReply(false)
    refreshList()
  }

  const upVote = () => {
    upvoteApi(id, 'comment')
    refreshList()
  }

  const downVote = () => {
    downvoteApi(id, 'comment')
    refreshList()
  }

  return (
    <div className="single-comment py-2 d-flex">
      <div className="mr-3 d-flex flex-column">
        <Image src="https://placeimg.com/20/20/people" roundedCircle/>
        <div className="my-2 h-100 border-left border-secondary align-self-center"></div>
      </div>
      <div className="flex-fill">
        <div className="comment-author">{author}</div>
        <div className="comment-text">
          {text}
        </div>
        <div className="d-flex">
          <div>
            <Button onClick={upVote} className="text-light" variant="link" >
              <FontAwesomeIcon color={userUp ? 'green' : 'white'} icon={faArrowAltCircleUp} />
            </Button>
          </div>
          <div className="members-count align-self-center">{ score }</div>
          <div>
            <Button onClick={downVote} className="text-light" variant="link" >
              <FontAwesomeIcon color={userDown ? 'red' : 'white'} icon={faArrowAltCircleDown} />
            </Button>
          </div>
          <div className="members-count d-flex">
            <FontAwesomeIcon className="mx-1 align-self-center" icon={faCommentAlt} />
            <span className="align-self-center author-title">{ replies.length }</span>
          </div>
          <div>
            { showReply
            ? <Button onClick={() => setShowReply(false)} variant="link" className="text-secondary">Hide</Button>
            : <Button onClick={() => setShowReply(true)} variant="link" className="text-secondary">Reply</Button>
            }
          </div>
        </div>
        <div>
         { showReply
          ? <ReplyInput id={id} update={updateComment} type="reply"/>
          : null
         }
        </div>
        <div>
          { replies.length > 0 ? showComments() : null}
        </div>
      </div>
    </div>
  )
}