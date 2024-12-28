import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { VEHICLE_STATUS_CLASS_MAP, VEHICLE_STATUS_TEXT_MAP } from "@/constants.jsx";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

// Stats Component for Vehicle Overview
const VehicleStats = ({ vehicles }) => {
  const stats = {
    total: vehicles.data.length,
    active: vehicles.data.filter(v => v.status === 'Active').length,
    inactive: vehicles.data.filter(v => v.status === 'Inactive').length,
    unassigned: vehicles.data.filter(v => !v.assignedUser).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <span className="text-primary">🚗</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Total Vehicles</p>
            <p className="text-2xl font-bold text-primary">{stats.total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-green-500">✓</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Active Vehicles</p>
            <p className="text-2xl font-bold text-green-500">{stats.active}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-yellow-500">⚠</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Inactive</p>
            <p className="text-2xl font-bold text-yellow-500">{stats.inactive}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-500">👤</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Unassigned</p>
            <p className="text-2xl font-bold text-blue-500">{stats.unassigned}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Index({ auth, vehicles, queryParams = null, success }) {
  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => userPermissions.includes(permission);

  const deleteVehicle = (vehicle) => {
    if(!window.confirm(`Are you sure you want to delete ${vehicle.model}? This action cannot be undone.`)) {
      return;
    }
    router.delete(route("vehicle.destroy", vehicle.id));
  };

  queryParams = queryParams || {};
  const searchFieldChanged = (type, value) => {
    if(value) {
      queryParams[type] = value;
    } else {
      delete queryParams[type];
    }
    router.get(route('vehicle.index'), queryParams);
  };

  const onKeyPress = (model, e) => {
    if(e.key !== 'Enter') return;
    searchFieldChanged(model, e.target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#373a36]">
            Vehicle Management
          </h2>
          {hasPermissions('manage_vehicles') && (
            <Link
              href={route("vehiclecreate.create")}
              className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Add New Vehicle
            </Link>
          )}
        </div>
      }
    >
      <Head title="Vehicles" />
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          <VehicleStats vehicles={vehicles} />

          {/* Success Message */}
          {success && (
            <div className="bg-green-500 py-3 px-4 text-white rounded-lg shadow-sm flex items-center gap-2">
              <span>✓</span>
              {success}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
            {/* Enhanced Search and Filter Section */}
            <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-[#373a36] mb-2">
                    <FaSearch className="inline-block mr-2 text-[#d48166]" />
                    Search by Model
                  </label>
                  <TextInput
                    className="w-full pl-10 border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    defaultValue={queryParams.model}
                    placeholder="Enter vehicle model..."
                    onBlur={e => searchFieldChanged('model', e.target.value)}
                    onKeyPress={e => onKeyPress('model', e)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#373a36] mb-2">
                    <FaFilter className="inline-block mr-2 text-[#d48166]" />
                    Filter by Type
                  </label>
                  <SelectInput 
                    className="w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    defaultValue={queryParams.type}
                    onChange={e => searchFieldChanged("type", e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Suv">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Bike">Bike</option>
                    <option value="Other">Other</option>
                  </SelectInput>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#373a36] mb-2">
                    <FaFilter className="inline-block mr-2 text-[#d48166]" />
                    Filter by Status
                  </label>
                  <SelectInput 
                    className="w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    defaultValue={queryParams.status}
                    onChange={e => searchFieldChanged("status", e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    {/* <option value="maintenance">In Maintenance</option> */}
                    <option value="Inactive">Inactive</option>
                  </SelectInput>
                </div>
              </div>
            </div>

            {/* Enhanced Table Section */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-[#373a36]">
                <thead className="text-xs uppercase bg-[#e6e2dd]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-left">ID</th>
                    <th className="px-4 py-3 font-semibold text-left">Image</th>
                    <th className="px-4 py-3 font-semibold text-left">Model</th>
                    <th className="px-4 py-3 font-semibold text-left">Status</th>
                    <th className="px-4 py-3 font-semibold text-left">Capacity</th>
                    <th className="px-4 py-3 font-semibold text-left">Type</th>
                    <th className="px-4 py-3 font-semibold text-left">Created By</th>
                    <th className="px-4 py-3 font-semibold text-left">Updated By</th>
                    <th className="px-4 py-3 font-semibold text-left">Assigned To</th>
                    {hasPermissions('manage_vehicles') && (
                      <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {vehicles.data.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b border-[#d48166]/10 hover:bg-[#e6e2dd]/20 transition-colors"
                    >
                      <td className="px-4 py-3">{vehicle.id}</td>
                      <td className="px-4 py-3">
                        <img 
                          src={vehicle.image_path}
                          alt={vehicle.model}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <Link 
                          href={route("vehicle.show", vehicle.id)}
                          className="text-[#d48166] hover:underline flex items-center gap-2"
                        >
                          {vehicle.model}
                          <span className="text-xs bg-[#d48166]/10 px-2 py-1 rounded">
                            View Details
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 text-white rounded-full text-sm font-medium ${VEHICLE_STATUS_CLASS_MAP[vehicle.status]}`}>
                          {VEHICLE_STATUS_TEXT_MAP[vehicle.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>👥</span>
                          {vehicle.capacity}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>🚘</span>
                          {vehicle.type}
                        </div>
                      </td>
                      <td className="px-4 py-3">{vehicle.createdBy.name}</td>
                      <td className="px-4 py-3">{vehicle.updatedBy.name}</td>
                      <td className="px-4 py-3">
                        {vehicle?.assignedUser ? (
                          <div className="flex items-center gap-2">
                            <span>👤</span>
                            <Link
                              href={route("user.show", vehicle.assignedUser.id)}
                              className="text-[#d48166] hover:underline"
                            >
                              {vehicle.assignedUser.name}
                            </Link>
                          </div>
                        ) : (
                          <span className="text-gray-400 flex items-center gap-2">
                            <span>⚠️</span>
                            Unassigned
                          </span>
                        )}
                      </td>
                      {hasPermissions('manage_vehicles') && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link
                              href={route("vehicle.edit", vehicle.id)}
                              className="text-[#d48166] hover:text-[#d48166]/80 transition-colors bg-[#d48166]/10 p-2 rounded"
                              title="Edit"
                            >
                              <FaEdit className="text-lg" />
                            </Link>
                            <button
                              onClick={() => deleteVehicle(vehicle)}
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
              <Pagination links={vehicles.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}