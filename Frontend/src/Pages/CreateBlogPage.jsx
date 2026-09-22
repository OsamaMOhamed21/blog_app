import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { NavbarComponent } from "../Components/NavBar";

export function CreateBlogPage({ isLoggedIn, currentUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!currentUser) return setError("Log in before publishing a blog.");
    try { await api.post("/blog", { ...form, authorId: currentUser.id }); navigate("/blogs"); }
    catch (requestError) { setError(requestError.response?.data?.message ?? "Could not publish the blog."); }
  };
  return <><NavbarComponent isLoggedIn={isLoggedIn} currentUser={currentUser} /><main className="page-container"><h1>Write a blog</h1>{error && <p className="page-error">{error}</p>}
    <form className="stack-form" onSubmit={submit}><input required placeholder="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /><textarea required placeholder="Write your post..." value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} /><button type="submit">Publish</button></form>
  </main></>;
}
