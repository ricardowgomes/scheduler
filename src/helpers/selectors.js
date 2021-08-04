export default function getAppointmentsForDay(state, day) {
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