import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { format } from "date-fns";

export default function Index({ auth, users, queryParams = null, success }) {
  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => {
    return userPermissions.includes(permission);
  };

  const deleteUser = (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };

  queryParams = queryParams || {};
  const searchFieldChanged = (type, value) => {
    if (value) {
      queryParams[type] = value;
    } else {
      delete queryParams[type];
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (field, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(field, e.target.value);
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
              className="bg-emerald-500 py-2 px-4 text-white rounded-lg shadow transition-all hover:bg-emerald-600 flex items-center gap-2"
            >
              <span>➕</span>
              Add User
            </Link>
          )}
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12">
        {success && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-emerald-500 py-3 px-4 text-white rounded-lg shadow flex items-center gap-2">
              <span>✓</span>
              {success}
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-lg rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Search by Name
                  </label>
                  <TextInput
                    className="w-full"
                    defaultValue={queryParams.name}
                    placeholder="Enter user name..."
                    onBlur={(e) => searchFieldChanged("name", e.target.value)}
                    onKeyPress={(e) => onKeyPress("name", e)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Filter by Role
                  </label>
                  <SelectInput
                    className="w-full"
                    defaultValue={queryParams.role}
                    onChange={(e) => searchFieldChanged("role", e.target.value)}
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="driver">Driver</option>
                  </SelectInput>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Profile Picture</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Created Date</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Assigned Roles</th>
                      {hasPermissions("manage_drivers") && (
                        <th className="px-4 py-3 text-right">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user) => (
                      <tr
                        key={user.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-4 py-3">{user.id}</td>
                        <td className="px-4 py-3">
                          <img
                            src={user.image_path || "/images/placeholder.png"}
                            alt={`${user.name}'s profile`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <Link
                            href={route("user.show", user.id)}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
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
                            <span className="text-gray-400">
                              No roles assigned
                            </span>
                          )}
                        </td>
                        {hasPermissions("manage_drivers") && (
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={route("user.edit", user.id)}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <span>✏️</span>
                                Edit
                              </Link>
                              <button
                                onClick={() => deleteUser(user)}
                                className="text-red-600 dark:text-red-400 hover:underline"
                              >
                                <span>🗑️</span>
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <Pagination links={users.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
