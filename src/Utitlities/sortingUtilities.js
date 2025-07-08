export const sortTickets = (tickets, preference) => {
  switch (preference) {
    case "High to Low":
      return [...tickets].sort((a, b) => b.priority.localeCompare(a.priority));
    case "Low to High":
      return ([...tickets].sort((a, b) => a.priority.localeCompare(b.priority)));
    default:
       return [...tickets].sort((a, b) => b.priority.localeCompare(a.priority)); // default set as High to Low
  }
};

export default sortTickets;
