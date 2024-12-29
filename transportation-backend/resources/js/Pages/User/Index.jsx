import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { format } from "date-fns";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

// Stats Component for User Overview
const UserStats = ({ users }) => {
  const stats = {
    total: users.data.length,
    admins: users.data.filter(u => u.role === 'admin').length,
    drivers: users.data.filter(u => u.role === 'driver').length,
    unassignedRoles: users.data.filter(u => u.roles.length === 0).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-[#e6e2dd] rounded-lg hover:shadow-lg transition-all p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#d48166]/10 rounded-full flex items-center justify-center mr-3">
            <span className="text-[#d48166]">👥</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Total Users</p>
            <p className="text-2xl font-bold text-[#d48166]">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#e6e2dd] rounded-lg hover:shadow-lg transition-all p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-green-500">👨‍💼</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Admins</p>
            <p className="text-2xl font-bold text-green-500">{stats.admins}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#e6e2dd] rounded-lg p-4 hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-500">🚗</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Drivers</p>
            <p className="text-2xl font-bold text-blue-500">{stats.drivers}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#e6e2dd] rounded-lg p-4 hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-yellow-500">⚠</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">No Roles</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.unassignedRoles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Index({ auth, users, queryParams = null, success }) {
  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => userPermissions.includes(permission);

  const deleteUser = (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}? This action cannot be undone.`)) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };
  
  const checkUser = (user) => user.id === auth.user.id;

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
          <h2 className="text-2xl font-bold text-[#373a36]">
            User Management
          </h2>
          {hasPermissions("manage_drivers") && (
            <Link
              href={route("usercreate.create")}
              className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Add New User
            </Link>
          )}
        </div>
      }
    >
      <Head title="Users" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <UserStats users={users} />

          {/* Success Message */}
          {success && (
            <div className="bg-green-500 py-3 px-4 text-white rounded-lg shadow-sm flex items-center gap-2">
              <span>✓</span>
              {success}
            </div>
          )}
        
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
            {/* Search and Filter Section */}
            <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-[#373a36] mb-2">
                    <FaSearch className="inline-block mr-2 text-[#d48166]" />
                    Search by Name
                  </label>
                  <TextInput
                    className="w-full pl-10 border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    defaultValue={queryParams.name}
                    placeholder="Enter user name..."
                    onBlur={e => searchFieldChanged('name', e.target.value)}
                    onKeyPress={e => onKeyPress('name', e)}
                  />
                </div>

                {hasPermissions("manage_drivers") && (<div>
                  <label className="block text-sm font-medium text-[#373a36] mb-2">
                    <FaFilter className="inline-block mr-2 text-[#d48166]" />
                    Filter by Role
                  </label>
                  <SelectInput 
                    className="w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    defaultValue={queryParams.role}
                    onChange={e => searchFieldChanged("role", e.target.value)}
                  >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="driver">Driver</option>
                  </SelectInput>
                </div>)}

                
              </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-[#373a36]">
                <thead className="text-xs uppercase bg-[#e6e2dd]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-left">ID</th>
                    <th className="px-4 py-3 font-semibold text-left">Profile Picture</th>
                    <th className="px-4 py-3 font-semibold text-left">Name</th>
                    <th className="px-4 py-3 font-semibold text-left">Email</th>
                    <th className="px-4 py-3 font-semibold text-left">Created Date</th>
                    {hasPermissions("manage_drivers") && 
                    (<th className="px-4 py-3 font-semibold text-left">Assigned Roles</th>
                    )}
                    {hasPermissions("manage_drivers") && (
                      <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users.data.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#d48166]/10 hover:bg-[#e6e2dd]/20 transition-colors"
                    >
                      <td className="px-4 py-3">{user.id}</td>
                      <td className="px-4 py-3">
                        <img
                          src={user.image_path || "/images/placeholder.png"}
                          alt={`${user.name}'s profile`}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <Link
                          href={route("user.show", user.id)}
                          className="text-[#d48166] hover:underline flex items-center gap-2"
                        >
                          {user.name}
                          <span className="text-xs bg-[#d48166]/10 px-2 py-1 rounded">
                            View Details
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3">{user.email}</td>
                      
                      <td className="px-4 py-3">
                        {format(new Date(user.created_at), "dd MMM yyyy")}
                      </td>
                      {hasPermissions("manage_drivers") && (<td className="px-4 py-3">
                        {user.roles.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role}
                                className="px-3 py-1 bg-[#d48166]/10 text-[#d48166] rounded-full text-sm font-medium"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 flex items-center gap-2">
                            <span>⚠️</span>
                            No roles
                          </span>
                        )}
                      </td>)}
                     
                      {hasPermissions("manage_drivers") && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link
                              href={route("user.edit", user.id)}
                              className="text-[#d48166] hover:text-[#d48166]/80 transition-colors bg-[#d48166]/10 p-2 rounded"
                              title="Edit"
                            >
                              <FaEdit className="text-lg" />
                            </Link>
                            <button
                              onClick={() => deleteUser(user)}
                              className="text-red-500 hover:text-red-600 transition-colors bg-red-50 p-2 rounded"
                              title="Delete"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="p-4 border-t border-[#d48166]/10 bg-[#e6e2dd]">
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}