import Vuex from 'vuex';
import axios from 'axios';

export const ProfileEnum = {
	ALL: 1,
	PROCESSED: 2,
	UNPROCESSED: 3,
};

export const store = new Vuex.Store({
	state: {
		users: [],
		currentProfile: ProfileEnum.ALL,
		burgerIsOpen: false,
	},
	getters: {
		BURGER_STATE: state => state.burgerIsOpen,
		CURRENT_PROFILE: state => state.currentProfile,
		FILTERED_USERS: state => {
			switch (state.currentProfile) {
				case ProfileEnum.ALL:
				default:
					return state.users
				case ProfileEnum.PROCESSED:
					return state.users.filter(user => user.status)
				case ProfileEnum.UNPROCESSED:
					return state.users.filter(user => !user.status)
			}
		}
	},
	mutations: {
		SET_USERS: (state, payload) => {
			state.users = payload;
		},
		TOGGLE_BURGER_STATE: (state, payload) => {
			console.log(payload);
			state.burgerIsOpen = payload;
		},
		SET_CURRENT_PROFILE: (state, payload) => {
			state.currentProfile = payload;
		},
	},
	actions: {
		SET_USERS: async (context, payload) => {
			let { data } = await axios.get('https://retoolapi.dev/wHFLgA/data');
			context.commit('SET_USERS', data);
		},
		TOGGLE_BURGER_STATE: (context, payload) => {
			context.commit('TOGGLE_BURGER_STATE', payload);
		},
		SET_CURRENT_PROFILE: (context, payload) => {
			console.log(payload);
			context.commit('SET_CURRENT_PROFILE', payload);
		},
	},
});