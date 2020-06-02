import Vue from 'vue';
import VueRouter from 'vue-router';
import FrontPage from './pages/FrontPage';
import Page from './pages/Page';
import Post from './pages/Post';
import PostQuiz from './pages/PostQuiz';
import NotFound from './pages/NotFound';

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: FrontPage },
    { path: '/page/:id', component: Page },
    { path: '/post/:id', component: Post },
    { path: '/quiz/:id', component: PostQuiz },
    { path: '*', component: NotFound }
  ]
})