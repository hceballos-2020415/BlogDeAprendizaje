import { Router } from 'express'
import { getAllPosts, getPostsByCourse, getPostsByYear, updatePost} from './post.controller.js'

const api = Router()

api.get('/getPosts',getAllPosts)
api.get('/:course',getPostsByCourse)
api.put('/:id',updatePost)
api.get('/year/:year',getPostsByYear)

export default api
