import React from "react";

export default function TicketItem({ ticket, dispatch }) {
  const { id, title, description, priority } = ticket;
  const priorityClass = {
    1: "priority-low",
    2: "priority-medium",
    3: "priority-high",
  };

  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityClass[ticket.priority]}`}></div>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* 
    How edit flow work - 
    1. TicketItem component - when user click on Edit button editingTicket state is set to current ticket using SET_EDITING_TICKET type reducer
    2. Once editingTicket state is updated - above TicketForm useeffect will trigger and go into first statement.
    3. All the states will be populated from the editingTicket.
   */}
      <button
        className="button"
        onClick={() =>
          dispatch({ type: "SET_EDITING_TICKET", payload: ticket })
        }
      >
        Edit Button
      </button>

      <button
        className="button"
        onClick={() => dispatch({ type: "DELETE_TICKET", payload: { id } })}
      >
        DELETE
      </button>
    </div>
  );
}
