
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'
import { Navbar } from "../components/Navbar"
import { localizer } from '../../helpers'



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
}]

export const CalendarPage = () => {
  return (
    <>

    <Navbar />

    <Calendar
      localizer={ localizer }
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '100vh' }}
    />

    </>
  )
}

