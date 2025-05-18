/*
    Hettson Enrique Ceballos Alcalán
    2020415
    IN6AM
*/


'use strict'
import Post from '../src/post/post.model.js'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import postRoutes from '../src/post/post.routes.js'
import commentRoutes from '../src/coments/comments.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/post', postRoutes)
    app.use('/v1/comment', commentRoutes)
}

const createPosts = async () => {
    try {
        const postData = [
            {
                title: "CRUD Veterinaria",
                description: "Proyecto de un CRUD para una veterinaria que premite agregar, actualizar, eliminar y buscar",
                course: "Taller",
                year: 2023,
                projectLink: "https://github.com/hceballos-2020415/CRUDVeterinaria.git",
                createdAt: new Date()
            },
            {
                title: "Kinal Store",
                description: "Se hizo un proyecto de supermercado",
                course: "Taller",
                year: 2024,
                projectLink: "https://github.com/hceballos-2020415/kinalStore2024.git",
                createdAt: new Date()
            },
            {
                title: "Proyecto Coperex",
                description: "Se realizo un programa para ayudar a  la empresa Coperex",
                course: "Taller",
                year: 2025,
                projectLink: "https://github.com/hceballos-2020415/caso-COPEREX.git",
                createdAt: new Date()
            },
            {
                title: "Infografia React",
                description: "Se realizo una infografia sobre los beneficios de React",
                course: "Tecnología",
                year: 2025,
                projectLink: "https://github.com/hceballos-2020415/Infograf-a-beneficios-React.git",
                createdAt: new Date()
            }
        ]


        for (const post of postData) {
            const existingPost = await Post.findOne({ title: post.title })
            if (!existingPost) {
                await Post.create(post) 
                console.log(`Post "${post.title}" created correctly`)
            } else {
                console.log(`Post "${post.title}" already exists in the database`)
            }
        }
        } catch (error) {
        console.error("Error when creating posts:", error)
    }
}

createPosts()

export const initServer = async()=>{
    const app = express()
    try {   
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}