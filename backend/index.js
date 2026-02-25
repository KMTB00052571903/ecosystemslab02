const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let posts = []; // almacenamiento en memoria

// GET /posts
app.get("/posts", (req, res) => {
  res.json(posts);
});

// POST /posts
app.post("/posts", (req, res) => {
  const { imageUrl, title, description } = req.body;
  if (!imageUrl || !title || !description) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  const newPost = {
    id: Date.now().toString(),
    imageUrl,
    title,
    description,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// DELETE /posts/:id
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.json({ message: "Post eliminado" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
