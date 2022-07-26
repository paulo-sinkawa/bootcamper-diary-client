import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/Profile";
import { ErrorPage } from "./pages/ErrorPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { UpdateProfile } from "./pages/UpdateProfile";
import "bootstrap/dist/css/bootstrap.css";
import { CreatePost } from "./pages/CreatePost";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/update-profile"
            element={<ProtectedRoute component={UpdateProfile} />}
          />
          <Route
            path="/create-post"
            element={<ProtectedRoute component={CreatePost} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
