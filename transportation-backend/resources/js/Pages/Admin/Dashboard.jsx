import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

// QuickStats Component
const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#d48166]/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-[#d48166] font-bold">👥</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Total Drivers</p>
            <p className="text-2xl font-bold text-[#d48166]">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#d48166]/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-[#d48166] font-bold">🚗</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Total Vehicles</p>
            <p className="text-2xl font-bold text-[#d48166]">{stats.totalVehicles}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-green-500 font-bold">✓</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Active Vehicles</p>
            <p className="text-2xl font-bold text-green-500">{stats.activeVehicles}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#d48166]/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-[#d48166] font-bold">📅</span>
          </div>
          <div>
            <p className="text-sm text-[#373a36]">Today's Assignments</p>
            <p className="text-2xl font-bold text-[#d48166]">{stats.todayAssignments}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced DataTable Component
const DataTable = ({ data, columns, title, viewRoute, searchable = true }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = searchable 
    ? data.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#373a36] mb-4 md:mb-0">
          {title}
        </h3>
        
        {searchable && (
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#d48166] bg-[#e6e2dd]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-[#373a36]">🔍</span>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#e6e2dd]">
          <thead className="bg-[#e6e2dd]">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-[#373a36] uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-[#373a36] uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-[#e6e2dd]">
            {filteredData.slice(0, 5).map((item, index) => (
              <tr key={index} className="hover:bg-[#e6e2dd]/50 transition-colors">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-[#373a36]">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    href={route(viewRoute, item.id)}
                    className="px-4 py-2 bg-[#d48166] text-white rounded-md hover:bg-[#d48166]/90 transition-colors"
                  >
                    View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function Dashboard({ auth, users, vehicles }) {
  const stats = {
    totalUsers: users.length,
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'Active').length,
    todayAssignments: 0 // You can populate this from your backend
  };

  const userColumns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Role', key: 'role' }
  ];

  const vehicleColumns = [
    { header: 'Model', key: 'model' },
    { header: 'Type', key: 'type' },
    {
      header: 'Status',
      key: 'status',
      render: (vehicle) => (
        <span className={`px-2 py-1 rounded text-white ${
          vehicle.status === 'Active' ? 'bg-green-500' : 
          vehicle.status === 'Inactive' ? 'bg-red-500' : 'bg-[#d48166]'
        }`}>
          {vehicle.status}
        </span>
      )
    }
  ];

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#373a36]">
            Admin Dashboard
          </h2>
          <div className="flex space-x-4">
            <a
              href={route("user.index")}
              className="px-4 py-2 bg-[#d48166] text-white rounded-md hover:bg-[#d48166]/90 transition-colors"
            >
              Manage Drivers
            </a>
            <a
              href={route("vehicle.index")}
              className="px-4 py-2 bg-[#d48166] text-white rounded-md hover:bg-[#d48166]/90 transition-colors"
            >
              Manage Vehicles
            </a>
          </div>
        </div>
      }
    >
      <Head title="Admin Dashboard" />

      <div className="p-6 space-y-6">
        <QuickStats stats={stats} />
        
        <DataTable
          data={users}
          columns={userColumns}
          title="Recent Drivers"
          viewRoute="user.show"
        />
        
        <DataTable
          data={vehicles}
          columns={vehicleColumns}
          title="Recent Vehicles"
          viewRoute="vehicle.show"
        />
      </div>
    </AuthenticatedLayout>
  );
}