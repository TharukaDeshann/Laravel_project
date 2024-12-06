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
        description: "",
        license_plate: "",
        type: "",
        capacity: "",
        

    })

    const onSubmit = (e) => {
        e.preventDefault();
    
        post(route("user.store"));
      };

    return (
        <AuthenticatedLayout
        user={auth.user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Create new User
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
                
                <div>
                    <InputLabel htmlFor="user_id" value="User Id"/>
                    <TextInput
                    
                    id="user_id"
                    type="text"
                    name="id"
                    className="mt-1 block w-full"
                    onChange={ (e) => setData('id', e.target.value)}
                     />
                     <InputError message={errors.id} className="mt-2"/>
                </div>
                <div className="mt-4">
                <InputLabel htmlFor="user_name" value="User Name" />

                <TextInput
                  id="user_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
              </div>
              
             

              <div className="mt-4">
                <InputLabel
                  htmlFor="user_email"
                  value="User  E mail"
                />

                <TextInput
                  id="user_email"
                  type="text"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />
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

                <InputError message={errors.user_type} className="mt-2" />
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