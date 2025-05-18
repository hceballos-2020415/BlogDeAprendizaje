import Comment from './comments.model.js';

export const addComment = async (req, res) => {
  try {
    const { postId, name, content } = req.body;
    
    const newComment = new Comment({
      postId,
      name,
      content
    });
    
    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    return res.status(400).json({
      message: "Error al crear el comentario",
      error
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;
  
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, content },
      { new: true }
    );
    
    if (!updatedComment) {
      return res.status(404).json({ 
        message: "Comentario no encontrado" 
      });
    }
    
    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar el comentario",
      error
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    
    if (!deletedComment) {
      return res.status(404).json({ 
        message: "Comentario no encontrado" 
      });
    }
    
    return res.status(200).json({ 
      message: "Comentario eliminado con éxito" 
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al eliminar el comentario",
      error
    });
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;
  
  try {
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .exec();
    
    if (!comments.length) {
      return res.status(200).json({
        message: "No hay comentarios para esta publicación",
        comments: []
      });
    }
    
    return res.status(200).json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    return res.status(500).json({
      message: "Error al obtener los comentarios",
      error
    });
  }
};