import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { FaArrowLeft, FaEdit, FaTrash, FaCar, FaEnvelope, FaIdCard, FaCalendar, FaUserTag } from "react-icons/fa";

export default function Show({ auth, user }) {
  const checkUser = (user) => user.id === auth.user.id;
  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => userPermissions.includes(permission);

  useEffect(() => {
    if (checkUser(user)) {
      router.visit(route('user.profile', user));
    }
  }, [user]);

  const deleteUser = (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  if (checkUser(user)) {
    return null;
  }

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
          {hasPermissions("manage_drivers") && (
            <div className="flex gap-3">
              <Link
                href={route("user.edit", user.id)}
                className="bg-[#d48166]/10 text-[#d48166] py-2 px-4 rounded-lg shadow-sm hover:bg-[#d48166]/20 transition-all duration-200 flex items-center gap-2"
              >
                <FaEdit className="text-sm" />
                Edit User
              </Link>
              <button
                onClick={() => deleteUser(user)}
                className="bg-red-50 text-red-500 py-2 px-4 rounded-lg shadow-sm hover:bg-red-100 transition-all duration-200 flex items-center gap-2"
              >
                <FaTrash className="text-sm" />
                Delete User
              </button>
            </div>
          )}
        </div>
      }
    >
      <Head title={`User "${user.name}"`} />

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
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* User Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10 p-6">
              <h4 className="text-lg font-bold text-[#373a36] mb-4 flex items-center gap-2">
                <FaUserTag className="text-[#d48166]" />
                User Information
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created Date</label>
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

          
          </div>

          {/* Back Button */}
          <div className="flex justify-start">
            <Link
              href={route("user.index")}
              className="flex items-center gap-2 text-[#d48166] hover:text-[#d48166]/80 transition-colors"
            >
              <FaArrowLeft className="text-sm" />
              Back to User List
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}