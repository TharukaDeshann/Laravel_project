import Radio from "@/Components/Radio";
import InputLabel from "@/Components/InputLabel";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

export default function Edit({ auth, user, roles, roleLabels }) {
  const { data, setData, post, errors } = useForm({
    name: user.name || "",
    email: user.email || "",
    password: "",
    password_confirmation: "",
    roles: user.roles,
    _method: "PUT",
  });

  const onRoleChange = (ev) => {
    if (ev.target.checked) {
      setData('roles', [ev.target.value]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#373a36]">
            Change User Role - {user.name || "Unknown"}
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
      <Head title="Edit User Role" />

      <div className="py-6">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
            <form onSubmit={onSubmit} className="p-6">
              <div>
                <InputLabel 
                  value="Role" 
                  className="text-[#373a36] text-lg font-semibold mb-4 block "
                />
                <div className="space-y-3">
                  {roles.map((role) => (
                    <label 
                      className="flex items-center p-3 rounded-lg hover:bg-[#e6e2dd]/50 transition-colors cursor-pointer" 
                      key={role.id}
                    >
                      <Radio
                        name="roles"
                        checked={data.roles.includes(role.name)}
                        value={role.name}
                        onChange={onRoleChange}
                        className="text-[#d48166] focus:ring-[#d48166]"
                      />
                      <span className="ml-3 text-[#373a36]">
                        {roleLabels[role.name]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Link
                  href={route("user.index")}
                  className="px-4 py-2 bg-[#e6e2dd] text-[#373a36] rounded-lg hover:bg-[#e6e2dd]/80 transition-all duration-200 flex items-center gap-2"
                >
                  <FaTimes className="text-sm" />
                  Cancel
                </Link>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-[#d48166] text-white rounded-lg hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
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