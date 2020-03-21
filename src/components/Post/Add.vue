<template>
    <div>
        <div v-if="!submitted">
            <form action="#" @submit.prevent>
                <div class="form-group">     
                    <label for="">Title</label>
                    <input type="text" id="title" class="form-control" v-model="post.title">
                </div>
                <div class="form-group">
                    <label for="">Description</label>
                    <textarea id="description" cols="10" rows="4" class="form-control" v-model="post.description"></textarea>
                </div>
                <button @click="postSubmit" class="btn btn-success">Submit</button>
            </form>
        </div>
        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-primary" @click="postNew">Add</button>
        </div>
    </div>
</template>

<script>
import PostService from "../../services/PostService";

export default {
    name: "post-add",
    data() {
        return {
            post: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            submitted: false
        }
    },

    methods: {
        postSubmit() {
            let data = {
                title: this.post.title,
                description: this.post.description
            };

            PostService.create(data)
                .then((result) => {
                    this.post.id = result.data.id
                    console.log(result)
                }).catch((err) => {
                    console.log(err);
                });

            this.submitted = true;
        },

        postNew() {
            this.submitted = false;
            this.post = {};
        }
    }
}
</script>