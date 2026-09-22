import { Route, Routes, useNavigate } from "react-router-dom";
import { SignUpComponent } from "./Components/SignUpComponent";
import { LoginComponent } from "./Components/LogInComponent";
import { HomePage } from "./Pages/HomePage";
import { useState } from "react";
import { ProfilePage } from "./Pages/ProfilePage";
import { ExplorePage } from "./Pages/ExplorePage";
import { api } from "./api";
import { UsersPage } from "./Pages/UsersPage";
import { UserSearchPage } from "./Pages/UserSearchPage";
import { CreateBlogPage } from "./Pages/CreateBlogPage";

function App() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  function handleLoginData(event) {
    const { name, value } = event.target;
    setLoginData((previous) => ({ ...previous, [name]: value }));
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const response = await api.post("/auth/login", loginData);
    setIsLoggedIn(true);
    setCurrentUser(response.data.user);
    setLoginData({ email: "", password: "" });
    navigate("/");
    return response.data;
  };

  const handleSignupSubmit = async (event, signupData) => {
    event.preventDefault();
    const response = await api.post("/auth/signup", signupData);
    navigate("/login", { state: { message: "Account created. You can now log in." } });
    return response.data;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/signup" element={<SignUpComponent handleSignupSubmit={handleSignupSubmit} />} />
      <Route path="/login" element={<LoginComponent loginData={loginData} handleLoginData={handleLoginData} handleLoginSubmit={handleLoginSubmit} />} />
      <Route path="/profile" element={<ProfilePage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/users" element={<UsersPage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/users/search" element={<UserSearchPage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/users/:id/profile" element={<ProfilePage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/blogs" element={<ExplorePage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
      <Route path="/blogs/new" element={<CreateBlogPage isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
    </Routes>
  );
}

export default App;
