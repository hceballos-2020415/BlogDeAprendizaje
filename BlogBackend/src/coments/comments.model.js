import { Schema, model } from 'mongoose'


const ComentSchema = new Schema({
        postId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Post', 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        content: { 
            type: String, 
            required: true 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    }
)

export default model('Coment', ComentSchema)