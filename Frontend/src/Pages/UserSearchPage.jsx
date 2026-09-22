import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { NavbarComponent } from "../Components/NavBar";

export function UserSearchPage({ isLoggedIn, currentUser }) {
  const [searchkey, setSearchkey] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const search = async (event) => {
    event.preventDefault(); setMessage("");
    if (!searchkey.trim()) return setUsers([]);
    try { const { data } = await api.get("/user/search", { params: { searchkey } }); setUsers(data.data); }
    catch (error) { setUsers([]); setMessage(error.response?.data?.message ?? "Could not search users."); }
  };
  return <><NavbarComponent isLoggedIn={isLoggedIn} currentUser={currentUser} />
    <main className="page-container"><h1>Find users</h1><form className="inline-form" onSubmit={search}><input value={searchkey} onChange={(event) => setSearchkey(event.target.value)} placeholder="First name" /><button type="submit">Search</button></form>
      {message && <p className="page-error">{message}</p>}<div className="data-list">{users.map((user) => <Link key={user.u_id} to={`/users/${user.u_id}/profile`} className="data-card"><strong>{user.u_firstName} {user.u_lastName}</strong><span>{user.u_email}</span></Link>)}</div>
    </main></>;
}
