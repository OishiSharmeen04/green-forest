import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import avatar from "../assets/profile.jpg"


const Profile = () => {
  const { user, updateUser, logOut } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ displayName: name, photoURL: photo });
      setMessage("✅ Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ Failed to update profile!");
      console.error(error);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-base-200 to-base-300 py-10 px-4">
      <title>Profile</title>
      <div className="card bg-base-100 shadow-2xl w-full max-w-2xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2">My Profile 🌿</h2>
            <p className="text-base-content/70">Manage your account information</p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                <img
                  src={user?.photoURL || avatar }
                  alt={user?.displayName || "User"}
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold mt-4 text-primary">
              {user?.displayName || "No Name"}
            </h3>
            <p className="text-sm text-base-content/60 mt-1">{user?.email}</p>
            <div className="badge badge-success gap-2 mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Verified Account
            </div>
          </div>

          {/* Edit Toggle */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-sm btn-ghost gap-2"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          {/* Update Form */}
          {isEditing && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control flex flex-col">
                <label className="label mb-1">
                  <span className="label-text font-semibold">Display Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-control flex flex-col">
                <label className="label mb-1">
                  <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered focus:input-primary"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  placeholder="Enter photo URL"
                />
              </div>

              {message && (
                <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-error"}`}>
                  <span>{message}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </form>
          )}

          {/* Logout Button */}
          <button
            onClick={logOut}
            className="btn btn-error btn-outline w-full mt-6 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
