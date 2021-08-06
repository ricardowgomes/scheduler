//------------------------------------------------------------------------------
// Import
import React from 'react';
import './styles.scss';

import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"

import useVisualMode from "../../hooks/useVisualMode"
import { getInterviewersForDay } from "../../helpers/selectors"

//------------------------------------------------------------------------------
// Component
export default function Appointment(props) {
  //-----------------------------------------
  // Modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const studentName = props.interview ? props.interview.student : null;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onSave = (name, interviewerId) => {
    transition(SAVING)

    props
      .bookInterview(props.id, { student: name, interviewer: interviewerId })
      .then(() => transition(SHOW));
  };

  const onConfirm = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  const onDelete = () => transition(CONFIRM);
  const onCancel = () => back();
  const onEdit = () => transition(EDIT);

  const dailyInterviewers = getInterviewersForDay(props.state, props.state.day);

  return (
    <article className="appointment">
      <Header
        key={props.id}
        time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={studentName}
          interviewer={props.interview ? props.interview.interviewer : null}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && <Form
        interviewers={dailyInterviewers}
        name={studentName}
        onSave={onSave}
        onCancel={onCancel}
      />}
      {mode === SAVING && <Status
        message={'Saving...'}
      />}
      {mode === DELETING && <Status
        message={'Deleting...'}
      />}
      {mode === CONFIRM && <Confirm
        message="Delete the appointment?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />}
      {mode === EDIT && <Form
        interviewers={dailyInterviewers}
        onSave={onSave}
        onCancel={onCancel}
        name={studentName}
        interviewerId={props.interview.interviewer.id}
      />}
    </article>
  )
};