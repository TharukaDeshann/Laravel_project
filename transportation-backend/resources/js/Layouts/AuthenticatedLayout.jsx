import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FaCar, FaUser, FaTachometerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function AuthenticatedLayout({ user = {}, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  
  const userPermissions = user?.permissions || [];
  const normalizedPermissions = userPermissions.map((permission) =>
    typeof permission === "string" ? permission : permission.name
  );

  const hasPermissions = (permission) => normalizedPermissions.includes(permission);
  const userRoles = user?.roles || [];
  const normalizedRoles = userRoles.map((role) =>
    typeof role === "string" ? role : role.name
  );
  const hasRoles = (role) => normalizedRoles.includes(role);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b bg-white border-[#e5e7eb] shadow-sm">
        <div className="mx-auto w-full px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 py-2">
                <ApplicationLogo className="h-8 w-auto sm:h-9 text-primary" />
                <span className="text-base sm:text-lg font-semibold text-primary">FMS</span>
              </Link>
            </div>

            {/* Horizontal Links - Desktop */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
                className="flex items-center text-secondary hover:text-primary transition-colors duration-200"
              >
                <FaTachometerAlt className="mr-1.5 text-primary" /> 
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                href={route("vehicle.index")}
                active={route().current("vehicle.index")}
                className="flex items-center text-secondary hover:text-primary transition-colors duration-200"
              >
                <FaCar className="mr-1.5 text-primary" /> 
                <span>Vehicles</span>
              </NavLink>
              <NavLink
                href={route("user.index")}
                active={route().current("user.index")}
                className="flex items-center text-secondary hover:text-primary transition-colors duration-200"
              >
                <FaUser className="mr-1.5 text-primary" /> 
                <span>Drivers</span>
              </NavLink>
              <NavLink
                href={route("assignment.index")}
                active={route().current("assignment.index")}
                className="flex items-center text-secondary hover:text-primary transition-colors duration-200"
              >
                <FaUser className="mr-1.5 text-primary" /> 
                <span>Assignments</span>
              </NavLink>
              {hasRoles('admin') && (
                <NavLink
                  href={route("admin.dashboard")}
                  active={route().current("admin.dashboard")}
                  className="flex items-center text-secondary hover:text-primary transition-colors duration-200"
                >
                  <FaCog className="mr-1.5 text-primary" /> 
                  <span>Manage</span>
                </NavLink>
              )}
              <NavLink
              href={route("user.profile", user)}
              active={route().current("user.profile", user)}
              className="flex items-center text-secondary hover:text-primary transition-colors duration-200"
            >
              <FaUser className="mr-2 text-primary" /> Profile
            </NavLink>
            </div>

            {/* User Dropdown - Desktop */}
            <div className="hidden md:flex items-center">
              <Dropdown>
                <Dropdown.Trigger>
                  <button className="inline-flex items-center px-3 py-2 text-sm rounded-md text-secondary hover:text-primary hover:bg-gray-50 transition-colors duration-200">
                    <span className="mr-2">{user?.name || "Guest"}</span>
                    <FaUser className="h-4 w-4 text-primary" />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Link href={route("profile.edit")} className="flex items-center">
                    <FaUser className="mr-2 h-4 w-4 text-primary" /> Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center w-full"
                  >
                    <FaSignOutAlt className="mr-2 h-4 w-4 text-[#48c774]" /> Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={showingNavigationDropdown}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            showingNavigationDropdown ? "block" : "hidden"
          } md:hidden border-t border-gray-200`}
        >
          <div className="space-y-1 px-4 pb-3 pt-2">
            <NavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              <div className="flex items-center">
                <FaTachometerAlt className="mr-2 h-5 w-5 text-primary" />
                Dashboard
              </div>
            </NavLink>
            <NavLink
              href={route("vehicle.index")}
              active={route().current("vehicle.index")}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              <div className="flex items-center">
                <FaCar className="mr-2 h-5 w-5 text-primary" />
                Vehicles
              </div>
            </NavLink>
            <NavLink
              href={route("user.index")}
              active={route().current("user.index")}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              <div className="flex items-center">
                <FaUser className="mr-2 h-5 w-5 text-primary" />
                Drivers
              </div>
            </NavLink>
            <NavLink
              href={route("assignment.index")}
              active={route().current("assignment.index")}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              <div className="flex items-center">
                <FaUser className="mr-2 h-5 w-5 text-primary" />
                Assignments
              </div>
            </NavLink>
            {hasRoles("admin") && (
              <NavLink
                href={route("admin.dashboard")}
                active={route().current("admin.dashboard")}
                className="block px-3 py-2 rounded-md text-base font-medium"
              >
                <div className="flex items-center">
                  <FaCog className="mr-2 h-5 w-5 text-primary" />
                  Manage
                </div>
              </NavLink>
            )}
            <NavLink
              href={route("user.profile", user)}
              active={route().current("user.profile", user)}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              <FaUser className="mr-2 text-primary" /> Profile
            </NavLink>
            
            {/* Mobile User Menu */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="px-3 py-2 text-base font-medium text-gray-600">
                {user?.name || "Guest"}
              </div>
              <NavLink
                href={route("profile.edit")}
                className="block px-3 py-2 rounded-md text-base font-medium"
              >
                <div className="flex items-center">
                  <FaUser className="mr-2 h-5 w-5 text-primary" />
                  Profile
                </div>
              </NavLink>
              <Link
                href={route("logout")}
                method="post"
                as="button"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
              >
                <div className="flex items-center">
                  <FaSignOutAlt className="mr-2 h-5 w-5" />
                  Log Out
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      {header && (
        <header className="bg-white border-b border-[#e5e7eb] shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
            <div className="text-secondary">{header}</div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 text-secondary">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}