import Vuex from 'vuex';
import LoaderModule from './modules/LoaderModule.store.js';
import BurgerModule from './modules/BurgerModule.store.js';
import ProfileModule from './modules/ProfileModule.store.js';
import UserModule from './modules/UserModule.store.js';

export const store = new Vuex.Store({
	modules: {
		LoaderModule,
		BurgerModule,
		ProfileModule,
		UserModule,
	},
});