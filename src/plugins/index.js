import vuetify from './vuetify';
import { store } from '../store/index.js';

export function registerPlugins(app) {
	app
		.use(vuetify)
		.use(store);
}