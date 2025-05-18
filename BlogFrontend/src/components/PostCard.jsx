import React, { useState } from 'react'
import useComments from '../shared/hooks/useComment'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const PostCard = ({ post }) => {
    const [showComments, setShowComments] = useState(false)
    const [commentToEdit, setCommentToEdit] = useState(null)
    const { comments, loading, error, handleAddComment, handleUpdateComment, handleDeleteComment } = useComments(post._id)

    const handleEditComment = (comment) => {
        setCommentToEdit(comment)
    }

    const handleCancelEdit = () => {
        setCommentToEdit(null)
    }

    const handleUpdate = async (commentId, updatedData) => {
        await handleUpdateComment(commentId, updatedData)
        setCommentToEdit(null)
    }

    const handleDelete = async (commentId) => {
        await handleDeleteComment(commentId)
        setCommentToEdit(null)
    }

    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p><strong>Curso:</strong> {post.course}</p>
            <p><strong>Año:</strong> {post.year}</p>  
            <p><strong>Enlace del Proyecto:</strong> <a href={post.projectLink} target="_blank" rel="noopener noreferrer">Ver Proyecto</a></p>  
            <button onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Ocultar Comentarios' : 'Ver Comentarios'}
            </button>

            {showComments && (
                <>
                    <CommentForm
                        onAddComment={handleAddComment}
                        commentToEdit={commentToEdit}
                        onUpdateComment={handleUpdate}
                        onDeleteComment={handleDelete}
                        onCancelEdit={handleCancelEdit}
                    />
                    {loading && <p>Cargando comentarios...</p>}
                    {error && <p>{error}</p>}
                    <CommentList
                        comments={comments}
                        onEditComment={handleEditComment}
                        onDeleteComment={handleDelete}
                    />
                </>
            )}
        </div>
    )
}

export default PostCard
