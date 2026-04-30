import { StoreContext } from "@/context/storeContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const { updateUserProfile, user } = useContext(StoreContext);
  const [loader, setLoader] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profile: user?.profile?.url || "",
  });

  const [preview, setPreview] = useState(user?.profile?.url || "");
  const accessToken = localStorage.getItem("accessToken");

  //  IMAGE CHANGE FIXED
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profile: file, //
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoader(true);
      if (
        user?.username === profileData.username &&
        user?.profile?.url === profileData.profile
      ) {
        toast.error("Please update at least one field");
        return;
      }

      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("email", profileData.email);
      formData.append("image", profileData.profile);

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/user/profile-update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setEditMode(false);
        updateUserProfile(res.data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 ">
      {/* IMAGE MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-3 right-5 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-xl hover:bg-red-500 hover:text-white"
            >
              ✖
            </button>

            {/* IMAGE */}
            <img
              src={preview}
              className="max-w-[90vw] max-h-[90vh] rounded-lg"
              alt="preview"
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={preview || "https://via.placeholder.com/150"}
              alt="profile"
              onClick={() => setPreviewOpen(true)}
              className="w-28 h-28 rounded-full object-cover border-4 border-orange-400 cursor-pointer"
            />

            {editMode && (
              <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer text-xs">
                ✎
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 p-2 border rounded-lg ${
              editMode ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* EMAIL */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            disabled
            className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="w-full bg-green-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                disabled={loader}
              >
                {loader ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    updating...
                  </>
                ) : (
                  "Save"
                )}
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="w-full bg-gray-400 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
