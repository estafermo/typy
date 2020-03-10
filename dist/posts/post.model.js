import * as mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    title: String,
});
const postModel = mongoose.model('Post', postSchema);
export default postModel;
//# sourceMappingURL=post.model.js.map