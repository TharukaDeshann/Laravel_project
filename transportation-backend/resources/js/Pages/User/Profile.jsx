import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import DeleteUserForm from "../Profile/Partials/DeleteUserForm";
import { FaArrowLeft, FaEdit, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Show({ auth, user }) {
  const flag = () => {
    return user.id === auth.user.id;
  };

  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => {
    return userPermissions.includes(permission);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
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
            User Details
            <span className="text-[#d48166]">-</span>
            <span className="text-[#d48166]">{user?.name || "Unknown"}</span>
          </h2>
          <Link
            href={route("user.index")}
            className="text-[#d48166] hover:text-[#d48166]/80 transition-all duration-200 flex items-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            Back to Users
          </Link>
        </div>
      }
    >
      <Head title={`User "${user.name}"`} />

      <div className="py-6">
        <div className="mx-auto max-w-5xl">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 overflow-hidden mb-6">
            <div className="flex items-center p-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-[#e6e2dd] shadow-sm">
                {user.image_path ? (
                  <img
                    src={user.image_path}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#e6e2dd] text-[#373a36]">
                    <FaUser size={40} />
                  </div>
                )}
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-[#373a36]">
                  {user.name}
                </h3>
                <p className="text-[#373a36]/70">
                  {user.email}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-[#d48166]/10 text-[#d48166] rounded-full text-sm font-medium">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-[#373a36] mb-4">
                  Personal Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-[#373a36] w-32">User ID:</span>
                    <span className="text-[#373a36]/70">{user.id}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-[#373a36] w-32">Created Date:</span>
                    <span className="text-[#373a36]/70">
                      {new Date(user.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#373a36] mb-4">
                  Role and Permissions
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="font-medium text-[#373a36] w-32">Role:</span>
                    <span className="text-[#373a36]/70">{user.role}</span>
                  </div>
                  {flag() && (
                    <div className="mt-6 flex gap-4">
                      <Link
                        href={route("profile.edit", user.id)}
                        className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                      >
                        <FaEdit className="text-sm" />
                        Edit Profile
                      </Link>
                      <DeleteUserForm className="max-w-xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {flag() && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => router.post(route("logout"))}
                className="bg-[#373a36] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#373a36]/90 transition-all duration-200 flex items-center gap-2"
              >
                <FaSignOutAlt className="text-sm" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}