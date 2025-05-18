import Post from './post.model.js';

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, course, year, projectLink } = req.body;
  
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, course, year, projectLink },
      { new: true }
    ).exec();

    if (!updatedPost) {
      return res.status(404).json({ 
        message: "Publicación no encontrada" 
      });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar la publicación",
      error
    });
  }
};

export const getPostsByCourse = async (req, res) => {
  const { course } = req.params;
  
  try {
    const posts = await Post.find({ course })
      .sort({ createdAt: -1 })
      .exec();
      
    if (!posts.length) {
      return res.status(404).json({ 
        message: `No se encontraron publicaciones para el curso: ${course}` 
      });
    }
    
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener publicaciones filtradas",
      error
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .exec();
      
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener publicaciones",
      error
    });
  }
};

export const getPostsByYear = async (req, res) => {
  const { year } = req.params;
  
  try {
    const posts = await Post.find({ year })
      .sort({ year: -1 })
      .exec();
      
    if (!posts.length) {
      return res.status(404).json({ 
        message: `No se encontraron publicaciones para el año: ${year}` 
      });
    }
    
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener publicaciones filtradas",
      error
    });
  }
};