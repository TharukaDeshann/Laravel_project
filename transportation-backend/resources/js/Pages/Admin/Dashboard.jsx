import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { 
    VEHICLE_STATUS_CLASS_MAP, 
    VEHICLE_STATUS_TEXT_MAP,
   } from "@/constants.jsx";
export default function Dashboard({ auth, users, vehicles }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Admin Dashboard
        </h2>
      }
    >
      <Head title="Admin Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Summary Cards */}
            <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Drivers
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Total Drivers: <span className="font-bold">{users.length}</span>
              </p>
              <a
                href={route("user.index")}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Manage Drivers
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Vehicles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Total Vehicles:{" "}
                <span className="font-bold">{vehicles.length}</span>
              </p>
              <a
                href={route("vehicle.index")}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Manage Vehicles
              </a>
            </div>
          </div>

          {/* Users Table */}
          <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Latest Drivers
            </h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Role
                  </th>
                  
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {users.slice(0, 5).map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a
                        href={route("user.show", user.id)}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vehicles Table */}
          <div className="mt-6 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Latest Vehicles
            </h3>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {vehicles.slice(0, 5).map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {vehicle.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {vehicle.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              VEHICLE_STATUS_CLASS_MAP[vehicle.status]
                            }
                          >
                            {VEHICLE_STATUS_TEXT_MAP[vehicle.status]}
                          </span>
                        </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <a
                        href={route("vehicle.show", vehicle.id)}
                        className="text-blue-600 dark:text-blue-400 hover:underline "
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
