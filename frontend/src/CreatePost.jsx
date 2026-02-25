import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://posts-app-seven-omega.vercel.app/posts"; // backend en Vercel

export default function CreatePost() {
  const [form, setForm] = useState({ imageUrl: "", title: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button type="submit">Crear Post</button>
    </form>
  );
}
