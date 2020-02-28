describe("EventRecommender", () => {
    const { EventRecommender, User, Event } = require('../../index.js'); // Update with your class names and file name
    let er; 
  
    beforeEach(() => {
      er = new EventRecommender();
    });
  
    describe("addEvent", () => {
      it("adds a new Event to the system", () => {
        er.addEvent(1,"horror","vampire night1", "May 6, 2020");
        expect(er.AllEvents.length).toEqual(1);
        expect(er.AllEvents[0].eventName).toEqual("vampire night1"); // what are some other things you can test?
      });
    });
  
    describe("addUser", () => {
      it("adds a new User to the system", () => {
        er.addUser(2,"MewMew");
        expect(er.AllUsers.length).toEqual(1);
      });
    });
  
    describe("saveUserEvent", () => {
      it("adds an event to a user's personal event array", () => {
        er.addEvent(3,"horror","vampire night1", "May 6, 2020");
        er.addUser(4,"Sadie");
        er.saveUserEvent(4, 3); // change these to match your method signature
        expect(er.AllUsers[0].userEvents.length).toEqual(1);
      });
    });
  
    describe("deleteUser", () => {
      it("removes a User from the system", () => {
        er.addUser(4,"Mark");
        er.deleteUser(4);
        expect(er.AllUsers.length).toEqual(0);
      });
    });
  
    describe("deleteEvent", () => {
      it("removes the event from the system", () => {
        er.addEvent(6,"horror","vampire night3", "May 9, 2020");
        er.deleteEvent(er.AllEvents,6);
        expect(er.AllEvents.length).toEqual(0);
      });
    });

    describe("findEventsByDate", () => {
        it("finds events by given Date", () => {
            er.addEvent(1, "horror","vampire night3", "May 9, 2020");
            er.addEvent(1, "horror","vampire night4", "May 9, 2020");
            let eventArray = er.findEventsByDate("May 9, 2020");
            expect(eventArray.length).toEqual(2);
        });
    });

    describe("findEventsbyCategory", () => {
        it("finds events by given catgory", () => {
            er.addEvent(1, "horror","vampire night3", "May 9, 2020");
            er.addEvent(1, "horror","vampire night4", "May 9, 2020");
            let eventArray = er.findEventsbyCategory("horror")
            expect(eventArray.length).toEqual(2);
        });
    });

    describe("deletingUserEvents", () => {
        it("deletes what a user has added to their personal event array", () => {
          er.addEvent(1, "horror","vampire night6", "May 9, 2020");
          er.addUser(2, "Sadie");
          er.saveUserEvent(2, 1);
          expect(er.AllUsers[0].userEvents.length).toEqual(1);
          er.deleteEvent(er.AllUsers[0].userEvents, 1);
          expect(er.AllUsers[0].userEvents.length).toEqual(0);
        });
      });
});  