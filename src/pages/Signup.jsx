import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const { createUser, updateUser, signInWithGoogle, setUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoURL = form.photoURL.value.trim();

    // Name validation
    if (name.length < 5) {
      setNameError("Name must be at least 5 characters long.");
      toast.error("Name must be at least 5 characters long.");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters and include both uppercase and lowercase letters."
      );
      toast.error("Invalid password format.");
      return;
    } else {
      setPasswordError("");
    }

    // Create user
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL });
            toast.success(`Welcome to GreenLife, ${name}! 🌿`);
            navigate("/");
          })
          .catch(() => {
            setUser(user);
            toast.success("Account created successfully! 🎉");
            navigate("/");
          });
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Registration failed. Please try again.");
      });
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        toast.success(`Welcome to GreenLife, ${result.user.displayName}! 🌿`);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Google sign-up failed. Please try again.");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-base-200 to-base-300 py-10">
      <title>Sign Up</title>
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-3xl font-bold text-center text-primary mb-2">
            Join GreenLife 🌱
          </h1>
          <p className="text-center text-base-content/70 mb-6">
            Create your account and start growing
          </p>

          {/* Full Name */}
          <div className="form-control flex flex-col mb-3">
            <label className="label mb-1">
              <span className="label-text font-semibold">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className="input input-bordered focus:input-primary w-full"
              required
            />
            {nameError && (
              <span className="text-error text-sm mt-1">{nameError}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-control flex flex-col mb-3">
            <label className="label mb-1">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              className="input input-bordered focus:input-primary w-full"
              required
            />
          </div>

          {/* Photo URL */}
          <div className="form-control flex flex-col mb-3">
            <label className="label mb-1">
              <span className="label-text font-semibold">Photo URL (optional)</span>
            </label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/your-photo.jpg"
              className="input input-bordered focus:input-primary w-full"
            />
          </div>

          {/* Password */}
          <div className="form-control flex flex-col mb-3">
            <label className="label mb-1">
              <span className="label-text font-semibold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered focus:input-primary w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && (
              <span className="text-error text-sm mt-1">{passwordError}</span>
            )}
            {!passwordError && (
              <span className="text-base-content/60 text-sm mt-1">
                Must be at least 6 characters, include uppercase & lowercase
              </span>
            )}
          </div>

          {/* Other errors */}
          {error && (
            <div className="alert alert-error shadow-lg mb-3">
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full mt-2">
            Create Account
          </button>

          <div className="divider text-sm text-base-content/60">OR</div>

          {/* Google Signup */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="btn btn-outline w-full gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign up with Google
          </button>

          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
