import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
class App {
    constructor(controllers, port) {
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        this.app.use(bodyParser.json());
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    connectToTheDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
        //mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
        mongoose.connect('mongodb+srv://a:b@cluster0-wsayn.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
    }
}
export default App;
//# sourceMappingURL=app.js.map