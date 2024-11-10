const state = {
	burgerIsOpen: false,
};

const getters = {
	BURGER_STATE: state => state.burgerIsOpen,
};

const actions = {
	TOGGLE_BURGER_STATE_ACTION: (context, payload) => {
		context.commit('TOGGLE_BURGER_STATE', payload);
	},
};

const mutations = {
	TOGGLE_BURGER_STATE: (state, payload) => {
		state.burgerIsOpen = payload;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};