import Vue from 'vue';
import VueRouter from 'vue-router';
import FrontPage from './pages/FrontPage';
import Intro from './pages/Intro';
import PostQuiz from './pages/PostQuiz';

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: FrontPage },
    { path: '/intro', component: Intro },
    { path: '/quiz/:id', component: PostQuiz }
  ]
})