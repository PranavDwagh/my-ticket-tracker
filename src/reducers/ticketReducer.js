export default function ticketReducers(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return { ...state, tickets: [...state.tickets, action.payload] }; // ...state required to copy the exisiting
    // states (if there are any other than tickets), tickets is one state which we are returing
    // return { ...state, tickets: [...state.tickets, tickets: [{id: 1, price: 100}, {id:2, price: 2}] }
    case "UPDATE_TICKET":
      return {
        ...state,
        ticket: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
        editingTicket: null,
      };
    case "DELETE_TICKET":
      if (state.editingTicket && state.editingTicket.id === action.payload.id) {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket.id !== action.payload.id
          ),
          editingTicket: null,
        };
      } else {
        return {
          ...state,
          tickets: state.tickets.filter(
            (ticket) => ticket.id !== action.payload.id
          ),
        };
      }

    case "SET_EDITING_TICKET":
      return {
        ...state,
        editingTicket: action.payload, // payload will be the ticket object which we want to edit
      };
    case "CLEAR_EDITING_TICKET":
      return {
        ...state,
        editingTicket: null, // when we click on cancel button, we want to clear the editing ticket
      };
      case "SET_SORTING":
        return{...state, sortPreference: action.payload}
    default:
      return state;
  }
}
