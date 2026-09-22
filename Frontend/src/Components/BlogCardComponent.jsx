import { useEffect, useState } from "react";
import { api } from "../api";
import './BlogCardComponent.css'

export function BlogCardComponent() {
    const [blogData, setBlogData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getBlogData = async () => {
            try {
                const response = await api.get("/blog");
                setBlogData(response.data.data);
            } catch (requestError) {
                setError("Could not load blogs.");
                console.error(requestError);
            }
        };

        getBlogData();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className="blog-card-container">
            {blogData.map((blog) => (
                <article key={blog.b_id}>
                    <h2>{blog.b_title}</h2>
                    <p>{blog.b_content}</p>
                    <span>
                        By {blog.u_firstName} {blog.u_lastName}
                    </span>
                </article>
            ))}
        </div>

    );
}
