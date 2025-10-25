import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext); // We'll use this function
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success(
          "Password reset email sent! Check your Gmail inbox 🌿"
        );
        setEmail("");
        setTimeout(() => {
          navigate("/login"); // redirect after 3 seconds
        }, 3000);
      })
      .catch((err) => {
        toast.error("Failed to send reset email. Check your email address.");
        console.error(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-base-200 to-base-300 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-base-100 w-full max-w-md p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-primary text-center mb-4">
          Reset Password 🌿
        </h1>
        <p className="text-center text-base-content/70 mb-6">
          Enter your email and we’ll send a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control flex flex-col">
            <label className="label mb-1">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="input input-bordered focus:input-primary w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-3 font-semibold hover:scale-105 transition-transform duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Remembered your password?{" "}
          <Link to="/login" className="link link-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
