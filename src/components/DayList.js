import React from "react";

import "components/DayListItem.scss";
import DayListItem from './DayListItem';

export default function DayList(props) {
  const dayList = props.days.map(day =>
    <DayListItem
      key={day.name}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  )

  return (
    <ul>
      {dayList}
    </ul>
  )
}