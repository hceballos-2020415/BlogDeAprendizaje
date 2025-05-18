import React, { useState, useEffect } from 'react'

const CommentForm = ({ onAddComment, commentToEdit, onUpdateComment, onDeleteComment, onCancelEdit }) => {
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (commentToEdit) {
            setName(commentToEdit.name)
            setContent(commentToEdit.content)
        }
    }, [commentToEdit])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name && content) {
            if (commentToEdit) {
                onUpdateComment(commentToEdit._id, { name, content })
            } else {
                onAddComment(name, content)
            }
            setName('')
            setContent('')
        }
    }

    const handleDelete = () => {
        if (commentToEdit) {
            onDeleteComment(commentToEdit._id)
            setName('')
            setContent('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="comment-form">
            <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Escribe tu comentario"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">{commentToEdit ? 'Actualizar' : 'Comentar'}</button>
            {commentToEdit && (
                <button type="button" onClick={handleDelete} className="delete-button">
                    Eliminar
                </button>
            )}
            {commentToEdit && (
                <button type="button" onClick={onCancelEdit}>
                    Cancelar
                </button>
            )}
        </form>
    )
}

export default CommentForm
