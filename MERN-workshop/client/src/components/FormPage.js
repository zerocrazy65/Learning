import { useState } from "react";
import Navbar from "./NavbarPage";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../services/authorize";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
const FormComponent = ({ history }) => {
   const [state, setState] = useState({
      title: "",
      author: getUser(),
   });
   const { title, author } = state;

   const [content, setContent] = useState("");
   //set data to state
   const inputValue = (name) => (event) => {
      setState({ ...state, [name]: event.target.value });
   };

   const submitContent = (e) => {
      setContent(e);
   };

   const submitForm = (e) => {
      e.preventDefault();
      axios
         .post(
            `${process.env.REACT_APP_API}/create`,
            {
               title,
               content,
               author,
            },
            {
               headers: {
                  authorization: `Bearer ${getToken()}`,
               },
            }
         )
         .then((res) => {
            Swal.fire("notification", "Write Success", "success");
            setState({ ...state, title: "", content: "", author: "" });
            setContent("");
         })
         .catch((err) => {
            console.log(err);
            Swal.fire("notification", err.response.data.error, "error");
         });
   };

   return (
      <div className="container">
         <Navbar />
         <h1>Write Article</h1>
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
      </div>
   );
};

export default withRouter(FormComponent);
