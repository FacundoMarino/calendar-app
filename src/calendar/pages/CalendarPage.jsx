import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar, CalendarEvent, CalendarModal } from "../components"
import { localizer, getMessagesES } from '../../helpers'



const events = [{
  title: 'cupleaños del jefe',
  notes: 'Hay que comprar un regalo',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Facundo'
  }
}];

  const eventStyleGetter = (  event, start, end, isSelected ) =>{

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return{
      style
    }
}

const doubleClickHandler = ( event ) => {

  console.log({ doubleClick: event })

}

const selectHandler = ( event ) => {

  console.log({ click: event })

}

const viewChangeHandler = ( event ) => {

  localStorage.setItem('lastView', event)

}

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "week" );

  return (
    <>

    <Navbar />

    <Calendar
      culture='es'
      localizer={ localizer }
      events={events}
      defaultView={ lastView }
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100vh' }}
      messages={ getMessagesES() }
      eventPropGetter={ eventStyleGetter }
      components={{
        event: CalendarEvent
      }}
      onDoubleClickEvent= { doubleClickHandler }
      onSelectEvent={ selectHandler }
      onView={ viewChangeHandler }
    />

    <CalendarModal />

    </>
  )
}

