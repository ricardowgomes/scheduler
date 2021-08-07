import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {}
  });

  const updateRemainingSpots = (state, day) => {
    const currentDay = day || state.day;
    const dayObj = state.days.filter(day => day.name === currentDay);
    const appointmentsId = [...dayObj[0].appointments];

    const nullAppointments = [];
    for (const appoint in state.appointments) {
      if (!(state.appointments[appoint].interview)
        && appointmentsId.includes(state.appointments[appoint].id)) {
        nullAppointments.push(appoint);
      }
    }

    const numOfSpots = nullAppointments.length;

    // state.days.forEach(obj => {
    //   if (obj.name === currentDay) {
    //     obj.spots = numOfSpots;
    //   }
    // });

    const dayObjIndex = state.days.findIndex(day => day.name === currentDay)
    const updateState = { ...state };
    updateState.days = [...state.days];
    const updatedDay = { ...dayObj };
    updatedDay.spots = numOfSpots;
    updateState.days[dayObjIndex] = updatedDay;

    return updateState;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDay = (day) => setState({ ...state, day });

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
      .then((res) => {
        console.log('Esse eh o resultado delete',);
        const newState = updateRemainingSpots(state)
        setState(prev => ({ ...prev, newState }));
        setState(prev => ({ ...prev, appointments }));
      });
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
      .then((res) => {
        const newState = updateRemainingSpots(state)
        // setState(prev => ({ ...prev, newState }));
        return setState(prev => ({ ...prev, appointments, newState }))
      });
  }

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

  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;

