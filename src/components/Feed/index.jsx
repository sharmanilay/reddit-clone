import React from 'react'
import { getPostListing, getUserTypePost, getPostTags, getUpdatedFilteredPost } from 'mockApi'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import SingleCard from './SingleCard'


class Feed extends React.Component {
  constructor (props) {
    super(props)
    const result = getPostListing()
    const keywords = getPostTags()
    this.state = {
      postList: result,
      sort: '',
      tag: [],
      userType: '',
      keywords,
      selectedKeywords: []
    }
  }

  sortUpdate = (e) => {
    const newSort = e.target.value
    const { sort, postList } = this.state
     if( sort !== newSort) {
       const result = getPostListing(postList, newSort)
       this.setState({
         sort: newSort,
         postList: result
       })
     }
  } 

  refreshList = () => {
    const { sort, postList } = this.state
    const result = getPostListing(postList, sort)
    this.setState({
      sort,
      postList: result
    })
  }

  userUpdate = (e) => {
    const newUser = e.target.value
    const { userType } = this.state
    if (userType !== newUser) {
      const result = getUserTypePost(newUser)
      this.setState({
        sort: newUser,
        postList: result
      })
    }
  }

  sortBy = () => {
    return (
      <div className="sort-wrapper my-3 py-2 px-3 text-left card-wrapper border-title">
       <div className="about-title">Filters</div>
       <Form.Row>
          <Col>
            <Form.Group onChange={this.sortUpdate}>
              <Form.Label className="about-description">Sort By</Form.Label>
              <Form.Control as="select">
                <option value="default">Default</option>
                <option value="top">Top</option>
                <option value="new">New</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group onChange={this.userUpdate} controlId="exampleForm.ControlSelect1">
              <Form.Label className="about-description">User Type</Form.Label>
              <Form.Control as="select">
                <option value="all">All</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Col>
       </Form.Row>
      </div>
    )
  }

  filterByTag = (tag) => {
    const { selectedKeywords } = this.state 
    let newArray = selectedKeywords
    const index = selectedKeywords.indexOf(tag)
    if (index >= 0) {
      newArray.splice(index,1)
    } else {
      newArray.push(tag)
    }
    const result = getUpdatedFilteredPost(newArray)
    this.setState({
      selectedKeywords,
      postList: result
    })
  }

  isApplied = (tag) => {
    const { selectedKeywords } = this.state 
    return selectedKeywords.includes(tag)
  }

  showTags = () => {
    const { keywords } = this.state
    return (
      <div className="sort-wrapper my-3 py-2 px-3 text-left card-wrapper border-title">
        <div className="about-title mb-2">Filter by popular tags</div>
        <div className="d-flex flex-wrap">
          {keywords.map((item => {
            return (
              <Button onClick={() => this.filterByTag(item)} variant={this.isApplied(item) ? 'secondary' : 'outline-secondary'} key={`filter-${item}`} className="tag-button mx-2 py-0 my-1">{item}</Button>
            )
          }))}
        </div>
      </div>
    )
  }

  postFeed = () => {
    return (
      <div className="post-wrapper">
        {this.state.postList.map(item => {
          return (
            <SingleCard 
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.selftext}
              score={item.score}
              comments={item.num_comments}
              userType={item.userType}
              author={item.author}
              userUp={item.userUp}
              userDown={item.userDown}
              tags={item.tags}
              refreshList={this.refreshList}
              type="list"
            />
          )
        })}
      </div>
    )
  }

  render () {
    return (
      <div className="feed-wrapper">
        <div>{this.sortBy()}</div>
        <div>{this.showTags()}</div>
        {this.postFeed()}
      </div>
    )
  }
}

export default Feed;
