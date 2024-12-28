import { VEHICLE_STATUS_CLASS_MAP, VEHICLE_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, vehicle }) {
  
  const userRoles = auth.user.roles;
  const hasRoles = (role) => userRoles.includes(role);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#373a36]">
            Vehicle Details: {vehicle?.model || 'Unknown Model'}
          </h2>
          <Link
            href={route("vehicle.index")}
            className="px-4 py-2 bg-[#d48166] text-white rounded-md hover:bg-[#d48166]/90 transition-colors"
          >
            Back to Vehicles
          </Link>
        </div>
      }
    >
      <Head title={`Vehicle "${vehicle.model}"`} />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            {/* Image Section */}
            <div className="relative h-64 bg-[#e6e2dd]">
              <img
                src={vehicle.image_path}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-white ${VEHICLE_STATUS_CLASS_MAP[vehicle.status]}`}>
                {VEHICLE_STATUS_TEXT_MAP[vehicle.status]}
              </span>
            </div>

            {/* Details Section */}
            <div className="p-6">
              {/* Main Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Vehicle ID</label>
                    <p className="text-lg font-semibold text-[#373a36]">{vehicle.id}</p>
                  </div>

                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Vehicle Model</label>
                    <p className="text-lg font-semibold text-[#373a36]">{vehicle.model}</p>
                  </div>

                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Created By</label>
                    <p className="text-lg font-semibold text-[#373a36]">{vehicle.createdBy.name}</p>
                  </div>

                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Create Date</label>
                    <p className="text-lg font-semibold text-[#373a36]">
                      {new Date(vehicle.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Capacity</label>
                    <p className="text-lg font-semibold text-[#373a36]">{vehicle.capacity} passengers</p>
                  </div>

                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Type</label>
                    <p className="text-lg font-semibold text-[#373a36]">{vehicle.type}</p>
                  </div>

                  <div className="bg-[#e6e2dd]/30 p-4 rounded-lg">
                    <label className="text-sm text-[#373a36]/70">Assigned User</label>
                    <p className="text-lg font-semibold text-[#373a36]">
                      {vehicle?.assignedUser?.name ?? "Not Assigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mt-6 bg-[#e6e2dd]/30 p-4 rounded-lg">
                <label className="text-sm text-[#373a36]/70">Vehicle Description</label>
                <p className="mt-2 text-[#373a36] whitespace-pre-wrap">
                  {vehicle.description || "No description provided"}
                </p>
              </div>

              {/* Action Buttons */}
              {hasRoles('admin') && <div className="mt-6 flex gap-4">
                <Link
                  href={route("vehicle.edit", vehicle.id)}
                  className="px-4 py-2 bg-[#d48166] text-white rounded-md hover:bg-[#d48166]/90 transition-colors"
                >
                  Edit Vehicle
                </Link>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}