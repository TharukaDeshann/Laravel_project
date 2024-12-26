
import Radio from "@/Components/Radio";

import InputLabel from "@/Components/InputLabel";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

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
    console.log(ev.target.value, ev.target.checked)
    if (ev.target.checked) {
      setData('roles', [ev.target.value])
    }
  }

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
            Change User Role "{user.name || "Unknown"}"
          </h2>
        </div>
      }
    >
      <Head title="Edit User Role" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              
                  <div className="mt-4">
              <InputLabel value="Role"/>
              {roles.map((role) => (
                <label className="flex items-center mb-1" key={role.id}>
                  <Radio
                    name="roles"
                    checked={data.roles.includes(role.name)}
                    value={role.name}
                    onChange={onRoleChange}
                  />
                  <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                      {roleLabels[role.name]}
                  </span>
                </label>
              ))}

            </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("user.index")}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </AuthenticatedLayout>
  );
}
