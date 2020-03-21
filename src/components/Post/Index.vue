<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="title">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <h4>Posts List</h4>
                <div class="card mb-3" style=""
                    v-for="(post, index) in posts" :key="index"
                    @click="setActivePost(post, index)"
                >
                    <div class="card-body">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <p class="card-text">{{ post.description }}</p>
                        <a :href="'/posts/' + post.id" class="card-link">Edit</a>
                        <a href="#" class="card-link">Remove</a>
                    </div>
                </div>

                <button class="m-3 btn btn-sm btn-danger" @click="removeAllPosts">
                    Remove All
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import PostService from "../../services/PostService";

export default {
    name: "posts-list",
    data () {
        return {
            posts: [],
            title: ""
        };
    },
    
    methods: {
        retrievePosts() {
            PostService.getAll()
            .then((result) => {
                this.posts = result.data;
            }).catch((err) => {
                console.log(err)
            });
        },

        refreshList() {
            this.retrievePosts();
            this.currentPost = null;
            this.currentIndex = -1;
        },

        removeAllPosts() {
            PostService.deleteAll()
            .then((result) => {
                console.log(result.data);
                this.refreshList();
            }).catch((err) => {
                console.log(err);
            });
        },

        searchTitle() {
            PostService.findByTitle(this.title)
            .then((result) => {
                this.posts = result.data;
                console.log(result.data);
            }).catch((err) => {
                console.log(err);
            });
        },
    },

    mounted() {
        this.retrievePosts();
    }
}
</script>