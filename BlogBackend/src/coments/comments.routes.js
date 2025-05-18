import { Router } from 'express'
import { addComment,getComments,deleteComment,updateComment} from './comments.controller.js'


const api = Router();

api.post('/comment',addComment)
api.get('/comments/:postId',getComments)
api.delete('/comment/:id',deleteComment)
api.put('/comment/:id',updateComment)

export default api
