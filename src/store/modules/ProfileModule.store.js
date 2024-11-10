export const ProfileActionTypeEnum = {
	ADD: 1,
	EDIT: 2,
	DELETE: 3,
	SEARCH: 4,
};

const state = {
	profileActionType: ProfileActionTypeEnum.ADD,
};


const getters = {
	PROFILE_ACTION_TYPE: state => state.profileActionType,
};

const actions = {
	UPDATE_PROFILE_ACTION_TYPE_ACTION: (context, payload) => {
		context.commit('UPDATE_PROFILE_ACTION_TYPE', payload);
	},
};

const mutations = {
	UPDATE_PROFILE_ACTION_TYPE: (state, payload) => {
		state.profileActionType = payload;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};