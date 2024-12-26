import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { format } from "date-fns";

export default function Index({ auth, users, success }) {
  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => {
    return userPermissions.includes(permission);
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Manage Users
          </h2>
          {hasPermissions("manage_drivers") && (
            <Link
              href={route("usercreate.create")}
              className="bg-emerald-500 py-2 px-4 text-white rounded-lg shadow transition hover:bg-emerald-600 flex items-center"
            >
              <span className="material-icons mr-2">add</span> Add User
            </Link>
          )}
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12">
        {success && (
          <div className="bg-emerald-500 py-2 px-4 text-white mb-4 rounded shadow">
            {success}
          </div>
        )}
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {users.data.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <h3 className="text-lg font-semibold">
                    No users found.
                  </h3>
                  <p className="text-sm">Add new users to manage your system.</p>
                </div>
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Profile Picture</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Created Date</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Roles</th>
                      {hasPermissions("manage_drivers") && (
                        <th className="px-4 py-3 text-right">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`$ hover:bg-gray-100 dark:hover:bg-gray-600 transition`}
                      >
                        <td className="px-4 py-3">{user.id}</td>
                        <td className="px-4 py-3">
                          <img
                            src={user.image_path || "/images/placeholder.png"}
                            alt={`${user.name}'s profile`}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-3 text-blue-600 dark:text-blue-400 hover:underline">
                          <Link href={route("user.show", user.id)}>
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">
                          {format(new Date(user.created_at), "dd MMM yyyy")}
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {user.roles.length > 0 ? (
                            user.roles.join(", ")
                          ) : (
                            <span className="text-gray-400">No roles assigned</span>
                          )}
                        </td>
                        {hasPermissions("manage_drivers") && (
                          <td className="px-4 py-3 text-right">
                            <Link
                              href={route("user.edit", user.id)}
                              className="text-blue-500 hover:underline flex items-center"
                            >
                              <span className="material-icons mr-1">edit</span> Change Role
                            </Link>
                            <button
                              onClick={() => deleteUser(user)}
                              className="text-red-500 hover:underline flex items-center mt-2"
                            >
                              <span className="material-icons mr-1">delete</span> Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
