import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: 'http://localhost:3900/v1',
  timeout: 2000,
})

export const getPosts = async () => {
    try {
        const response = await api.get('/post/getPosts')
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al obtener publicaciones',
            details: error
        }
    }
}

export const getPostsByCourse = async (course) => {
    try {
        const response = await api.get(`/post/${course}`)
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al obtener publicaciones por curso',
            details: error
        }
    }
}

export const getPostsByYear = async (year) => {
    try {
        const response = await api.get(`/post/year/${year}`)
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al obtener publicaciones por año',
            details: error
        }
    }
}

export const getComments = async (postId) => {
    try {
        const response = await api.get(`/comment/comments/${postId}`)
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al obtener comentarios',
            details: error
        }
    }
}

export const addComment = async (comment) => {
    try {
        const response = await api.post('/comment/comment', comment)
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al agregar comentario',
            details: error
        }
    }
}

export const updateComment = async (commentId, updatedComment) => {
    try {
        const response = await api.put(`/comment/comment/${commentId}`, updatedComment)
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al actualizar comentario',
            details: error
        }
    }
}

export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`/comment/comment/${commentId}`)
        return response.data
    } catch (error) {
        return {
            error: true,
            message: 'Error al eliminar comentario',
            details: error
        }
    }
}
