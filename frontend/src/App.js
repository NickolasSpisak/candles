import React, { useEffect } from "react";
import Header from "./componants/header";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./componants/home";
import Signup from "./componants/signup";
import Signin from "./componants/signin";
import UserDashboard from "./componants/UserDashboard";
import AdminDashboard from "./componants/AdminDashboard";
import AdminRoute from "./componants/AdminRoute";
import UserRoute from "./componants/UserRoute";
import NotFound from "./componants/notFound";
//redux
import { useDispatch } from "react-redux";
import { getCategories } from "./redux/actions/categoryActions";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories);
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <UserRoute exact path="/user/dashboard" component={UserDashboard} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
