import React, { Component } from 'react'
import { getCommentsForPost, getRepliesForComment } from 'mockApi'
import SingleComment from './SingleComment'
import ReplyInput from './ReplyInput'


export default class Comments extends Component {
  constructor (props) {
    super(props)
    const { id, type } = props
    let result
    if (type === 'post') {
      result = getCommentsForPost(id)
    } else {
      result = getRepliesForComment(id)
    }
    this.state = {
      id,
      type,
      result
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.id) {
      if (nextProps.type === 'reply') {
        const updatedResult = getRepliesForComment(nextProps.id)
        if (updatedResult.length) {
          return {
            result: updatedResult
          }
        }
      } else {
        const updatedResult = getCommentsForPost(nextProps.id)
        if (updatedResult.length) {
          return {
            result: updatedResult
          }
        }
      }
    }
    return null
  }

  refreshList = () => {
    const { id, type } = this.props
    let updatedResult;
    if (type === 'post') {
      updatedResult = getCommentsForPost(id)
    } else {
      updatedResult = getRepliesForComment(id)
    }
    this.setState({
      result: updatedResult
    })
  }

  commentsList = () => {
    const { result } = this.state
    if (result) {
      return (
        <div>
          {result.map(item => {
            return (
              <SingleComment
                refreshList={this.refreshList}
                key={item.id}
                id={item.id}
                up={item.up}
                down={item.down}
                score={item.score}
                author={item.author}
                text={item.text}
                replies={item.replies}
                userUp={item.userUp}
                userDown={item.userDown}
              />
            )
          })}
        </div>
      )
    } else {
      return (<div className="text-light my-2">Loading replies</div>)
    }
  }

  render () {
    const { type, id } = this.state
    return (
      <div className={`text-left ${type === 'post' ? 'px-2 card-wrapper my-3 py-2' : ''}`}>
        {
          type === 'post'
          ? (
            <div className="my-2">
              <ReplyInput id={id} update={this.props.commentUpdate} type="comment"/>
            </div>
          )
          : null
        }
        { this.commentsList() }
      </div>
    )
  }
}
