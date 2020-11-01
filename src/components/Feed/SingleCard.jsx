import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp,faArrowAltCircleDown, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import { upvoteApi, downvoteApi } from 'mockApi'
import { useHistory, useLocation } from "react-router-dom";

export default function SingleCard (props) {
  let history = useHistory()
  let location = useLocation();
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  const { score, title, description, comments, userType, author, type, id , userUp, userDown, refreshList, tags } = props

  const showPost = () => {
    if (location.pathname !== `/post/${id}`) {
      history.push(`/post/${id}`)
    }
  }

  const upVote = () => {
    upvoteApi(id, 'post')
    refreshList()
  }

  const downVote = () => {
    downvoteApi(id, 'post')
    refreshList()
  }

  return (
    <div className={`my-3 py-2 px-2 text-left card-wrapper ${hovered ? 'border-title' : ''}`}>
      <div className="d-flex px-1">
        <div className="d-flex flex-column my-auto mr-2">
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
        </div>
        <div className="flex-fill">
        <div className="mb-2 d-flex author-title justify-content-between ">
          <div>posted by u/{author}</div>
          <div>{ userType }</div>
        </div>
          <div onClick={showPost} onMouseEnter={toggleHover} onMouseLeave={toggleHover} className={`text-light ${hovered ? 'cursor-pointer' : ''}`}>{title}</div>
          <div className="about-description my-2">
            { description.length >= 300 && type === 'list' ? `${description.slice(0, 300)}...` : description }
          </div>
          <div className="d-flex my-2">
            <div className="mr-5">
              <div className="members-count d-flex">
                <FontAwesomeIcon className="mx-1 align-self-center" icon={faCommentAlt} />
                <span className="align-self-center ml-2 author-title">{ comments } Comments</span>
                <span className="align-self-center author-title ml-2">Tags:</span>
                <span className="align-self-center author-title ml-1">
                  {tags.map((item, index) => {
                    return <span key={`${item}-${index}`}>{`${item}${index !== tags.length - 1 ? ', ' : ''}` }</span>
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}