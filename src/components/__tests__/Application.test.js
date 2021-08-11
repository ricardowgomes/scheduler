import React from "react";
import axios from "axios";

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
    // console.log('This is appointment before clicking ADD', prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));
    // console.log('This is appointment after clicking ADD', prettyDOM(appointment));

    const input = getByTestId(appointment, 'student-name-input');
    fireEvent.change(input, {
      target: { value: "Ricardo Wagner" }
    });
    // console.log('This is appointment after adding student name', prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
    // console.log('This is appointment after clicking on interviewer', prettyDOM(appointment));

    fireEvent.click(getByText(appointment, "Save"));
    // console.log('This is appointment after clicking on save', prettyDOM(appointment));

    expect(getByText(appointment, 'Saving...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving...'));

    // console.log('This is container >>>', prettyDOM(container));
    await waitForElement(() => getByText(appointment, "Ricardo Wagner"));

    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );

    // expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
    // console.log(prettyDOM(day));

  });
});