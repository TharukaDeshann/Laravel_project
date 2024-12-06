import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head , Link} from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
export default function Index({auth, vehicles}) {
    

    return(
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 
                                dark:bg-gray-700 dark:text-gray-400 
                                border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Model</th>
                                        <th className="px-3 py-3">Capacity</th>
                                        <th className="px-3 py-3">Type</th>
                                        <th className="px-3 py-3">Owner</th>
                                        <th className="px-3 py-3">Created By</th>
                                        <th className="px-3 py-3">Updated BY</th>
                                        <th className="px-3 py-3 text-right">Actions</th>
                                        

                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.data.map( (vehicle) => (
                                    <tr className="bg-white border-b
                                     dark:bg-gray-800 dark:border-gray-700" key={vehicle.id}>
                                        <td className="px-3 py-2">{vehicle.id}</td>
                                        <td className="px-3 py-2">
                                            <img src={vehicle.image_path} style = {{width:60}} />
                                        </td>
                                        <td className="px-3 py-2 text-nowrap">{vehicle.model}</td>
                                        <td className="px-3 py-2">{vehicle.capacity}</td>
                                        <td className="px-3 py-2">{vehicle.type}</td>
                                    
                                        <td className="px-3 py-2 text-nowrap">{vehicle.owner.name }</td>
                                        <td className="px-3 py-2 text-nowrap">{vehicle.createdBy.name}</td>
                                        <td className="px-3 py-2 text-nowrap">{vehicle.updatedBy.name}</td>
                                        <td className="px-3 py-2">
                                            <Link href={route('vehicle.edit', vehicle.id )} 
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                Edit

                                            </Link>

                                            <Link href={route('vehicle.destroy', vehicle.id )} 
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                                                Delete
                                                
                                            </Link>
                                        </td>
                                    </tr>
                                    ))}
                                    
                                </tbody>
                            </table>
                               <Pagination links={vehicles.meta.links}/>    

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}