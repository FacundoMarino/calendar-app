import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { convertDateEvents } from '../helpers';
import {
	onAddNewEvent,
	onDeleteEvent,
	onSetActiveNote,
	onUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const onSetActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveNote(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		if (calendarEvent._id) {
			dispatch(onUpdateEvent({ ...calendarEvent }));
		} else {
			const { data } = await calendarApi.post('/events', calendarEvent);
			dispatch(onAddNewEvent({ ...calendarEvent, _id: data.evento.id, user }));
		}
	};

	const startDeletingEvent = () => {
		dispatch(onDeleteEvent());
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get('/events');
			const events = convertDateEvents(data.eventos);
		} catch (error) {
			console.log('Error al cargar eventos');
			console.log(error);
		}
	};

	return {
		events,
		activeEvent,
		hasEventSelected: !!activeEvent,

		onSetActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
