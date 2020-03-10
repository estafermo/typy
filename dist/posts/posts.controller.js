import * as express from 'express';
import postModel from './post.model';
class PostsController {
    constructor() {
        this.path = '/posts';
        this.router = express.Router();
        this.post = postModel;
        this.getAllPosts = (request, response) => {
            //   var posts :any = [];
            //   response.send(posts);
            this.post.find()
                .then((posts) => {
                response.send(posts);
            });
        };
        this.getPostById = (request, response) => {
            const id = request.params.id;
            this.post.findById(id)
                .then((post) => {
                response.send(post);
            });
        };
        this.modifyPost = (request, response) => {
            const id = request.params.id;
            const postData = request.body;
            this.post.findByIdAndUpdate(id, postData, { new: true })
                .then((post) => {
                response.send(post);
            });
        };
        this.createPost = (request, response) => {
            const postData = request.body;
            const createdPost = new this.post(postData);
            createdPost.save()
                .then((savedPost) => {
                response.send(savedPost);
            });
        };
        this.deletePost = (request, response) => {
            const id = request.params.id;
            this.post.findByIdAndDelete(id)
                .then((successResponse) => {
                if (successResponse) {
                    response.send(200);
                }
                else {
                    response.send(404);
                }
            });
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.modifyPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(this.path, this.createPost);
    }
}
export default PostsController;
//# sourceMappingURL=posts.controller.js.map