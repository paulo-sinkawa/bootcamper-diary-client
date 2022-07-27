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
import { MyPosts } from "./pages/MyPost";
import { UpdatePost } from "./pages/UpdatePost";
import { CreateComment } from "./pages/CreateComment";

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
          <Route
            path="/my-posts/:id"
            element={<ProtectedRoute component={MyPosts} />}
          />
          <Route
            path="/update-post/:id"
            element={<ProtectedRoute component={UpdatePost} />}
          />
          <Route
            path="/create-comment/:postId"
            element={<ProtectedRoute component={CreateComment} />}
          ></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
