import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaSave, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Create({ auth, drivers, vehicles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        vehicle_id: "",
        driver_id: "",
        status: "",
        start_date: "",
        end_date: "",
    });

    const statusTypes = [
        { value: "Pending", label: "Pending" },
        
        { value: "Completed", label: "Completed" },
       
    ];

    const onSubmit = (e) => {
        e.preventDefault();
        
        post(route("assignment.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: () => {
                // Handle errors if needed
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Add New Trip
                    </h2>
                </div>
            }
        >
            <Head title="Create Assignment" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#e6e2dd] overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={onSubmit} className="p-4 sm:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div>
                                    {/* Vehicle Selection */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="vehicle_id" value="Select Vehicle" required />
                                        <SelectInput
                                            id="vehicle_id"
                                            value={data.vehicle_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("vehicle_id", e.target.value)}
                                        >
                                            <option value="">Choose a vehicle</option>
                                            {vehicles?.map((vehicle) => (
                                                <option key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.model} - {vehicle.license_plate}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.vehicle_id} className="mt-2" />
                                    </div>

                                    {/* Driver Selection */}
                                    <div className="mb-6">
                                        <InputLabel htmlFor="driver_id" value="Select Driver" required />
                                        <SelectInput
                                            id="driver_id"
                                            value={data.driver_id}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData("driver_id", e.target.value)}
                                        >
                                            <option value="">Choose a driver</option>
                                            {drivers?.map((driver) => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError message={errors.driver_id} className="mt-2" />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    {/* Start Date */}
                                    <div className="mb-6">
    <InputLabel htmlFor="start_date" value="Start Date" required />
    <DatePicker
        id="start_date"
        selected={data.start_date ? new Date(data.start_date) : null}
        onChange={(date) => {
            setData("start_date", date ? date.toISOString() : "");
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholderText="Select start date and time"
    />
    <InputError message={errors.start_date} className="mt-2" />
</div>

                                    {/* End Date */}
                                    <div className="mb-6">
    <InputLabel htmlFor="end_date" value="End Date" required />
    <DatePicker
        id="end_date"
        selected={data.end_date ? new Date(data.end_date) : null}
        onChange={(date) => {
            setData("end_date", date ? date.toISOString() : "");
        }}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={data.start_date ? new Date(data.start_date) : null}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholderText="Select end date and time"
    />
    <InputError message={errors.end_date} className="mt-2" />
</div>
                                </div>
                            </div>

                            {/* Status - Full Width */}
                            <div className="mb-6">
                                <InputLabel htmlFor="status" value="Assignment Status" required />
                                <SelectInput
                                    id="status"
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

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-4">
                                <Link
                                    href={route("assignment.index")}
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
                                    {processing ? "Saving..." : "Create Assignment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}