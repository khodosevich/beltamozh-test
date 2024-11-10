const state = {
	isFetchRequest: false,
};

const getters = {
	IS_FETCH_REQUEST: state => state.isFetchRequest,
};

const actions = {
	UPDATE_FETCH_REQUEST_ACTION: (context, payload) => {
		context.commit('UPDATE_FETCH_REQUEST', payload);
	},
};

const mutations = {
	UPDATE_FETCH_REQUEST: (state, payload) => {
		state.isFetchRequest = payload;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};