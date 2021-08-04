import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = (spots) => {
    let string = '';

    if (spots > 1) {
      string = `${spots} spots remaining`;

    } else if (spots === 1) {
      string = `${spots} spot remaining`

    } else {
      string = `no spots remaining`
    }

    return string;
  }

  const dayListClass = classNames('day-list__item', {
    'day-list__item--full': !props.spots,
    'day-list__item--selected': props.selected
  })

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayListClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}