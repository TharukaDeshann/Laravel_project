import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

// Quick Stats Component
const QuickStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-primary font-bold">🚗</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Total Vehicles</p>
            <p className="text-2xl font-bold text-primary">{stats?.totalVehicles || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-green-500 font-bold">✓</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Active Vehicles</p>
            <p className="text-2xl font-bold text-green-500">{stats?.activeVehicles || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-red-500 font-bold">⚠</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Inactive vehicles</p>
            <p className="text-2xl font-bold text-red-500">{stats?.inactiveVehicles || 0}</p>
          </div>
        </div>
      </div>
      
      {/* <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-500 font-bold">📅</span>
          </div>
          <div>
            <p className="text-sm text-secondary">Upcoming Bookings</p>
            <p className="text-2xl font-bold text-blue-500">{stats?.upcomingBookings || 0}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

// Enhanced VehicleCard Component
const VehicleCard = ({ vehicle, className = '' }) => {
  const statusColor = {
    Active: "bg-green-500",
    // maintenance: "bg-yellow-500",
    Inactive: "bg-red-500"
  }[vehicle.status] || "bg-gray-500";

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all ${className}`}>
      <div className="relative">
        <img
          src={vehicle?.image_path ? `/storage/${vehicle.image_path}` : '/api/placeholder/400/320'}
          alt={vehicle.model}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className={`absolute top-2 right-2 px-2 py-1 text-sm font-medium text-white rounded ${statusColor}`}>
          {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
        </span>
      </div>
      
      <div className="p-4">
        <h5 className="text-lg font-semibold text-secondary mb-2">{vehicle.model}</h5>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-secondary">
            <span className="mr-2">🚗</span>
            {vehicle.type}
          </div>
          
          <div className="flex items-center text-sm text-secondary">
            <span className="mr-2">🎨</span>
            {vehicle.description || 'Not specified'}
          </div>
          
          <div className="flex items-center text-sm text-secondary">
            <span className="mr-2">👥</span>
            Capacity: {vehicle.capacity || 'No data'}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Link
            href={route("vehicle.show", vehicle.id)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
          
          <span className="text-sm font-medium text-secondary">
            ID: {vehicle.id}
          </span>
        </div>
      </div>
    </div>
  );
};

// Enhanced AssignedVehiclesGrid Component
const AssignedVehiclesGrid = ({ vehicles }) => {
  const [filter, setFilter] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesFilter = filter === 'all' || vehicle.status === filter;
    const matchesSearch = vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h4 className="text-xl font-semibold text-secondary">
          Assigned Vehicles ({filteredVehicles.length})
        </h4>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search vehicles..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Vehicles</option>
            <option value="Active">Active</option>
            {/* <option value="maintenance">In Maintenance</option> */}
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-secondary">No vehicles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Enhanced UserStats Component
const UserStats = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary">
              Welcome back, {user.name}!
            </h3>
            <p className="mt-1 text-sm text-secondary">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="text-center">
            <p className="text-sm text-secondary mb-1">Role</p>
            <span className="px-3 py-1 text-sm font-medium text-white bg-primary rounded">
              {user.role || "Admin"}
            </span>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard({ auth, assignedVehicles }) {
  const stats = {
    totalVehicles: assignedVehicles.length,
    activeVehicles: assignedVehicles.filter(v => v.status === 'Active').length,
    inactiveVehicles: assignedVehicles.filter(v => v.status === 'Inactive').length,
    upcomingBookings: 0 // You can populate this from your backend
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-2xl font-semibold leading-tight text-secondary">
          User Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <UserStats user={auth.user} />
        
        {/* Quick Stats */}
        <QuickStats stats={stats} />
        
        {/* Assigned Vehicles Section */}
        <AssignedVehiclesGrid vehicles={assignedVehicles} />
      </div>
    </AuthenticatedLayout>
  );
}