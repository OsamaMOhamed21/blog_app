import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { NavbarComponent } from "../Components/NavBar";

export function ProfilePage({ isLoggedIn, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = id ?? currentUser?.id;
  const isOwnProfile = Number(userId) === currentUser?.id;
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [DOB, setDOB] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;
    api.get(`/user/${userId}/profile`).then(({ data }) => {
      const user = data.data[0]; setProfile(user); setFirstName(user.fullName?.split(" ")[0] ?? "");
    }).catch((error) => setMessage(error.response?.data?.message ?? "Could not load profile."));
  }, [userId]);

  const updateProfile = async (event) => {
    event.preventDefault(); setMessage("");
    try { await api.patch(`/user/${userId}`, { firstName, DOB: DOB || null }); setMessage("Profile updated."); }
    catch (error) { setMessage(error.response?.data?.message ?? "Could not update profile."); }
  };
  const deleteProfile = async () => {
    if (!window.confirm("Delete your account permanently?")) return;
    try { await api.delete(`/user/${userId}`); navigate("/"); }
    catch (error) { setMessage(error.response?.data?.message ?? "Could not delete profile."); }
  };

  return <><NavbarComponent isLoggedIn={isLoggedIn} currentUser={currentUser} /><main className="page-container"><h1>Profile</h1>
    {message && <p className="page-message">{message}</p>}{profile && <section className="profile-card"><h2>{profile.fullName}</h2><p>{profile.u_email}</p><p>{profile.age ? `${profile.age} years old` : "Date of birth not set"}</p>
      {isOwnProfile && <form className="stack-form" onSubmit={updateProfile}><label>First name<input required value={firstName} onChange={(event) => setFirstName(event.target.value)} /></label><label>Date of birth<input type="date" value={DOB} onChange={(event) => setDOB(event.target.value)} /></label><button type="submit">Save profile</button></form>}
      {isOwnProfile && <button className="danger-button" onClick={deleteProfile}>Delete account</button>}</section>}
  </main></>;
}
