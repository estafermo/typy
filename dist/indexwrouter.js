import * as express from 'express';
import * as bodyParser from 'body-parser';
function loggerMiddleware(request, response, next) {
    console.log('whithin middleware');
    console.log(`${request.method} ${request.path}`);
    next();
}
const app = express();
const router = express.Router();
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(router);
router.get('/', (request, response) => {
    response.send("hello");
});
app.listen(5000);
//# sourceMappingURL=indexwrouter.js.map