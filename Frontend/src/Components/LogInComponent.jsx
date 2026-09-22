import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./LogInComponent.css";

export function LoginComponent({loginData,handleLoginData,handleLoginSubmit}) {
  const location = useLocation();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogin = async (event) => {
    setError("");
    setIsSubmitting(true);
    try {
      await handleLoginSubmit(event);
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? "Unable to log in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

   

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Enter your credentials to access your account</p>

        {location.state?.message && <p className="form-message success" role="status">{location.state.message}</p>}
        {error && <p className="form-message error" role="alert">{error}</p>}
        <form className="login-form" onSubmit={submitLogin}>
          <div className="login-inputs">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={loginData.email}
              onChange={handleLoginData}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={handleLoginData}
            />
          </div>

          <div className="login-buttons">
            <button className="btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </button>
            
            <p className="signup-prompt">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
