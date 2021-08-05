const getAppointmentsForDay = (state, day) => {
  const appointments = [];
  let appointmentsIds = [];

  if (!state.days) {
    return appointments;
  }

  for (const dayAppoint of state.days) {
    if (dayAppoint.appointments.length === 0) {
      return appointments;
    }

    if (day === dayAppoint.name) {
      appointmentsIds = [...dayAppoint.appointments];
    }
  }

  for (const appointment of appointmentsIds) {
    appointments.push(state.appointments[appointment])
  }


  return appointments;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return interview;
  }

  const interviewerId = interview.interviewer;
  const newObject = { ...interview };

  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interviewerId) {
      newObject.interviewer = { ...state.interviewers[interviewer] }
    }
  }

  return newObject;
};

export { getAppointmentsForDay, getInterview };