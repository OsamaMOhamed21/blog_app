import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpComponent.css";

export function SignUpComponent({ handleSignupSubmit }) {
  const [signupData, setSignupData] = useState({ firstName: "", middleName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignupData((previous) => ({ ...previous, [name]: value }));
  };

  const submitSignup = async (event) => {
    setError("");
    setIsSubmitting(true);
    try {
      await handleSignupSubmit(event, signupData);
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? "Unable to create the account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <p className="signup-subtitle">Join us to start writing and sharing your blogs</p>

      {error && <p className="form-message error" role="alert">{error}</p>}
      <form className="signup-form" onSubmit={submitSignup}>
        <div className="signup-inputs">
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            name="firstName"
            type="text" 
            placeholder="John" 
            required 
            value={signupData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="middleName">Middle Name </label>
          <input 
            id="middleName" 
            name="middleName"
            type="text" 
            placeholder="Alexander" 
            value={signupData.middleName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName"
            type="text" 
            placeholder="Doe" 
            required 
            value={signupData.lastName}
            onChange={handleChange}
          />

          <label htmlFor="email">Email Address</label>
          <input 
            id="email" 
            name="email"
            type="email" 
            placeholder="name@example.com" 
            autoComplete="email" 
            required 
            value={signupData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            autoComplete="new-password" 
            required 
            minLength="8"
            value={signupData.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            id="confirmPassword" 
            name="confirmPassword"
            type="password" 
            placeholder="••••••••" 
            autoComplete="new-password" 
            required 
            minLength="8"
            value={signupData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="signup-buttons">
          <button className="btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          <p className="login-prompt">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
