import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaSave, FaCar, FaTimes } from "react-icons/fa";

export default function Create({ auth, vehicle, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    model: vehicle?.model || "",
    status: vehicle?.status || "",
    description: vehicle?.description || "",
    license_plate: vehicle?.license_plate || "",
    type: vehicle?.type || "",
    assigned_user_id: vehicle?.assigned_user_id || "",
    capacity: vehicle?.capacity || "",
    _method: 'PUT'
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("vehicle.update", vehicle.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#373a36] flex items-center gap-2">
            <FaCar className="text-[#d48166]" />
            Edit Vehicle
            <span className="text-[#d48166]">-</span>
            <span className="text-[#d48166]">{vehicle?.model || "Unknown"}</span>
          </h2>
        </div>
      }
    >
      <Head title="Edit Vehicle" />

      <div className="py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
            <form onSubmit={onSubmit}>
              {/* Image Preview Section */}
              <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
                <div className="flex items-center gap-6">
                  {vehicle.image_path && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden shadow-sm">
                      <img 
                        src={vehicle.image_path} 
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <InputLabel 
                      htmlFor="vehicle_image_path" 
                      value="Update Vehicle Image"
                      className="text-[#373a36] mb-2"
                    />
                    <TextInput
                      id="vehicle_image_path"
                      type="file"
                      name="image"
                      className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                      onChange={(e) => setData('image', e.target.files[0])}
                    />
                    <InputError message={errors.image} className="mt-2" />
                  </div>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="p-6 space-y-6">
                {/* Basic Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <InputLabel htmlFor="vehicle_model" value="Vehicle Model" className="text-[#373a36]" />
                    <TextInput
                      id="vehicle_model"
                      type="text"
                      name="model"
                      value={data.model}
                      className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                      isFocused={true}
                      onChange={(e) => setData("model", e.target.value)}
                    />
                    <InputError message={errors.model} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel htmlFor="vehicle_license_plate" value="License Plate" className="text-[#373a36]" />
                    <TextInput
                      id="vehicle_license_plate"
                      type="text"
                      name="license_plate"
                      value={data.license_plate}
                      className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                      onChange={(e) => setData("license_plate", e.target.value)}
                    />
                    <InputError message={errors.license_plate} className="mt-2" />
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <InputLabel htmlFor="vehicle_status" value="Status" className="text-[#373a36]" />
                    <SelectInput
                      name="status"
                      id="vehicle_status"
                      value={data.status}
                      className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                      onChange={(e) => setData("status", e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </SelectInput>
                    <InputError message={errors.status} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel htmlFor="vehicle_type" value="Vehicle Type" className="text-[#373a36]" />
                    <SelectInput
                      name="type"
                      id="vehicle_type"
                      value={data.type}
                      className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                      onChange={(e) => setData("type", e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Suv">SUV</option>
                      <option value="Truck">Truck</option>
                      <option value="Bike">Bike</option>
                      <option value="Other">Other</option>
                    </SelectInput>
                    <InputError message={errors.type} className="mt-2" />
                  </div>

                  <div>
                    <InputLabel htmlFor="vehicle_capacity" value="Capacity" className="text-[#373a36]" />
                    <TextInput
                      id="vehicle_capacity"
                      type="number"
                      min={1}
                      max={50}
                      name="capacity"
                      value={data.capacity}
                      className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                      onChange={(e) => setData("capacity", e.target.value)}
                    />
                    <InputError message={errors.capacity} className="mt-2" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <InputLabel htmlFor="vehicle_description" value="Description" className="text-[#373a36]" />
                  <TextAreaInput
                    id="vehicle_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    onChange={(e) => setData("description", e.target.value)}
                    rows={4}
                  />
                  <InputError message={errors.description} className="mt-2" />
                </div>

                {/* Assignment */}
                <div>
                  <InputLabel htmlFor="vehicle_assigned_user" value="Assign to User" className="text-[#373a36]" />
                  <SelectInput
                    name="assigned_user_id"
                    id="vehicle_assigned_user"
                    value={data.assigned_user_id}
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    onChange={(e) => setData("assigned_user_id", e.target.value)}
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </SelectInput>
                  <InputError message={errors.assigned_user_id} className="mt-2" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-[#e6e2dd] border-t border-[#d48166]/10 flex justify-end gap-4">
                <Link
                  href={route("vehicle.index")}
                  className="bg-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 text-gray-600"
                >
                  <FaTimes className="text-sm" />
                  Cancel
                </Link>
                <button 
                  type="submit"
                  className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                >
                  <FaSave className="text-sm" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}