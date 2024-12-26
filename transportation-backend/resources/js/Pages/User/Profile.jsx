import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import DeleteUserForm from "../Profile/Partials/DeleteUserForm";

export default function Show({ auth, user }) {
  
  const flag = () => {
    return user.id === auth.user.id
  }

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
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          User Details - {user?.name || "Unknown"}
        </h2>
      }
    >
      <Head title={`User "${user.name}"`} />

      <div className="py-12">
        <div className="mx-auto max-w-5xl sm:px-6 lg:px-8">
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="flex items-center p-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                  src={user.image_path || "https://via.placeholder.com/80"}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Personal Details
                </h4>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">
                    <span className="font-bold">User ID:</span> {user.id}
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    <span className="font-bold">Created Date:</span>{" "}
                    {new Date(user.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Role and Actions
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  <span className="font-bold">Role:</span> {user.role}
                </p>
                { flag()  && <div className="mt-4 flex space-x-4">
                  <Link
                    href={route("profile.edit", user.id)}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg text- hover:bg-blue-500"
                  >
                    Edit
                  </Link>
                  <DeleteUserForm className="max-w-xl" />
                </div>}
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="mt-6 flex justify-between items-center">
            <Link
              href={route("user.index")}
              className="text-blue-600 hover:underline"
            >
              Back to User List
            </Link>
            { flag() &&<button
              onClick={() => router.post(route("logout"))}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Log Out
            </button>}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
