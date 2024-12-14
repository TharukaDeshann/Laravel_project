import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { 
  VEHICLE_STATUS_CLASS_MAP, 
  VEHICLE_STATUS_TEXT_MAP,
 } from "@/constants.jsx";
export default function Index({ auth, vehicles,queryParams = null, success }) {
  
   const deleteVehicle = (vehicle) => {
    if(!window.confirm("Are you sure you want to delete the vehicle?")){
        return;
    }
    router.delete(route("vehicle.destroy", vehicle.id));
   }
    queryParams = queryParams || {}
    const searchFieldChanged = (type, value) => {
        if(value){
          queryParams[type] = value
        }else{
          delete queryParams[type]
        }

        router.get(route('vehicle.index'), queryParams);
    };

    const onKeyPress = (model , e) => {
      if(e.key !== 'Enter') return;
      searchFieldChanged(model, e.target.value)
    }
  
    return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Vehicles
          </h2>
          <Link
            href={route("vehicle.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Vehicles" />

      <div className="py-12">
        {success && (
          <div className="bg-emerald-500 py-2 px-4 text-white mb-4 rounded">
            {success}
          </div>
        )}
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 
                                dark:bg-gray-700 dark:text-gray-400 
                                border-b-2 border-gray-500"
                >
                  <tr className="text-nowrap">
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                    <TextInput className="w-full"
                        defaultValue={queryParams.model}
                        placeholder="Vehicle Model"
                        onBlur={e => searchFieldChanged('model'
                          , e.target.value
                        )}
                        onKeyPress={e => onKeyPress('model', e)}
                        />
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                        <SelectInput className="w-full" 
                        defaultValue={queryParams.type}
                        onChange={e => searchFieldChanged("type", e.target.value)}
                        >
                          <option value="">Select Type</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Suv">Suv</option>
                          <option value="Truck">Truck</option>
                          <option value="Bike">Bike</option>
                          <option value="Other">Other</option>
                        </SelectInput>
                    </th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>

                <thead
                  className="text-xs text-gray-700 uppercase bg-gray-50 
                                dark:bg-gray-700 dark:text-gray-400 
                                border-b-2 border-gray-500"
                >
                  <tr className="text-nowrap">
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">IMAGE</th>
                    <th className="px-3 py-3">MODEL</th>
                    <th className="px-3 py-3">STATUS</th>
                    <th className="px-3 py-3">CAPACITY</th>
                    <th className="px-3 py-3">TYPE</th>
                    <th className="px-3 py-3">CREATED BY</th>
                    <th className="px-3 py-3">UPDATED BY</th>
                    <th className="px-3 py-3 text-right">ACTIONS</th>
                  </tr>
                </thead>




                <tbody>
                  {vehicles.data.map((vehicle) => (
                    <tr
                      className="bg-white border-b
                                     dark:bg-gray-800 dark:border-gray-700"
                      key={vehicle.id}
                    >
                      <td className="px-3 py-2">{vehicle.id}</td>
                      <td className="px-3 py-2">
                        <img src={vehicle.image_path} style={{ width: 60 }} />
                      </td>

                      <th className="px-3 py-2 text-white text-nowrap hover:underline">
                        <Link href={route("vehicle.show", vehicle.id)}>{vehicle.model}</Link>


                      </th>
                      
                      
                      <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white " +
                              VEHICLE_STATUS_CLASS_MAP[vehicle.status]
                            }
                          >
                            {VEHICLE_STATUS_TEXT_MAP[vehicle.status]}
                          </span>
                        </td>


                      <td className="px-3 py-2">{vehicle.capacity}</td>
                      <td className="px-3 py-2 text-nowrap">{vehicle.type}</td>

                      <td className="px-3 py-2 text-nowrap">
                        {vehicle.createdBy.name}
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        {vehicle.updatedBy.name}
                      </td>
                      <td className="px-3 py-2 text-nowrap">
                        <Link
                          href={route("vehicle.edit", vehicle.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={(e) => deleteVehicle(vehicle)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination links={vehicles.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
