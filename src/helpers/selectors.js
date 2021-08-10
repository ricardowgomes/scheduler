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

// Working independe from getAppointmentsForDay
const getInterviewersForDay = (state, day) => {
  const interviewers = [];
  let interviewersIds = [];

  if (!state.days) return interviewers;

  for (const dayApp of state.days) {
    if (!dayApp.interviewers) return interviewers;

    if (dayApp.interviewers.length === 0) return interviewers;

    if (day === dayApp.name) {
      interviewersIds = [...dayApp.interviewers];
    }
  }

  for (const interviewer of interviewersIds) {
    interviewers.push(state.interviewers[interviewer])
  }

  return interviewers;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };