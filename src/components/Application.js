import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "./Appointment/Index"
import { getAppointmentsForDay, getInterview } from '../helpers/selectors'

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Ricardo Wagner-Gomes",
//       interviewer: {
//         id: 12,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Jon Snow",
//       interviewer: { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" }
//     }
//   },
//   {
//     id: 8,
//     time: "4pm",
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("Inside bookInterview \n", interview)

    axios.put(`/api/appointments/${id}`, appointment)
      .then(res => {
        console.log(res);
        setState({
          ...state, appointments
        })
      })
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDay = (day) => setState({ ...state, day });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
      .then(response => {
        const [daysData, appointmentsData, interviewersData] = response;
        setState(prev => ({
          ...prev, days: daysData.data,
          appointments: appointmentsData.data,
          interviewers: interviewersData.data
        }));
      })
      .catch(error => {
        console.log(error);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const renderAppointments = dailyAppointments.map(app => {
    const interview = getInterview(state, app.interview);

    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        bookInterview={bookInterview}
        state={state}
      />
    );
  });



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
            days={state.days}
            day={state.day}
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
        <Appointment
          key="last"
          time="5pm"
          bookInterview={bookInterview}
          state={state}
        />
      </section>
    </main>
  );
}
