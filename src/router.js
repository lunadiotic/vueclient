import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/posts",
            name: "posts",
            component: () => import("./components/post/Index")
        },
        {
            path: "/posts/:id",
            name: "post-detail",
            component: () => import("./components/post/Show")
        },
        {
            path: "/add",
            name: "post-add",
            component: () => import("./components/post/Add")
        },
    ]
});