import { useState, useEffect } from 'react'
import { getComments, addComment, updateComment, deleteComment  } from '../../services/api.js'


const useComments = (postId) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true)
                const data = await getComments(postId)
                if (data.message === "No hay comentarios para esta publicación") {
                    setComments([])
                    setError(null)
                } else {
                    setComments(data)
                    setError(null)
                }
            } catch (err) {
                setError('Error al cargar los comentarios')
            } finally {
                setLoading(false)
            }
        }
        if (postId) fetchComments()
    }, [postId])
    const handleAddComment = async (name, content) => {
        try {
            const newComment = { postId, name, content }
            const addedComment = await addComment(newComment)
            setComments((prevComments) => [addedComment, ...prevComments])

        } catch (err) {
            setError('Error al agregar comentario')
        }
    }
    const handleUpdateComment = async (commentId, updatedData) => {
        try {
            const updatedComment = await updateComment(commentId, updatedData)
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === updatedComment._id ? updatedComment : comment
                )
            )
        } catch (err) {
            setError('Error al actualizar comentario')
        }
    }
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId)
            setComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId)
            )
        } catch (err) {
            setError('Error al eliminar comentario');
        }
    }

    return { comments, loading, error, handleAddComment, handleUpdateComment, handleDeleteComment }
}
export default useComments