import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://posts-app-seven-omega.vercel.app/posts";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    };
    loadPosts();
  }, []);

  const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    // refrescar lista
    const res = await axios.get(API_URL);
    setPosts(res.data);
  };

  return (
    <div>
      <h1>Posts</h1>
      <a href="/create">Crear nuevo post</a>
      {posts.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <img src={p.imageUrl} alt={p.title} width="200" />
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <button onClick={() => deletePost(p.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}
