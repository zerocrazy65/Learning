import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/NavbarPage";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getUser, getToken } from "./services/authorize";

function App() {
   const [blogs, setBlogs] = useState([]);

   const fetchData = () => {
      axios
         .get(`${process.env.REACT_APP_API}/blogs`)
         .then((res) => {
            setBlogs(res.data);
         })
         .catch((err) => alert(err));
   };
   useEffect(() => {
      fetchData();
   }, []);

   const renderTextContent = (html) => {
      const div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
   };

   const confirmDelete = (slug) => {
      Swal.fire({
         title: "Are you sure you want to delete",
         icon: "warning",
         showCancelButton: true,
      }).then((result) => {
         if (result.isConfirmed) {
            deleteBlog(slug);
         }
      });
   };

   const deleteBlog = (slug) => {
      axios
         .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
            headers: {
               authorization: `Bearer ${getToken()}`,
            },
         })
         .then((res) => {
            Swal.fire("Deleted!", `${res.data.message}`, "success");
            fetchData();
         })
         .catch((err) =>
            Swal.fire("Deleted Failed", `error: ${err}`, "failed")
         );
   };

   return (
      <div className="container">
         <Navbar />
         {blogs.map((blog, index) => (
            <div
               className="row"
               key={index}
               style={{ borderBottom: "1px solid silver" }}
            >
               <div className="col pt-3 pb-2">
                  <Link to={`/blog/${blog.slug}`}>
                     <h2>{blog.title}</h2>
                  </Link>
                  <p>{renderTextContent(blog.content.substring(0, 250))}</p>
                  <p className="text-muted">
                     Author : {blog.author} , Release Date :{" "}
                     {new Date(blog.createdAt).toLocaleString()}
                  </p>
                  {getUser() && (
                     <div>
                        <Link
                           className="btn btn-outline-success"
                           to={`/blog/edit/${blog.slug}`}
                        >
                           Edit Article
                        </Link>
                        &nbsp;
                        <button
                           className="btn btn-outline-danger"
                           onClick={() => confirmDelete(blog.slug)}
                        >
                           Delete Article
                        </button>
                     </div>
                  )}
               </div>
            </div>
         ))}
      </div>
   );
}

export default App;
