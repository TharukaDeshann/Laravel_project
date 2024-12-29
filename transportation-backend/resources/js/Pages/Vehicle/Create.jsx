import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaSave, FaTimes } from "react-icons/fa";

export default function Create({ auth, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        image: "",
        model: "",
        status: "",
        description: "",
        license_plate: "",
        type: "",
        capacity: "",
        assigned_user_id: "",
    });

    const vehicleTypes = [
        { value: "Sedan", label: "Sedan" },
        { value: "Suv", label: "SUV" },
        { value: "Truck", label: "Truck" },
        { value: "Bike", label: "Bike" },
        { value: "Other", label: "Other" },
    ];

    const statusTypes = [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // File size validation (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should not exceed 5MB");
                e.target.value = "";
                return;
            }
            // File type validation
            if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
                alert("Please upload only JPEG, JPG or PNG files");
                e.target.value = "";
                return;
            }
            setData("image", file);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        
        post(route("vehicle.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                // Optional: Show success message
            },
            onError: (errors) => {
                // Optional: Handle specific errors
                if (errors.image) {
                    // Handle image upload errors specifically
                }
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Create New Vehicle
                    </h2>
                </div>
            }
        >
            <Head title="Create Vehicle" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#e6e2dd]  overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8">
                            {/* Image Upload Section */}
                            <div className="mb-6">
                                <InputLabel htmlFor="vehicle_image_path" value="Vehicle Image" />
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        id="vehicle_image_path"
                                        accept="image/jpeg,image/png,image/jpg"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        JPG, JPEG or PNG (MAX. 5MB)
                                    </p>
                                </div>
                                <InputError message={errors.image} className="mt-2" />
                            </div>

                            {/* Two columns layout for form fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div>
                                    {/* Model Field */}
                                    <div className="mb-6">
                                        <InputLabel required htmlFor="vehicle_model" value="Vehicle Model" />
                                        <TextInput
                                            id="vehicle_model"
                                            type="text"
                                            value={data.model}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={(e) => setData("model", e.target.value)}
                                        />
                                        <InputError message={errors.model} className="mt-2" />
                                    </div>

                                    {/* License Plate Field */}
                                    <div className="mb-6">
                                        <InputLabel required htmlFor="vehicle_license_plate" value="License Plate" />
                                        <TextInput
                                            id="vehicle_license_plate"
                                            type="text"
                                            value={data.license_plate}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("license_plate", e.target.value)}
                                        />
                                        <InputError message={errors.license_plate} className="mt-2" />
                                    </div>

                                    {/* Type Field */}
                                    <div className="mb-6">
                                        <InputLabel required htmlFor="vehicle_type" value="Vehicle Type" />
                                        <SelectInput
                                            id="vehicle_type"
                                            value={data.type}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("type", e.target.value)}
                                        >
                                            <option value="">Select Type</option>
                                            {vehicleTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.type} className="mt-2" />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    {/* Status Field */}
                                    <div className="mb-6">
                                        <InputLabel required htmlFor="vehicle_status" value="Status" />
                                        <SelectInput
                                            id="vehicle_status"
                                            value={data.status}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("status", e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            {statusTypes.map((status) => (
                                                <option key={status.value} value={status.value}>
                                                    {status.label}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    {/* Capacity Field */}
                                    <div className="mb-6">
                                        <InputLabel required htmlFor="vehicle_capacity" value="Capacity" />
                                        <TextInput
                                            id="vehicle_capacity"
                                            type="number"
                                            min={1}
                                            max={50}
                                            value={data.capacity}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("capacity", e.target.value)}
                                        />
                                        <InputError message={errors.capacity} className="mt-2" />
                                    </div>

                                    {/* Assigned User Field */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="vehicle_assigned_user" value="Assigned User" />
                                        <SelectInput
                                            id="vehicle_assigned_user"
                                            value={data.assigned_user_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("assigned_user_id", e.target.value)}
                                        >
                                            <option value="">Select User</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.assigned_user_id} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Description Field - Full Width */}
                            <div className="mb-6">
                                <InputLabel htmlFor="vehicle_description" value="Description" />
                                <TextAreaInput
                                    id="vehicle_description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    rows={4}
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4">
                                <Link
                                    href={route("vehicle.index")}
                                    className="px-4 py-2 bg-white text-[#373a36] rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                                    
                                >
                                  <FaTimes className="text-sm" />
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-[#d48166] text-white rounded-lg hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                                >
                                  <FaSave className="text-sm" />
                                    {processing ? "Saving..." : "Save Vehicle"}
                                </button>
                                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}