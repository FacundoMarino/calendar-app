import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

export const calendarSlice = createSlice({
	name: 'calendar',
	initialState: {
		events: [],
		activeEvent: null,
	},
	reducers: {
		onSetActiveNote: (state, { payload }) => {
			state.activeEvent = payload;
		},

		onAddNewEvent: (state, { payload }) => {
			state.events.push(payload);
			state.activeEvent = null;
		},

		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => {
				if (event._id === payload._id) {
					return payload;
				}

				return event;
			});
		},

		onDeleteEvent: (state) => {
			state.events = state.events.filter(
				(event) => event._id !== state.activeEvent._id
			);
			state.activeEvent = null;
		},
	},
});

export const { onSetActiveNote, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
	calendarSlice.actions;
