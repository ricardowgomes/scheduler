

//------------------------------------------------------------------------------
// Import
import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList"
import Appointment from "./Appointment/Index"

import { getAppointmentsForDay, getInterview } from '../helpers/selectors'

//------------------------------------------------------------------------------
// Component

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const cancelInterview = (interviewId) => {
    const appointment = {
      ...state.appointments[interviewId],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [interviewId]: appointment
    };

    return axios
      .delete(`/api/appointments/${interviewId}`)
      .then(() => setState((prev) => ({ ...prev, appointments })))
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState((prev) => ({ ...prev, appointments })))
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDay = (day) => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const renderAppointments = dailyAppointments.map(app => {
    const interview = getInterview(state, app.interview);

    return (
      <Appointment
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        state={state}
      />
    );
  });

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
          cancelInterview={cancelInterview}
          state={state}
        />
      </section>
    </main>
  );
}
