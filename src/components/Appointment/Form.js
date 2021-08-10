import React, { useState } from 'react';

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form(props) {
  const name = props.name || '';
  const [studentName, setStudentName] = useState(name);
  const [interviewer, setInterviewer] = useState(props.interviewerId || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudentName('');
    setInterviewer(null)
  };

  const studentInputHandler = (event) => {
    setError("");
    setStudentName(event.target.value);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const validate = () => {
    if (studentName === "") {
      setError("student name cannot be blank");
      return;
    }

    // if (!interviewer) {
    //   setError("Select an interviewer");
    //   return;
    // }
    setError("");
    props.onSave(studentName, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={studentName}
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={studentInputHandler}
            data-testid="student-name-input"
          />
        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button
            danger
            onClick={cancel}
          >Cancel</Button>
          <Button
            confirm
            onClick={validate}
          >Save</Button>
        </section>
      </section>
    </main>
  )
};