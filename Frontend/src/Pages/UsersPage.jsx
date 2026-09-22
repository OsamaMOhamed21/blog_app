import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { NavbarComponent } from "../Components/NavBar";

export function UsersPage({ isLoggedIn, currentUser }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/user").then(({ data }) => setUsers(data.data)).catch(() => setError("Could not load users."));
  }, []);

  return <><NavbarComponent isLoggedIn={isLoggedIn} currentUser={currentUser} />
    <main className="page-container"><h1>Users</h1>{error && <p className="page-error">{error}</p>}
      <div className="data-list">{users.map((user) => <Link key={user.u_id} to={`/users/${user.u_id}/profile`} className="data-card"><strong>{user.u_firstName} {user.u_lastName}</strong><span>{user.u_email}</span></Link>)}</div>
    </main></>;
}
