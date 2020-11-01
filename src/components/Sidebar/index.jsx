import React from 'react';
import Button from 'react-bootstrap/Button';
import { abbreviateNumber, readableDate } from 'utils/formatters'

const Sidebar = (props) => {
  const { description, members, active, createdOn, showModal } = props
  return (
    <div className="my-3 py-2 px-3 text-left card-wrapper border-title">
      <div className="about-title">About Community</div>
      <div className="about-description my-2">{description}</div>
      <div className="d-flex my-2">
        <div className="mr-5">
          <div className="members-count">{ abbreviateNumber(members) }</div>
          <div className="members-type">Members</div>
        </div>
        <div>
          <div className="members-count">{ abbreviateNumber(active) }</div>
          <div className="members-type">Online</div>
        </div>
      </div>
      <hr className="bg-dark my-3" />
      <div className="about-description">
        <span>Created</span> 
        <span className="ml-1">{ readableDate(createdOn) }</span>
      </div>
      <Button onClick={showModal} className="py-0 mt-2 mb-3 text-uppercase about-create font-weight-bold" variant="light" block>Create Post</Button>
    </div>
  )
};

export default Sidebar;