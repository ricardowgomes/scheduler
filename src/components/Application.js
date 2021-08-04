import React, { useState } from "react";

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/Index"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Ricardo Wagner-Gomes",
      interviewer: {
        id: 12,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Jon Snow",
      interviewer: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" }
    }
  },
  {
    id: 8,
    time: "4pm",
  }
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState('Monday');

  const renderAppointments = appointments.map(app => (
    <Appointment key={app.id} {...app} />
  ))

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        {renderAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
