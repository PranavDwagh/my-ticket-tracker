import React, { useState, useEffect } from "react";
import "../styles.css";

const TicketForm = ({ dispatch, editingTicket }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  useEffect(() => {
    if (editingTicket) {
      setTitle(editingTicket.title);
      setDescription(editingTicket.description);
      setPriority(editingTicket.priority);
    } else {
      clearForm();
    }
  }, [editingTicket]);
  /*
    How edit flow work - 
    1. TicketItem component - when user click on Edit button editingTicket state is set to current ticket using SET_EDITING_TICKET type reducer
    2. Once editingTicket state is updated - above TicketForm useeffect will trigger and go into first statement.
    3. All the states will be populated from the editingTicket.
    4. Once user done with editing - and click Submit button, now in dispatch method if editingTicket is present it will call Update ticket otherwise Add ticket.
  */

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // As we are changing states here on submit of form.
    // To prevent reloading of page adding this preventDefault function
    const ticketData = {
      id: editingTicket ? editingTicket.id : new Date().toISOString(),
      title,
      description,
      priority,
    };

    dispatch({
      type: editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });

    clearForm();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    dispatch({type: "CLEAR_EDITING_TICKET"});
    clearForm();
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div>
        <label>Enter the Text</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Enter the Description</label>
        <textarea
          type="text"
          value={description}
          className="form-input"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>

        {
          // console.log(Object.entries(priorityLabels))           // this will return 2D array - [["1", "Low"], ["2", "Medium"], ["3", "High"]]
          Object.entries(priorityLabels).map(([value, label]) => (
            <label key={value} className="priority-label">
              <input
                type="radio"
                value={value}
                checked={priority === value}
                className="priority-input"
                onChange={(e) => setPriority(e.target.value)}
              />
              {label}
            </label>
          ))
        }
      </fieldset>
      <span>
        {editingTicket && (
          <button type="submit" className="button" onClick={handleCancel}>
            Discard
          </button>
        )}

        <button type="submit" className="button">
          Submit
        </button>
      </span>
    </form>
  );
};

export default TicketForm;
