import React from "react";

import {
  render,
  cleanup,
  getByPlaceholderText,
  prettyDOM,
  getByText,
  waitForElementToBeRemoved,
  getByTestId,
  getByAltText,
  getByDisplayValue,
  getAllByTestId,
  queryByText,
  waitForElement,
  fireEvent,
} from '@testing-library/react';

import Application from "components/Application";
import axios from "axios";

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
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    const input = getByTestId(appointment, 'student-name-input');
    fireEvent.change(input, {
      target: { value: "Ricardo Wagner" }
    });

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));

    await waitForElement(() => getByText(appointment, "Ricardo Wagner"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointmentArchie = appointments[1];
    fireEvent.click(getByAltText(appointmentArchie, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointmentArchie, 'Delete the appointment?')
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointmentArchie, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(
      getByText(appointmentArchie, 'Deleting...')
    ).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElementToBeRemoved(() => getByText(appointmentArchie, 'Deleting...'));
    fireEvent.click(getByAltText(appointmentArchie, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Check that the FORM component is shown.
    expect(getByText(appointment, 'Interviewer')).toBeInTheDocument();

    // 5. Inserts a new value to the student name.
    const input = getByTestId(appointment, 'student-name-input');
    fireEvent.change(input, {
      target: { value: "Ricardo Wagner" }
    });

    // 6. Inserts a new value to the interviewer.
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    // 7. Click the "SAVE" button.
    fireEvent.click(getByText(appointment, "Save"));

    // 8. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));

    // 9. Wait until the element new student name is displayed.
    await waitForElement(() => getByText(appointment, "Ricardo Wagner"));

    // 10. Check that the DayListItem with the text "Monday" also has the same text as before.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  //----------------------------------------------------------------------------

  it('shows the save error when failing to save an appointment', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find((appt) =>
      queryByText(appt, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, /edit/i));

    const input = getByDisplayValue(appointment, 'Archie Cohen');
    fireEvent.change(input, { target: { value: 'Lydia' } });

    axios.put.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, /save/i));

    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /couldn't save your interview/i)
    );

    fireEvent.click(getByAltText(appointment, /close/i));

    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();

    const days = getAllByTestId(container, 'day');
    const day = days.find((d) => queryByText(d, 'Monday'));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  //----------------------------------------------------------------------------

  it(`shows the delete error when failing to delete an existing
    appointment`, async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find((appt) =>
      queryByText(appt, 'Archie Cohen')
    );
    fireEvent.click(getByAltText(appointment, /delete/i));

    expect(
      getByText(appointment, /delete the appointment/i)
    ).toBeInTheDocument();

    axios.delete.mockRejectedValueOnce();
    fireEvent.click(getByText(appointment, /confirm/i));

    expect(getByText(appointment, /deleting/i)).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, /couldn't delete your interview/i)
    );

    fireEvent.click(getByAltText(appointment, /close/i));

    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();

    const days = getAllByTestId(container, 'day');
    const day = days.find((d) => queryByText(d, 'Monday'));

    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });
});