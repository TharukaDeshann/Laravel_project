import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { ASSIGNMENT_STATUS_CLASS_MAP, ASSIGNMENT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

// Stats Component for Assignment Overview


export default function Index({ auth,assignments, queryParams = null, success }) {
  const userPermissions = auth?.user?.permissions || [];
  
  const hasPermissions = (permission) => userPermissions.includes(permission);

  const deleteAssignment = (assignment) => {
    if(!window.confirm(`Are you sure you want to delete ${assignment.id}? This action cannot be undone.`)) {
      return;
    }
    router.delete(route("assignment.destroy", assignment.id));
  };

  queryParams = queryParams || {};
  const searchFieldChanged = (type, value) => {
    if(value) {
      queryParams[type] = value;
    } else {
      delete queryParams[type];
    }
    router.get(route('assignment.index'), queryParams);
  };

  const onKeyPress = (model, e) => {
    if(e.key !== 'Enter') return;
    searchFieldChanged(model, e.target.value);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#373a36]">
            Trip Management
          </h2>
          {hasPermissions('manage_features') && (
            <Link
              href={route("assignmentcreate.create")}
              className="bg-[#d48166] py-2 px-4 text-white rounded-lg shadow-sm hover:bg-[#d48166]/90 transition-all duration-200 flex items-center gap-2"
            >
              <FaPlus className="text-sm" />
              Add New Trip
            </Link>
          )}
        </div>
      }
    >
      <Head title="Assignments" />
      
      
      <div className="py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Overview */}
          

          {/* Success Message */}
          {success && (
            <div className="bg-green-500 py-3 px-4 text-white rounded-lg shadow-sm flex items-center gap-2">
              <span>✓</span>
              {success}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm border border-[#d48166]/10">
            {/* Enhanced Search and Filter Section */}
            <div className="p-6 border-b border-[#d48166]/10 bg-[#e6e2dd]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               

               

                <div>
                  <label className="block text-sm font-medium text-[#373a36] mb-2">
                    <FaFilter className="inline-block mr-2 text-[#d48166]" />
                    Filter by Status
                  </label>
                  <SelectInput 
                    className="w-full border-[#d48166]/20 focus:border-[#d48166] focus:ring-[#d48166]"
                    defaultValue={queryParams.status}
                    onChange={e => searchFieldChanged("status", e.target.value)}
                  >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                   
                    <option value="Completed">Completed</option>
                  </SelectInput>
                </div>
              </div>
            </div>

            {/* Enhanced Table Section */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-[#373a36]">
                <thead className="text-xs uppercase bg-[#e6e2dd]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-left">ID</th>
                    
                    <th className="px-4 py-3 font-semibold text-left">Driver Name</th>
                    <th className="px-4 py-3 font-semibold text-left">Vehicle Model</th>
                    <th className="px-4 py-3 font-semibold text-left">Status</th>
                    
                    <th className="px-4 py-3 font-semibold text-left">Start Date</th>
                    <th className="px-4 py-3 font-semibold text-left">End Date</th>
                    {hasPermissions('manage_features') && (
                      <th className="px-4 py-3 text-right font-semibold">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {assignments.data.map((assignment) => (
                    <tr
                      key={assignment.id}
                      className="border-b border-[#d48166]/10 hover:bg-[#e6e2dd]/20 transition-colors"
                    >
                      <td className="px-4 py-3">{assignment.id}</td>
                     
                      <td className="px-4 py-3 font-medium">
                        <Link 
                          href={route("assignment.show", assignment.driver.id)}
                          className="text-[#d48166] hover:underline flex items-center gap-2"
                        >
                          {assignment.driver.name}
                          <span className="text-xs bg-[#d48166]/10 px-2 py-1 rounded">
                            View Details
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <Link 
                          href={route("assignment.show", assignment.vehicle.id)}
                          className="text-[#d48166] hover:underline flex items-center gap-2"
                        >
                          {assignment.vehicle.model}
                          <span className="text-xs bg-[#d48166]/10 px-2 py-1 rounded">
                            View Details
                          </span>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 text-white rounded text-sm font-medium ${ASSIGNMENT_STATUS_CLASS_MAP[assignment.status]}`}>
                          {ASSIGNMENT_STATUS_TEXT_MAP[assignment.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span></span>
                          {assignment.start_date}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span></span>
                          {assignment.end_date}
                        </div>
                      </td>
                      
                      {hasPermissions('manage_features') && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link
                              href={route("assignment.edit", assignment.id)}
                              className="text-[#d48166] hover:text-[#d48166]/80 transition-colors bg-[#d48166]/10 p-2 rounded"
                              title="Edit"
                            >
                              <FaEdit className="text-lg" />
                            </Link>
                            <button
                              onClick={() => deleteAssignment(assignment)}
                              className="text-red-500 hover:text-red-600 transition-colors bg-red-50 p-2 rounded"
                              title="Delete"
                            >
                              <FaTrash className="text-lg" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            <div className="p-4 border-t border-[#d48166]/10 bg-[#e6e2dd]">
              <Pagination links={assignments.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}