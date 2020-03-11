import  App from './app';
import PostsController from './posts/posts.controller';
import 'dotenv/config';
import AuthenticationController from './authentication/authentication.controller';
// import { validateEnv }  from './utils/validateEnv';
 
// validateEnv();

const app = new App(
  [
    new PostsController(),
    new AuthenticationController(),
  ],
  5000,
);
 
app.listen();