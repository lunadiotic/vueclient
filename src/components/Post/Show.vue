<template>
    <div>
        <form action="#" @submit.prevent>
            <div class="form-group">     
                <label for="">Title</label>
                <input type="text" id="title" class="form-control" v-model="post.title">
            </div>
            <div class="form-group">
                <label for="">Description</label>
                <textarea id="description" cols="10" rows="4" class="form-control" v-model="post.description"></textarea>
            </div>
            <div class="form-group">
                <label for="">Status: </label> {{ post.published }}
            </div>
            <button @click="postUpdate" class="btn btn-sm btn-success m-1">Update</button>
            <button 
                @click="postPublished(false)" 
                class="btn btn-sm btn-primary m-1"
                v-if="post.published"
            >Unpubslihed</button>
            <button 
                @click="postPublished(true)" 
                class="btn btn-sm btn-primary m-1"
                v-else
            >Published</button>
            <button 
                class="btn btn-sm btn-danger m-1"
                @click="postDelete" 
            >Remove</button>
            
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import PostService from "../../services/PostService";

export default {
    name: "post-update",
    data() {
        return {
            post: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ''
        }
    },

    methods: {
        getPost(id) {
            PostService.get(id)
                .then((result) => {
                    this.post = result.data;
                    console.log(this.post);
                }).catch((err) => {
                    console.log(err);
                });
        },

        postUpdate() {
            PostService.update(this.post.id, this.post)
                .then((result) => {
                    console.log(result);
                    this.message = 'The post was updated successfully!';
                }).catch((err) => {
                    console.log(err);
                });
        },

        postDelete() {
            PostService.delete(this.post.id)
                .then((result) => {
                    console.log(result.data);
                    this.$router.push({ name: "posts" });
                }).catch((err) => {
                    console.log(err);
                });
        },

        postPublished(status) {
            this.post.published = status;
            this.postUpdate();
        }
    },

    mounted() {
        this.getPost(this.$route.params.id);
    }
}
</script>