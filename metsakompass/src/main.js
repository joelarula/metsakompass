import Vue from 'vue'
import App from './App.vue'
import Vuetify , { VLayout,VContent, VContainer, VApp, VToolbar,VToolbarItems, VIcon, VBtn, VFlex, VDataTable, VChip } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
	  components: { VLayout, VContent, VContainer,VToolbarItems, VApp, VToolbar, VIcon, VBtn, VFlex, VDataTable, VChip }
});

Vue.config.productionTip = false



new Vue({
  render: h => h(App),
}).$mount('#app')
