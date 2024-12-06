import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Create({auth, user}){
    console.log(user);
    const { data, setData, post, errors, reset } = useForm({
      image: "",
      model: user?.model || "",
      description: user?.description || "",
      license_plate: user?.license_plate || "",
      type: user?.type || "",
      capacity: user?.capacity || "",
      _method: 'PUT'
  });
    

    const onSubmit = (e) => {
        e.preventDefault();
    
        post(route("user.update", user.id));
      };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Edit user "{user?.model || "Unknown"}"
            </h2>
           
            </div>
            
        }
        >
             <Head title="Users" />

<div className="py-12">
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
          
              <form onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
               
               
               
                




                {user.image_path && <div className="mb-4">
                    <img src={user.image_path} className="w-64"/>
                </div>}
                <div>
                    <InputLabel htmlFor="user_image_path" value="User Image"/>
                    <TextInput
                    
                    id="user_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={ (e) => setData('image', e.target.files[0])}
                     />
                     <InputError message={errors.image} className="mt-2"/>
                </div>
                <div className="mt-4">
                <InputLabel htmlFor="user_model" value="User Model" />

                <TextInput
                  id="user_model"
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
                  htmlFor="user_description"
                  value="User Description"
                />

                <TextAreaInput
                  id="user_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_license_plate"
                  value="User License Plate"
                />

              <TextInput
                  id="user_license_plate"
                  type="text"
                  name="license_plate"
                  value={data.license_plate} // Correct reference
                  className="mt-1 block w-full"
                  onChange={(e) => setData("license_plate", e.target.value)} // Correct onChange
              />
              <InputError message={errors.license_plate} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="user_type" value="User Type" />

                <SelectInput
                  name="type"
                  id="user_type"
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
                  htmlFor="user_capacity"
                  value="User Capacity"
                />

                <TextInput
                  id="user_capacity"
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
                  href={route("user.index")}
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