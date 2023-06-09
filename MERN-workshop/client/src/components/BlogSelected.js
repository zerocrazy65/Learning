import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./NavbarPage";
const BlogSelected = (props) => {
   const [blog, setBlogs] = useState("");
   useEffect(() => {
      axios
         .get(
            `https://mern-stack-server-m7rh.onrender.com/api//blog/${props.match.params.slug}`
         )
         .then((res) => {
            setBlogs(res.data);
         })
         .catch((err) => {
            alert(err);
         });
   }, []);
   return (
      <div className="container">
         <Navbar />
         <h1>{blog.title}</h1>
         <p>{blog.content}</p>
         <p className="text-muted">
            Author : {blog.author} , Release Date :{" "}
            {new Date(blog.createdAt).toLocaleString()}
         </p>{" "}
      </div>
   );
};

export default BlogSelected;
