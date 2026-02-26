import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const API_URL = "https://postsbackend.vercel.app/posts"; // backend en Vercel

//const API_URL = "http://localhost:3000/posts"; // Cambiar a la  URL de Vercel después

export default function CreatePost() {
  const [form, setForm] = useState({ imageUrl: "", title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(API_URL, form);
      navigate("/");
    } catch (error) {
      console.error("Error al crear post:", error);
      alert("Error al crear el post. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1>📸 Crear Nuevo Post</h1>
        <Link to="/" className="create-button">← Volver</Link>
      </nav>

      <div className="create-container">
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>URL de la imagen</label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título del post"
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción del post"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Post"}
          </button>
        </form>
      </div>
    </>
  );
}