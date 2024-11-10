import Vuex from 'vuex';
import axios from 'axios';

export const ProfileEnum = {
	ALL: 1,
	PROCESSED: 2,
	UNPROCESSED: 3,
};

export const ProfileActionTypeEnum = {
	ADD: 1,
	EDIT: 2,
	DELETE: 3,
	SEARCH: 4
};

export const store = new Vuex.Store({
	state: {
		users: [],
		currentProfile: ProfileEnum.ALL,
		burgerIsOpen: false,
		isFetchRequest: false,
		profileActionType: ProfileActionTypeEnum.ADD,
		activeProfileId: -1
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
		IS_FETCH_REQUEST: state => state.isFetchRequest,
		PROFILE_ACTION_TYPE: state => state.profileActionType,
		ACTIVE_PROFILE_ID: state => state.activeProfileId,
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
		},
		UPDATE_PROFILE_ACTION_TYPE: (state, payload) => {
			state.profileActionType = payload;
		},
		SET_ACTIVE_PROFILE_ID: (state, payload) => {
			state.activeProfileId = payload;
		},
		DELETE_PROFILE: (state, payload) => {
			state.users = [...state.users.filter(user => user.id !== payload)]
		},
		UPDATE_PROFILE: (state, payload) => {
			state.users = state.users.map(user =>
				user.id === payload.id ? {...user, ...payload} : user
			);
		}
	},
	actions: {
		SET_USERS_ACTION: async (context, payload) => {
			try {
				let { data } = await axios.get('https://retoolapi.dev/wHFLgA/data');
				context.commit('SET_USERS', data);
			} catch (error) {
				console.error("Ошибка при получении профилей через API:", error);
			}
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
				context.commit('ADD_NEW_PROFILE', data);
			} catch (error) {
				console.error("Ошибка при добавлении профиля через API:", error);
			}
		},
		UPDATE_FETCH_REQUEST_ACTION: (context, payload) => {
			context.commit('UPDATE_FETCH_REQUEST', payload);
		},
		UPDATE_PROFILE_ACTION_TYPE_ACTION: (context, payload) => {
			console.log(payload);
			context.commit('UPDATE_PROFILE_ACTION_TYPE', payload);
		},
		SET_ACTIVE_PROFILE_ID_ACTION: (context, payload) => {
			context.commit('SET_ACTIVE_PROFILE_ID', payload);
		},
		DELETE_PROFILE_ACTION: async (context, payload) => {
			try {
				await axios.delete(`https://retoolapi.dev/wHFLgA/data/${payload}`);
				context.commit('DELETE_PROFILE', payload);
			} catch (error) {
				console.error("Ошибка при удалении профиля через API:", error);
			}
		},
		GET_PROFILES_BY_SEARCH_ACTION: async (context, payload) => {
			try {
				const query = new URLSearchParams(payload).toString();
				const { data } = await axios.get(`https://retoolapi.dev/wHFLgA/data?${query}`);
				context.commit('SET_USERS', data);
			} catch (error) {
				console.error('Ошибка при получении данных для поиска:', error);
			}
		},
		GET_PROFILE_BY_ID_ACTION: async (context, payload) => {
			try {
				const { data } = await axios.get(`https://retoolapi.dev/wHFLgA/data/${payload}`);
				return data;
			} catch (error) {
				console.error("Ошибка при получении профиля:", error);
			}
		},
		UPDATE_PROFILE_ACTION: async (context, payload) => {
			try {
				const id = context.state.activeProfileId;
				const { data } = await axios.put(`https://retoolapi.dev/wHFLgA/data/${id}`, payload);
				context.commit('UPDATE_PROFILE', data);
			} catch (error) {
				console.error('Ошибка при обновлении профиля:', error);
			}
		}
	},
});