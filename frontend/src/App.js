import Header from "./componants/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./componants/home";
import Signup from "./componants/signup";
import Signin from "./componants/signin";
import UserDashboard from "./componants/UserDashboard";
import AdminDashboard from "./componants/AdminDashboard";
import AdminRoute from "./componants/AdminRoute";
import UserRoute from "./componants/UserRoute";
import NotFound from "./componants/notFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <UserRoute exact path="/user/dashboard" element={<UserDashboard />} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
          <Route element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
