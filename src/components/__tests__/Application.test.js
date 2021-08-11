import React from "react";

import {
  render,
  cleanup,
  getByPlaceholderText,
  prettyDOM,
  getByText,
  getByTestId,
  getByAltText,
  getByDisplayValue,
  getAllByTestId,
  queryByText,
  waitForElement,
  fireEvent,
} from '@testing-library/react';

import Application from ".././Application";

afterEach(cleanup);

describe("Application", () => {
  // it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  //   const { getByText } = render(<Application />);

  //   await waitForElement(() => getByText("Monday"));
  //   fireEvent.click(getByText("Tuesday"));
  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // await waitForElement(() => getByText(appointment, 'Lydia'));

    // const days = getAllByTestId(container, 'day');
    // const day = days.find((d) => queryByText(d, 'Monday'));

    // expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  // //----------------------------------------------------------------------------

  // it(`loads data, cancels an interview and increases the spots remaining for
  //     Monday by 1`, async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, 'Archie Cohen'));

  //   const appointment = getAllByTestId(container, 'appointment').find((appt) =>
  //     queryByText(appt, 'Archie Cohen')
  //   );
  //   fireEvent.click(getByAltText(appointment, /delete/i));

  //   expect(
  //     getByText(appointment, /delete the appointment/i)
  //   ).toBeInTheDocument();

  //   fireEvent.click(getByText(appointment, /confirm/i));

  //   expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

  //   await waitForElement(() => getByAltText(appointment, /add/i));
  //   const days = getAllByTestId(container, 'day');
  //   const day = days.find((d) => queryByText(d, 'Monday'));

  //   expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  // });

  // //----------------------------------------------------------------------------

  // it(`loads data, edits an interview and keeps the spots remaining for Monday
  //     the same`, async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, 'Archie Cohen'));

  //   const appointment = getAllByTestId(container, 'appointment').find((appt) =>
  //     queryByText(appt, 'Archie Cohen')
  //   );
  //   fireEvent.click(getByAltText(appointment, /edit/i));

  //   const input = getByDisplayValue(appointment, 'Archie Cohen');
  //   fireEvent.change(input, { target: { value: 'Lydia' } });
  //   fireEvent.click(getByText(appointment, /save/i));

  //   expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  //   await waitForElement(() => getByText(appointment, 'Lydia'));
  //   const days = getAllByTestId(container, 'day');
  //   const day = days.find((d) => queryByText(d, 'Monday'));

  //   expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  // });

  // //----------------------------------------------------------------------------

  // it('shows the save error when failing to save an appointment', async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, 'Archie Cohen'));

  //   const appointment = getAllByTestId(container, 'appointment').find((appt) =>
  //     queryByText(appt, 'Archie Cohen')
  //   );
  //   fireEvent.click(getByAltText(appointment, /edit/i));

  //   const input = getByDisplayValue(appointment, 'Archie Cohen');
  //   fireEvent.change(input, { target: { value: 'Lydia' } });

  //   axios.put.mockRejectedValueOnce();
  //   fireEvent.click(getByText(appointment, /save/i));

  //   expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  //   await waitForElement(() =>
  //     getByText(appointment, /could not book the appointment/i)
  //   );

  //   fireEvent.click(getByAltText(appointment, /close/i));

  //   expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();

  //   const days = getAllByTestId(container, 'day');
  //   const day = days.find((d) => queryByText(d, 'Monday'));

  //   expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  // });

  // //----------------------------------------------------------------------------

  // it(`shows the delete error when failing to delete an existing
  //     appointment`, async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, 'Archie Cohen'));

  //   const appointment = getAllByTestId(container, 'appointment').find((appt) =>
  //     queryByText(appt, 'Archie Cohen')
  //   );
  //   fireEvent.click(getByAltText(appointment, /delete/i));

  //   expect(
  //     getByText(appointment, /delete the appointment/i)
  //   ).toBeInTheDocument();

  //   axios.delete.mockRejectedValueOnce();
  //   fireEvent.click(getByText(appointment, /confirm/i));

  //   expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

  //   await waitForElement(() =>
  //     getByText(appointment, /could not cancel the appointment/i)
  //   );

  //   fireEvent.click(getByAltText(appointment, /close/i));

  //   expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();

  //   const days = getAllByTestId(container, 'day');
  //   const day = days.find((d) => queryByText(d, 'Monday'));

  //   expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  // });
});