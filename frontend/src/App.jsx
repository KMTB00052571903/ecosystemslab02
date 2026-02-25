import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostsList from "./PostsList";
import CreatePost from "./CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostsList />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
