import { useState, useEffect } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
	Navbar,
	CalendarEvent,
	CalendarModal,
	FabAddNew,
	FabDelete,
} from '../components';
import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks';

const viewChangeHandler = (event) => {
	localStorage.setItem('lastView', event);
};

export const CalendarPage = () => {
	const { user } = useAuthStore();
	const { openDateModal, closeDateModal } = useUiStore();
	const { events, onSetActiveEvent, startLoadingEvents } = useCalendarStore();

	const doubleClickHandler = (event) => {
		openDateModal();
	};

	const selectHandler = (event) => {
		onSetActiveEvent(event);
	};

	const [lastView, setLastView] = useState(
		localStorage.getItem('lastView') || 'week'
	);

	const eventStyleGetter = (event, start, end, isSelected) => {
		const isMyEvent = user.id === event.user._id || user.id === event.user.id;

		const style = {
			backgroundColor: isMyEvent ? '#347CF7' : '#4656060',
			borderRadius: '0px',
			opacity: 0.8,
			color: 'white',
		};
		return {
			style,
		};
	};

	useEffect(() => {
		startLoadingEvents();
	}, []);

	return (
		<>
			<Navbar />

			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor='start'
				endAccessor='end'
				style={{ height: '100vh' }}
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
