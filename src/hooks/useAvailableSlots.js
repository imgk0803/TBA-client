export const filterTimeslots = (allTimeslots, bookedTimeslots) => {
    return allTimeslots.filter(ts => 
      !bookedTimeslots.some(book => book.start === ts.start && book.end === ts.end)
    );
  };
  