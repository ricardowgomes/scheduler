import React from "react";
import classNames from "classnames";



export default function InterviewerListItem(props) {
  const dayListClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  })
  const dayListClassImage = classNames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected,
  })

  return (
    <li
      className={dayListClass}
      onClick={props.setInterviewer} >
      <img
        className={dayListClassImage}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
};