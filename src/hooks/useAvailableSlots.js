export const filterAvailableTimeslots = (allTimeslots, bookedTimeslots) => {
    return allTimeslots.filter(timeslot => {
      return !bookedTimeslots.some(booked => 
        booked.timeslot.start === timeslot.start && booked.timeslot.end === timeslot.end
      );
    });
  };