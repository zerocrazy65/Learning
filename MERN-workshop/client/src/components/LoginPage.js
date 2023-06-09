import { useEffect, useState } from "react";
import Navbar from "./NavbarPage";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Swal from "sweetalert2";
import { authentication, getUser } from "../services/authorize";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const LoginComponent = (props) => {
   console.log(props);
   const [state, setState] = useState({ username: "", password: "" });
   const { username, password } = state;

   const inputValue = (name) => (event) => {
      setState({ ...state, [name]: event.target.value });
   };

   const submitForm = (e) => {
      e.preventDefault();
      axios
         .post("https://mern-stack-server-m7rh.onrender.com/api/login", {
            username,
            password,
         })
         .then((res) => {
            authentication(res, () => props.history.push("/create"));
         })
         .catch((err) => {
            Swal.fire("Notification", err.response.data.error, "error");
         });
   };

   useEffect(() => {
      getUser() && props.history.push("/");
   }, []);

   return (
      <div className="container">
         <Navbar />
         <h1>Login | Admin</h1>
         <form onSubmit={submitForm}>
            <div className="form-group">
               <label>Username</label>
               <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={inputValue("username")}
               />
            </div>
            <div className="form-group">
               <label>Password</label>
               <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={inputValue("password")}
               />
            </div>
            <br />
            <input type="submit" value="Login" className="btn btn-primary" />
         </form>
      </div>
   );
};

export default withRouter(LoginComponent);
