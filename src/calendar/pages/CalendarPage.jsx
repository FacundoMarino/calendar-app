import { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from "../components";
import { localizer, getMessagesES } from "../../helpers";
import { useUiStore, useCalendarStore } from "../../hooks";

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "#347CF7",
    borderRadius: "0px",
    opacity: 0.8,
    color: "white",
  };
  return {
    style,
  };
};

const viewChangeHandler = (event) => {
  localStorage.setItem("lastView", event);
};

export const CalendarPage = () => {
  const { openDateModal, closeDateModal } = useUiStore();
  const { events, onSetActiveEvent, startLoadingEvents } = useCalendarStore();

  const doubleClickHandler = (event) => {
    openDateModal();
  };

  const selectHandler = (event) => {
    onSetActiveEvent(event);
  };

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={doubleClickHandler}
        onSelectEvent={selectHandler}
        onView={viewChangeHandler}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
