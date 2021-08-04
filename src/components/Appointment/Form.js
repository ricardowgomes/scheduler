import React, { useState } from 'react';

import InterviewerList from '../InterviewerList'
import Button from '../Button'

export default function Form(props) {
  const name = props.name || '';
  const [studentName, setStudentName] = useState(name);
  const [interviewer, setInterviewer] = useState(props.value || null);

  const reset = () => {
    setStudentName('');
    setInterviewer(null)
  };

  // const onSave = () => {
  //   const whatever = {studentName, interviewer}
  // }

  const studentInputHandler = (event) => {
    setStudentName(event.target.value)
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={studentName}
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={studentInputHandler}
            onSubmit={event => event.preventDefault()}
          />
        </form>
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
            onClick={reset}
          >Cancel</Button>
          <Button
            confirm
            onClick={props.onSave}
          >Save</Button>
        </section>
      </section>
    </main>
  )
};