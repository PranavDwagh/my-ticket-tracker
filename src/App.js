import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import { useReducer } from "react";
import TicketForm from "./component/TicketForm";
import ticketReducers from "./reducers/ticketReducer";
import TicketList from "./component/TicketList";
import sortTickets from "./Utitlities/sortingUtilities";

function App() {
  const initialState = { tickets: [], editingTicket: null };
  const [state, dispatch] = useReducer(ticketReducers, initialState);

  const sortedTickets = sortTickets(state.tickets, state.sortPreference);

  return (
    <div className="App">
      <div className="container">
        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
        ></TicketForm>
        {console.log(`Length of tickets - ${state.tickets.length}`)}

        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>

            <select
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
