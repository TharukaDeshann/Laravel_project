import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { 
  VEHICLE_STATUS_CLASS_MAP, 
  VEHICLE_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Index({ auth, vehicles, queryParams = null, success }) {
  const userPermissions = auth?.user?.permissions || [];
  const hasPermissions = (permission) => {
    return userPermissions.includes(permission);
  };

  const deleteVehicle = (vehicle) => {
    if(!window.confirm(`Are you sure you want to delete ${vehicle.model}? This action cannot be undone.`)){
      return;
    }
    router.delete(route("vehicle.destroy", vehicle.id));
  };

  queryParams = queryParams || {};
  const searchFieldChanged = (type, value) => {
    if(value){
      queryParams[type] = value;
    }else{
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
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Vehicle Management
          </h2>
          {hasPermissions('manage_vehicles') && (
            <Link
              href={route("vehiclecreate.create")}
              className="bg-emerald-500 py-2 px-4 text-white rounded-lg shadow transition-all hover:bg-emerald-600 flex items-center gap-2"
            >
              <span>➕</span>
              Add New Vehicle
            </Link>
          )}
        </div>
      }
    >
      <Head title="Vehicles" />
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
                  <label className="block text-sm font-medium mb-2">Search by Model</label>
                  <TextInput
                    className="w-full"
                    defaultValue={queryParams.model}
                    placeholder="Enter vehicle model..."
                    onBlur={e => searchFieldChanged('model', e.target.value)}
                    onKeyPress={e => onKeyPress('model', e)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Filter by Type</label>
                  <SelectInput 
                    className="w-full"
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
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Image</th>
                      <th className="px-4 py-3">Model</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Capacity</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Created By</th>
                      <th className="px-4 py-3">Updated By</th>
                      <th className="px-4 py-3">Assigned To</th>
                      {hasPermissions('manage_vehicles') && (
                        <th className="px-4 py-3 text-right">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.data.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-4 py-3">{vehicle.id}</td>
                        <td className="px-4 py-3">
                          <img 
                            src={vehicle.image_path} 
                            alt={vehicle.model}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium">
                          <Link 
                            href={route("vehicle.show", vehicle.id)}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {vehicle.model}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${VEHICLE_STATUS_CLASS_MAP[vehicle.status]}`}>
                            {VEHICLE_STATUS_TEXT_MAP[vehicle.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3">{vehicle.capacity}</td>
                        <td className="px-4 py-3">{vehicle.type}</td>
                        <td className="px-4 py-3">{vehicle.createdBy.name}</td>
                        <td className="px-4 py-3">{vehicle.updatedBy.name}</td>
                        <td className="px-4 py-3">
                          {vehicle?.assignedUser ? (
                            <Link
                              href={route("user.show", vehicle.assignedUser.id)}
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              {vehicle.assignedUser.name}
                            </Link>
                          ) : (
                            <span className="text-gray-400">Unassigned</span>
                          )}
                        </td>
                        {hasPermissions('manage_vehicles') && (
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={route("vehicle.edit", vehicle.id)}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <span>✏️</span>
                                Edit
                              </Link>
                              <button
                                onClick={() => deleteVehicle(vehicle)}
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
                <Pagination links={vehicles.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}