import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ auth, assignedVehicles }) {
  
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          User Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Welcome, {auth.user.name}!
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Here is a summary of your assigned details:
              </p>

              {/* Assigned Vehicles Section */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Assigned Vehicles
                </h4>
                {assignedVehicles.length > 0 ? (
                  <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {assignedVehicles.map((vehicle) => (
                      <div
                        key={vehicle.id}
                        className="p-4 bg-gray-100 dark:bg-gray-700 rounded shadow"
                      >
                        <h5 className="font-bold text-gray-800 dark:text-gray-200">
                          {vehicle.model}
                        </h5>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Type: {vehicle.type}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Capacity: {vehicle.capacity}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Status:{" "}
                          <span
                            className={
                              "px-2 py-1 text-white rounded " +
                              (vehicle.status === "active"
                                ? "bg-emerald-500"
                                : "bg-red-500")
                            }
                          >
                            {vehicle.status}
                          </span>
                        </p>
                        <Link
                          href={route("vehicle.show", vehicle.id)}
                          className="inline-block mt-4 text-sm text-indigo-500 hover:underline"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    No vehicles assigned yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
