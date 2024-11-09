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
		isFetchRequest: false
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
		},
		IS_FETCH_REQUEST: state => state.isFetchRequest
	},
	mutations: {
		SET_USERS: (state, payload) => {
			state.users = payload;
		},
		TOGGLE_BURGER_STATE: (state, payload) => {
			state.burgerIsOpen = payload;
		},
		SET_CURRENT_PROFILE: (state, payload) => {
			state.currentProfile = payload;
		},
		ADD_NEW_PROFILE: (state, payload) => {
			state.users.push(payload);
		},
		UPDATE_FETCH_REQUEST: (state, payload) => {
			state.isFetchRequest = payload;
		}
	},
	actions: {
		SET_USERS_ACTION: async (context, payload) => {
			let { data } = await axios.get('https://retoolapi.dev/wHFLgA/data');
			context.commit('SET_USERS', data);
		},
		TOGGLE_BURGER_STATE_ACTION: (context, payload) => {
			context.commit('TOGGLE_BURGER_STATE', payload);
		},
		SET_CURRENT_PROFILE_ACTION: (context, payload) => {
			context.commit('SET_CURRENT_PROFILE', payload);
		},
		ADD_NEW_PROFILE_ACTION: async (context, payload) => {
			try {
				let { data } = await axios.post('https://retoolapi.dev/wHFLgA/data', payload);
				context.commit('ADD_NEW_PROFILE_MUTATION', data);
			} catch (error) {
				console.error("Ошибка при добавлении профиля через API:", error);
			}
		},
		UPDATE_FETCH_REQUEST_ACTION: (context, payload) => {
			context.commit('UPDATE_FETCH_REQUEST', payload);
		}
	},
});