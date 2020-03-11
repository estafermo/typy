import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Post from './posts.interface';
import postModel from './post.model';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto'; 
import authMiddleware from '../middleware/auth.middleware';
import RequestWithUser from '../interfaces/requestWithUser.interface';

class PostsController implements Controller {
  public path = '/posts';
  public router = express.Router();
  private post = postModel;
 
  constructor() {
    this.initializeRoutes();
  }
 
   
  
  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
 
      this.router
        .all(`${this.path}/*`, authMiddleware)
        .patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost)
        .delete(`${this.path}/:id`, this.deletePost)
        .post(this.path, authMiddleware, validationMiddleware(CreatePostDto), this.createPost);
    
    // this.router.put(`${this.path}/:id`, this.modifyPost);
    // this.router.delete(`${this.path}/:id`, this.deletePost);
    // //this.router.post(this.path, this.createPost);
    // this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
    // this.router.patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost);
  }
 
  private getAllPosts = (request: express.Request, response: express.Response) => {
    //   var posts :any = [];
    //   response.send(posts);
    this.post.find()
      .then((posts) => {
        response.send(posts);
      });

  }
 
  private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    this.post.findById(id)
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          //response.status(404).send({ error: 'Post not found' });
          //next(new HttpException(404, 'Post not found'));
          next(new PostNotFoundException(id));
        }
      });
  }
 
  private modifyPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    const postData: Post = request.body;
    this.post.findByIdAndUpdate(id, postData, { new: true })
      .then((post) => {
        if(post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
      });
  }
 
  // private createPost = (request: express.Request, response: express.Response) => {
  //   const postData: Post = request.body;
  //   const createdPost = new this.post(postData);
  //   createdPost.save()
  //     .then((savedPost) => {
  //       response.send(savedPost);
  //     });
  // }

  private createPost = async (request: RequestWithUser, response: express.Response) => {
    const postData: CreatePostDto = request.body;
    const createdPost = new this.post({
      ...postData,
      authorId: request.user._id,
    });
    const savedPost = await createdPost.save();
    response.send(savedPost);
  }
 
  private deletePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const id = request.params.id;
    this.post.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.send(200);
        } else {
          //response.send(404);
          next(new PostNotFoundException(id));
        }
      });
  }
}
 
export default PostsController;