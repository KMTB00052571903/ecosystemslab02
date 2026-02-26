import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//const API_URL = "https://posts-app-seven-omega.vercel.app/posts";


const API_URL = "http://localhost:3000/posts"; // Cambia a tu URL de Vercel después

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (error) {
      console.error("Error al cargar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      loadPosts();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  if (loading) return <div className="loading">Cargando posts...</div>;

  return (
    <>
      <nav className="navbar">
        <h1>📸 Posts App</h1>
        <Link to="/create" className="create-button">+ Crear Nuevo Post</Link>
      </nav>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="no-posts">No hay posts aún. ¡Crea el primero!</div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="image-container" style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' // Esto hace que todas las imágenes tengan el mismo tamaño
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x200?text=Image+not+found';
                  }}
                />
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
                <button 
                  onClick={() => deletePost(post.id)} 
                  className="delete-btn"
                >
                  Eliminar {/* ✅ Corregido: antes decía "Elminar" */}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}