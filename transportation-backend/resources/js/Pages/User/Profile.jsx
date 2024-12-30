import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import DeleteUserForm from "../Profile/Partials/DeleteUserForm";
import { FaArrowLeft, FaEdit, FaTrash, FaEnvelope, FaIdCard, FaCalendar, FaUserTag, FaSignOutAlt } from "react-icons/fa";

export default function Profile({ auth, user }) {
  const deleteUser = () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }
    router.delete(route("profile.destroy", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#373a36] flex items-center gap-2">
            Profile Details
            <span className="text-[#d48166]">-</span>
            <span className="text-[#d48166]">{user?.name || "Unknown"}</span>
          </h2>
          
        </div>
      }
    >
      <Head title="My Profile" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Profile Overview Card */}
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden">
            <div className="p-6 flex items-center space-x-6 bg-[#e6e2dd]">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#d48166]/10 shadow-sm">
                <img
                  src={user.image_path || "/images/placeholder.png"}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-[#373a36]">
                    {user.name}
                  </h3>
                  <span className="px-3 py-1 bg-[#d48166]/10 text-[#d48166] rounded-full text-sm font-medium">
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="text-[#d48166]" />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaIdCard className="text-[#d48166]" />
                    ID: {user.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 gap-6">
            {/* User Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 p-6">
              <h4 className="text-lg font-bold text-[#373a36] mb-4 flex items-center gap-2">
                <FaUserTag className="text-[#d48166]" />
                Profile Information
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Account Created</label>
                  <p className="flex items-center gap-2 mt-1">
                    <FaCalendar className="text-[#d48166]" />
                    {new Date(user.created_at).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Assigned Roles</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((role) => (
                        <span
                          key={role}
                          className="px-3 py-1 bg-[#e6e2dd] text-[#373a36] rounded-full text-sm"
                        >
                          {role}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 flex items-center gap-2">
                        <span>⚠️</span>
                        No roles assigned
                      </span>
                    )}
                  </div>
                </div>
                
              </div>
              
            </div>
            <div className="flex gap-3">
            <Link
              href={route("profile.edit", user.id)}
              className="bg-[#e6e2dd] text-[#d48166] py-2 px-4  rounded-lg shadow-sm hover:bg-[#d48166]/20 transition-all duration-200 flex items-center gap-2"
            >
              <FaEdit className="text-sm" />
              Edit Profile
            </Link>
            <DeleteUserForm />
            
          </div>
          <div className="flex justify-between items-center">
            <div></div>
          <button
              onClick={() => router.post(route("logout"))}
              className="bg-[#373a36] text-white py-2 px-4 rounded-lg shadow-sm hover:bg-[#373a36]/90 transition-all duration-200 flex items-center gap-2"
            >
              <FaSignOutAlt className="text-sm" />
              Log Out
            </button>
          </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}