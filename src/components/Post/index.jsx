import React, { Component } from 'react'
import { getPostById } from 'mockApi'
import SingleCard from 'components/Feed/SingleCard'
import Comments from 'components/Post/Comments'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



class Post extends Component {
  constructor (props) {
    super(props)
    let postId = props.match.params.id
    let postData = getPostById(postId)
    this.state = {
      postId,
      postData
    }
  }

  refreshList = () => {
    const { postId } = this.state
    let postData = getPostById(postId)
    this.setState({
      postData
    })
  }

  postCard = () => {
    const { score, title, selftext, num_comments, userType, author, id, userUp, userDown, tags } = this.state.postData
    return (
      <SingleCard 
        id={id}
        key={id}
        title={title}
        description={selftext}
        score={score}
        comments={num_comments}
        userType={userType}
        author={author}
        userUp={userUp}
        userDown={userDown}
        refreshList={this.refreshList}
        tags={tags}
        type="single"
      />
    )
  }

  postComments = () => {
    const { id } = this.state.postData
    return (
      <Comments key={`comment-wrapper-${id}`} id={id} type="post" commentUpdate={this.refreshList} /> 
    )
  }

  render () {
    return (
      <div className="main-content-wrapper">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12}>
              { this.postCard()}
            </Col>
            <Col xs={12}>
              <div className="text-light">Comments</div>
              { this.postComments()}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Post;