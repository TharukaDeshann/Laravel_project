import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Create({auth}){
    const {data, setData, post, errors, reset} = useForm({
        image: "",
        model: "",
        status: "",
        description: "",
        license_plate: "",
        type: "",
        capacity: "",
        

    })

    const onSubmit = (e) => {
        e.preventDefault();
    
        post(route("vehicle.store"));
      };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Create new Vehicle
            </h2>
           
            </div>
            
        }
        >
             <Head title="Vehicles" />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          
              <form onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                
                <div>
                    <InputLabel htmlFor="vehicle_image_path" value="Vehicle Image"/>
                    <TextInput
                    
                    id="vehicle_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={ (e) => setData('image', e.target.files[0])}
                     />
                     <InputError message={errors.image} className="mt-2"/>
                </div>
                <div className="mt-4">
                <InputLabel htmlFor="vehicle_model" value="Vehicle Model" />

                <TextInput
                  id="vehicle_model"
                  type="text"
                  name="model"
                  value={data.model}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("model", e.target.value)}
                />

                <InputError message={errors.model} className="mt-2" />
              </div>
              
              <div className="mt-4">
                <InputLabel
                  htmlFor="vehicle_description"
                  value="Vehicle Description"
                />

                <TextAreaInput
                  id="vehicle_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="vehicle_license_plate"
                  value="Vehicle License Plate"
                />

                <TextInput
                  id="vehicle_license_plate"
                  type="text"
                  name="license_plate"
                  value={data.license_plate}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("license_plate", e.target.value)}
                />

                <InputError message={errors.license_plate} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="vehicle_status" value="Vehicle Status" />

                <SelectInput
                  name="status"
                  id="vehicle_status"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>

                </SelectInput>

                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="vehicle_type" value="Vehicle Type" />

                <SelectInput
                  name="type"
                  id="vehicle_type"
                  className="mt-1 block w-full"
                  onChange={(e) => setData("type", e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Suv">Suv</option>
                  <option value="Truck">Truck</option>
                  <option value="Bike">Bike</option>
                  <option value="Other">Other</option>

                </SelectInput>

                <InputError message={errors.type} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="vehicle_capacity"
                  value="Vehicle Capacity"
                />

                <TextInput
                  id="vehicle_capacity"
                  type="number"
                  min={1}
                  max={50}
                  name="capacity"
                  value={data.capacity}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("capacity", e.target.value)}
                />

                <InputError message={errors.capacity} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("vehicle.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
              
              </form>
            </div>
            </div>
            </div>
           
        </AuthenticatedLayout>
    );
}