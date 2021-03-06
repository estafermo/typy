import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import * as cookieParser from 'cookie-parser';  
 

class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers: Controller[], port: number) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.port = port;
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json()); // to parse the body 
    this.app.use(cookieParser()); // request.cookies
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
 
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
   
  }
}
 
export default App;