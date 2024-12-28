import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { FaCar, FaUser, FaTachometerAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function AuthenticatedLayout({ user = {}, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  console.log(user);
  const userPermissions = user?.permissions || [];
  const normalizedPermissions = userPermissions.map((permission) =>
    typeof permission === "string" ? permission : permission.name
  );

  const hasPermissions = (permission) => normalizedPermissions.includes(permission);
  const userRoles = user?.roles || [];
  const normalizedRoles = userRoles.map((role) =>
    typeof role === "string" ? role : role.name
  );
  const hasRoles = (role) => 
    
    normalizedRoles.includes(role);

  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="border-b bg-white border-[#e5e7eb] shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-primary" />
              </Link>
            </div>

            {/* Horizontal Links */}
            <div className="hidden space-x-8 sm:flex">
              <NavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
                className="flex items-center text-secondary hover:text-primary"
              >
                <FaTachometerAlt className="mr-1 text-primary" /> Dashboard
              </NavLink>
              <NavLink
                href={route("vehicle.index")}
                active={route().current("vehicle.index")}
                className="flex items-center text-secondary hover:text-primary"
              >
                <FaCar className="mr-1 text-primary" /> Vehicles
              </NavLink>
              <NavLink
                href={route("user.index")}
                active={route().current("user.index")}
                className="flex items-center text-secondary hover:text-primary"
              >
                <FaUser className="mr-1 text-primary" /> Drivers
              </NavLink>
              {hasRoles('admin') && (
                <NavLink
                  href={route("admin.dashboard")}
                  active={route().current("admin.dashboard")}
                  className="flex items-center text-secondary hover:text-primary"
                >
                  <FaCog className="mr-1 text-primary" /> Manage
                </NavLink>
              )}
              <NavLink
                href={route("user.profile", user)}
                active={route().current("user.profile", user)}
                className="flex items-center text-secondary hover:text-primary"
              >
                <FaUser className="mr-1 text-primary" /> Profile
              </NavLink>
            </div>

            {/* Dropdown for user */}
            <div className="hidden sm:flex items-center">
              <Dropdown>
                <Dropdown.Trigger>
                  <button className="inline-flex items-center text-secondary hover:text-primary">
                    {user?.name || "Guest"}
                    <FaUser className="ml-2 h-5 w-5 text-primary" />
                  </button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Link href={route("profile.edit")}>
                    Profile
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route("logout")}
                    method="post"
                    as="button"
                  >
                    <FaSignOutAlt className="mr-2 text-[#48c774]" /> Log Out
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>

            {/* Mobile Dropdown Toggle */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown((previousState) => !previousState)
                }
                className="inline-flex items-center justify-center rounded-md p-2 text-secondary hover:bg-[#e5e7eb] hover:text-primary"
              >
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

        {/* Mobile Dropdown Menu */}
        <div
          className={`${showingNavigationDropdown ? "block" : "hidden"} sm:hidden`}
        >
          <div className="space-y-1 pb-3 pt-2">
            <NavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              <FaTachometerAlt className="mr-2 text-primary" /> Dashboard
            </NavLink>
            <NavLink
              href={route("vehicle.index")}
              active={route().current("vehicle.index")}
            >
              <FaCar className="mr-2 text-primary" /> Vehicles
            </NavLink>
            <NavLink
              href={route("user.index")}
              active={route().current("user.index")}
            >
              <FaUser className="mr-2 text-primary" /> Drivers
            </NavLink>
            {hasRoles("admin") && (
              <NavLink
                href={route("admin.dashboard")}
                active={route().current("admin.dashboard")}
              >
                <FaCog className="mr-2 text-primary" /> Manage
              </NavLink>
            )}
            <NavLink
              href={route("user.profile", user)}
              active={route().current("user.profile", user)}
            >
              <FaUser className="mr-2 text-primary" /> Profile
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {header && (
        <header className="bg-white border-b border-[#e5e7eb] shadow-sm ">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-secondary">
            {header}
          </div>
        </header>
      )}
      <main className="p-6 text-secondary">{children}</main>
    </div>
  );
}
