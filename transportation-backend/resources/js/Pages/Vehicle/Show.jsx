import { VEHICLE_STATUS_CLASS_MAP, VEHICLE_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ auth, vehicle }) {
    return (
        <AuthenticatedLayout
        user={auth.user}
      header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Vehicle "${vehicle?.model || 'Unknown Model'}"`} 
          </h2>
          }
        >
        <Head title={`Vehicle "${vehicle.model}"`} />
        <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          <div>
                    <img src={vehicle.image_path}
                     alt="" 
                     className="w-full h-64 object-cover"/>
                </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
                
                <div className="grid gap-1 grid-cols-2 mt-2">
                    <div>
                        <div>
                            <label className="font-bold text-lg">Vehicle ID</label>
                            <p className="mt-1">{vehicle.id}</p>
                        </div>
                        <div className="mt-4"> 
                            <label className="font-bold text-lg">Vehicle Model</label>
                            <p className="mt-1">{vehicle.model}</p>
                        </div>
                        
                        <div className="mt-4">
                    <label className="font-bold text-lg">Vehicle Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          VEHICLE_STATUS_CLASS_MAP[vehicle.status]
                        }
                      >
                        {VEHICLE_STATUS_TEXT_MAP[vehicle.status]}
                      </span>
                    </p>
                  </div>
                    
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{vehicle.createdBy.name}</p>
                  </div>

                    </div>
                    
                    <div>

                         <div>
                    <label className="font-bold text-lg">Capacity</label>
                    <p className="mt-1">{vehicle.capacity}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Type</label>
                    <p className="mt-1">{vehicle.type}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Create Date</label>
                    <p className="mt-1">{vehicle.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated By</label>
                    <p className="mt-1">{vehicle.updatedBy.name}</p>
                  </div>

                    </div>
                    
                </div>
                <div className="mt-4">
                <label className="font-bold text-lg">Vehicle Description</label>
                <p className="mt-1">{vehicle.description}</p>
              </div>
            </div>
          </div>
        </div>
        </div>






        
        </AuthenticatedLayout>
    );
}