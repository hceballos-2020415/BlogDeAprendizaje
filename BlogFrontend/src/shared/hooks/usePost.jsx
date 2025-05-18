import { useState, useEffect } from 'react'
import { getPosts, getPostsByCourse, getPostsByYear } from '../../services/api.js'

const usePosts = (course = '', year = '') => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                let data = []
                if (course && year) {
                    const coursePosts = await getPostsByCourse(course)
                    const yearPosts = await getPostsByYear(year)
                    data = coursePosts.filter(post => yearPosts.some(yPost => yPost._id === post._id))
                } else if (course) {
                    data = await getPostsByCourse(course)
                } else if (year) {
                    data = await getPostsByYear(year)
                } else {
                    data = await getPosts()
                }

                setPosts(data)
                setError(null)
            } catch (err) {
                setError('Error al cargar las publicaciones')
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [course, year])

    return { posts, loading, error }
}

export default usePosts 