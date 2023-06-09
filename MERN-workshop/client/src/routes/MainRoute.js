import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import FormComponent from "../components/FormPage";
import BlogSelected from "../components/BlogSelected";
import EditComponent from "../components/EditPage";
import LoginComponent from "../components/LoginPage";
import AdminRoute from "./AdminRoute";
const MainRoute = () => {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/" exact component={App} />
            <AdminRoute path="/create" exact component={FormComponent} />
            <Route path="/blog/:slug" exact component={BlogSelected} />
            <AdminRoute
               path="/blog/edit/:slug"
               exact
               component={EditComponent}
            />
            <Route path="/login" exact component={LoginComponent} />
         </Switch>
      </BrowserRouter>
   );
};

export default MainRoute;
