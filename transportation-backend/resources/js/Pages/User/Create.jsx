import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

export default function Create({ auth }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#373a36]">
            Create New User
          </h2>
          <Link
            href={route("user.index")}
            className="text-[#d48166] hover:text-[#d48166]/80 transition-all duration-200 flex items-center gap-2"
          >
            <FaArrowLeft className="text-sm" />
            Back to Users
          </Link>
        </div>
      }
    >
      <Head title="Create User" />

      <div className="py-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-[#e6e2dd] rounded-lg shadow-sm border border-[#d48166]/10">
            <form onSubmit={onSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <InputLabel
                    htmlFor="user_image_path"
                    value="Profile Picture"
                    
                  />
                  
                  <TextInput
                    id="user_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]  text-sm font-medium"
                    onChange={(e) => setData("image", e.target.files[0])}
                  />
                  <InputError message={errors.image} className="mt-2" />
                </div>

                <div>
                  <InputLabel 
                    htmlFor="user_name block text-sm font-medium" 
                    value="Name"
                    required
                  />
                  <TextInput
                    id="user_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    onChange={(e) => setData("name", e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                  <InputLabel 
                    htmlFor="user_email" 
                    value="Email"
                    required
                  />
                  <TextInput
                    id="user_email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    onChange={(e) => setData("email", e.target.value)}
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                  <InputLabel 
                    htmlFor="user_password" 
                    value="Password"
                    required
                  />
                  <TextInput
                    id="user_password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                  <InputLabel
                    htmlFor="user_password_confirmation"
                    value="Confirm Password"
                    required
                  />
                  <TextInput
                    id="user_password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                  />
                  <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Link
                  href={route("user.index")}
                  className="px-4 py-2 bg-white text-[#373a36] rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center gap-2"
                >
                  <FaTimes className="text-sm" />
                  Cancel
                </Link>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#d48166] text-white rounded-lg hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
                >
                  <FaSave className="text-sm" />
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}