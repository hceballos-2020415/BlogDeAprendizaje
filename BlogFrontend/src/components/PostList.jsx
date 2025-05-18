import React, { useState, useEffect } from 'react'
import usePosts from '../shared/hooks/usePost'
import PostCard from './PostCard'

const PostList = () => {
    const [course, setCourse] = useState('')
    const [year, setYear] = useState('')
    const { posts, loading, error } = usePosts(course, year)

    useEffect(() => {
        console.log('Curso seleccionado:', course)
        console.log('Año seleccionado:', year)
    }, [course, year])

  return (
    <div className="container">
        <select onChange={(e) => setCourse(e.target.value)} value={course}>
            <option value="">Todos los cursos</option>
            <option value="Taller">Taller</option>
            <option value="Tecnología">Tecnologia</option>
            <option value="Practica Supervisada">Práctica Supervisada</option>
        </select>

        <select onChange={(e) => setYear(e.target.value)} value={year}>
            <option value="">Todos los Años</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>

        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : null}

        {!loading && !error && Array.isArray(posts) && posts.length === 0 && (
            <p>No se encontraron publicaciones para el filtro seleccionado</p>
        )}
    </div>
    )
}

export default PostList
