import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [toggledSections, setToggledSections] = useState({});
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const savedState = localStorage.getItem("toggledSections");
    if (savedState) {
      setToggledSections(JSON.parse(savedState));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleSection = (section) => {
    const newState = {
      ...toggledSections,
      [section]: !toggledSections[section],
    };
    setToggledSections(newState);
    localStorage.setItem("toggledSections", JSON.stringify(newState));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-gray-800 m-2 rounded-2xl text-white w-64 ${
        collapsed ? "hidden" : "block"
      } md:block transition-all ease-in-out duration-300`}
    >
      <div className="h-full flex flex-col">
        <button
          className="md:hidden p-4 text-white bg-gray-700 hover:bg-gray-600"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "Show Menu" : "Hide Menu"}
        </button>

        {user && (
          <div className="text-center text-white text-2xl py-2 mb-10 mt-5">
            <span>Welcome, {user.name}!</span>
          </div>
        )}

        <nav className="flex-1 space-y-6 px-4">
          {/* Other Sections */}
          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("users")}
            >
              Users
            </button>
            {toggledSections["users"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/login"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/login")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/register")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Register
                </Link>
                <Link
                  to="/users"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/users")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  View Users
                </Link>

                <Link
                  to="/user-list-bin"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/user-list-bin")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  User List Bin
                </Link>
              </div>
            )}
          </div>

          {/* Bin Management */}
          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("bin_management")}
            >
              Bin Management
            </button>
            {toggledSections["bin_management"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/add-bin"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/add-bin")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Add Bin
                </Link>
                <Link
                  to="/list-bin"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/list-bin")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  List Bin
                </Link>
              </div>
            )}
          </div>

          {/* truck */}
          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("garbage_truck")}
            >
              Garbage Truck
            </button>
            {toggledSections["garbage_truck"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/truck-full-bin"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/truck-full-bin")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Full Bins
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("recycle_items")}
            >
              Recycle Item
            </button>
            {toggledSections["recycle_items"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/add-recycle-item"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/add-recycle-item")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Add New Recycle Item
                </Link>
                <Link
                  to="/recycle-items"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/recycle-items")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Recycle Item List
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("special_waste")}
            >
              Waste Management
            </button>
            {toggledSections["special_waste"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/add-special-waste"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/add-special-waste")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Add New Special Waste
                </Link>
                <Link
                  to="/special-wastes"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/special-wastes")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Special Waste List
                </Link>
              </div>
            )}
          </div>

          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("payment")}
            >
              Payments
            </button>
            {toggledSections["payment"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/payment"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/payment")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Payment History
                </Link>
                <Link
                  to="/pending-payment"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/pending-payment")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Pending Payments
                </Link>
              </div>
            )}
          </div>
          {/* Reports Section */}
          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("reports")}
            >
              Reports
            </button>
            {toggledSections["reports"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/viewReport"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/viewReport")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  View Reports
                </Link>
                <Link
                  to="/report-form"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/report-form")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Add New Report
                </Link>
              </div>
            )}
          </div>

          {/* Analytics Section */}
          <div>
            <button
              className="block text-gray-300 hover:text-white py-2 px-4 rounded-md w-full text-left"
              onClick={() => toggleSection("analytics")}
            >
              Analytics
            </button>
            {toggledSections["analytics"] && (
              <div className="pl-6 space-y-2">
                <Link
                  to="/data-analytics"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/data-analytics")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Data Analytics Overview
                </Link>
                <Link
                  to="/highwaste"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/highwaste")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  High Waste Areas Report
                </Link>
                <Link
                  to="/wasteGeneration"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/wasteGeneration")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Waste Generation
                </Link>
                <Link
                  to="/CollectionReport"
                  className={`block py-2 px-4 rounded-md ${
                    isActive("/CollectionReport")
                      ? "bg-gray-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Collection Efficiency Report
                </Link>
              </div>
            )}
          </div>
        </nav>
        {/* Logout */}
        <div className="bg-gray-700 p-4 mt-10">
          <Link
            to="/logout"
            className={`block py-2 px-4 rounded-md ${
              isActive("/logout")
                ? "bg-gray-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
