import { useEffect, useState } from "react";
import Navbar from "./NavbarPage";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize";
const EditComponent = (props) => {
   const [state, setState] = useState({
      title: "",
      author: "",
      slug: "",
   });

   const [content, setContent] = useState("");

   const submitContent = (e) => {
      setContent(e);
   };

   //get data to edit
   useEffect(() => {
      axios
         .get(
            `https://mern-stack-server-m7rh.onrender.com/api//blog/${props.match.params.slug}`
         )
         .then((res) => {
            const { title, content, author, slug } = res.data;
            setState({ ...state, title, author, slug });
            setContent(content);
         })
         .catch((err) => {
            alert(err);
         });
   }, []);

   const { title, author, slug } = state;

   const showUpdateForm = () => {
      return (
         <form onSubmit={submitForm}>
            <div className="form-group">
               <label>Title</label>
               <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={inputValue("title")}
               />
            </div>
            <div className="form-group">
               <label>Detail</label>
               <ReactQuill
                  value={content}
                  onChange={submitContent}
                  theme="snow"
                  placeholder="write detail of the article"
               />
            </div>
            <div className="form-group">
               <label>Author</label>
               <input
                  type="text"
                  className="form-control"
                  value={author}
                  onChange={inputValue("author")}
               />
            </div>
            <br />
            <input type="submit" className="btn btn-primary" />
         </form>
      );
   };

   //set data to state
   const inputValue = (name) => (event) => {
      setState({ ...state, [name]: event.target.value });
   };

   const submitForm = (e) => {
      e.preventDefault();

      axios
         .put(
            `https://mern-stack-server-m7rh.onrender.com/api/blog/${slug}`,
            {
               title,
               content,
               author,
            },
            {
               headers: {
                  Authorization: `Bearer ${getToken()}`,
               },
            }
         )
         .then((res) => {
            Swal.fire("notification", res.data.message, "success");
         })
         .catch((err) => {
            Swal.fire("Error to edit", err.response.data.error, "error");
         });
   };
   return (
      <div className="container">
         <Navbar />
         <h1>Edit Article</h1>
         {showUpdateForm()}
      </div>
   );
};

export default EditComponent;
