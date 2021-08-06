import React from 'react';

import './styles.scss';
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"
import { getInterviewersForDay } from "../../helpers/selectors"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    console.log("interview", interview)
  }

  const dailyInterviewers = getInterviewersForDay(props.state, props.state.day);

  return (
    <article className="appointment">
      <Header
        key={props.id}
        time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form
        interviewers={dailyInterviewers}
        onSave={save}

        onCancel={() => back()} />}
    </article>
  )
};