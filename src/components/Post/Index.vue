<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" v-model="title">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <h4>Posts List</h4>
                <div class="card mb-3" style=""
                    v-for="(post, index) in posts" :key="index"
                >
                    <div class="card-body">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ post.publised ? 'Publish' : 'Unpublish' }}</h6>
                        <p class="card-text">{{ post.description }}</p>
                        <a :href="'/posts/' + post.id" class="card-link">Edit</a>
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

        removeAllPosts() {
            PostService.deleteAll()
            .then((result) => {
                console.log(result.data);
                this.retrievePosts();
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