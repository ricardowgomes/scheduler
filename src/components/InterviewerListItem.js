import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const InterviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  })
  const InterviewerClassImage = classNames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected,
  })

  return (
    <li
      className={InterviewerClass}
      onClick={props.onChange}
    >
      <img
        className={InterviewerClassImage}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li >
  )
};