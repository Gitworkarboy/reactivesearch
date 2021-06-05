import Vue from 'vue';
import App from './App.vue';
import {
	ReactiveBase,
	ReactiveGoogleMap,
	SelectedFilters,
	SingleList
} from '@appbaseio/reactivesearch-vue';

Vue.use(ReactiveBase);
Vue.use(SingleList);
Vue.use(SelectedFilters);
Vue.use(ReactiveGoogleMap, {
	key: 'AIzaSyAKz3UhgSuP872fb-Aw27oPRI7M0eXkA9U',
});
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
