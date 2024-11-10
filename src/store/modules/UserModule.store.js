import axios from 'axios';

export const ProfileEnum = {
	ALL: 1,
	PROCESSED: 2,
	UNPROCESSED: 3,
};

const state = {
	users: [],
	activeUserId: -1,
	currentProfile: ProfileEnum.ALL,
};

const getters = {
	FILTERED_USERS: state => {
		switch (state.currentProfile) {
			case ProfileEnum.ALL:
			default:
				return state.users;
			case ProfileEnum.PROCESSED:
				return state.users.filter(user => user.status);
			case ProfileEnum.UNPROCESSED:
				return state.users.filter(user => !user.status);
		}
	},
	ACTIVE_USER_ID: state => state.activeUserId,
	CURRENT_PROFILE: state => state.currentProfile,
};

const actions = {
	SET_USERS_ACTION: async (context, payload) => {
		try {
			let { data } = await axios.get('https://retoolapi.dev/wHFLgA/data');
			context.commit('SET_USERS', data);
		}
		catch (error) {
			console.error('Ошибка при получении профилей через API:', error);
		}
	},
	SET_CURRENT_PROFILE_ACTION: (context, payload) => {
		context.commit('SET_CURRENT_PROFILE', payload);
	},
	ADD_NEW_USER_ACTION: async (context, payload) => {
		try {
			console.log(payload);
			let { data } = await axios.post('https://retoolapi.dev/wHFLgA/data', payload);
			console.log(data);
			context.commit('ADD_NEW_USER', data);
		}
		catch (error) {
			console.error('Ошибка при добавлении профиля через API:', error);
		}
	},
	SET_ACTIVE_USER_ID_ACTION: (context, payload) => {
		context.commit('SET_ACTIVE_USER_ID', payload);
	},
	DELETE_USERS_ACTION: async (context, payload) => {
		try {
			await axios.delete(`https://retoolapi.dev/wHFLgA/data/${payload}`);
			context.commit('DELETE_USER', payload);
		}
		catch (error) {
			console.error('Ошибка при удалении профиля через API:', error);
		}
	},
	GET_USERS_BY_SEARCH_ACTION: async (context, payload) => {
		try {
			const query = new URLSearchParams(payload).toString();
			const { data } = await axios.get(`https://retoolapi.dev/wHFLgA/data?${query}`);
			context.commit('SET_USERS', data);
		}
		catch (error) {
			console.error('Ошибка при получении данных для поиска:', error);
		}
	},
	GET_USER_BY_ID_ACTION: async (context, payload) => {
		try {
			const { data } = await axios.get(`https://retoolapi.dev/wHFLgA/data/${payload}`);
			return data;
		}
		catch (error) {
			console.error('Ошибка при получении профиля:', error);
		}
	},
	UPDATE_USER_ACTION: async (context, payload) => {
		try {
			const id = context.state.activeUserId;
			const { data } = await axios.put(`https://retoolapi.dev/wHFLgA/data/${id}`, payload);
			context.commit('UPDATE_USER', data);
		}
		catch (error) {
			console.error('Ошибка при обновлении профиля:', error);
		}
	},
};

const mutations = {
	SET_USERS: (state, payload) => {
		state.users = payload;
	},
	SET_CURRENT_PROFILE: (state, payload) => {
		state.currentProfile = payload;
	},
	ADD_NEW_USER: (state, payload) => {
		state.users.push(payload);
	},
	SET_ACTIVE_USER_ID: (state, payload) => {
		state.activeUserId = payload;
	},
	DELETE_USER: (state, payload) => {
		state.users = [...state.users.filter(user => user.id !== payload)];
	},
	UPDATE_USER: (state, payload) => {
		state.users = state.users.map(user =>
			user.id === payload.id ? { ...user, ...payload } : user,
		);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};