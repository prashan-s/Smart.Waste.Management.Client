import { FiHome } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuBellRing } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import maleAvatar from "@assets/images/male-avatar.png"
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="fixed h-screen w-72 bg-sidebar flex flex-col justify-between py-8">
            {/* Top Section */}
            <div>
                {/* Logo */}
                <div className="px-6 mb-10">
                    <div className="text-2xl font-semibold flex items-center space-x-2">
                        <span className="text-xl px-2 py-1 mr-2 bg-primary rounded-md text-white">&#x25BC;</span> {/* Triangle Logo */}
                        <span>UrbanEco</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="px-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-3 text-primary font-medium mb-6 text-lg focus:outline-none"
                                : "flex items-center space-x-3 text-textSecondary hover:text-primary font-normal mb-6 text-lg focus:outline-none"
                        }
                    >
                        <FiHome />
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-3 text-primary font-medium mb-6 text-lg focus:outline-none"
                                : "flex items-center space-x-3 text-textSecondary hover:text-primary font-normal mb-6 text-lg focus:outline-none"
                        }
                    >
                        <MdOutlineDashboardCustomize />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/reports"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-3 text-primary font-medium mb-6 text-lg focus:outline-none"
                                : "flex items-center space-x-3 text-textSecondary hover:text-primary font-normal mb-6 text-lg focus:outline-none"
                        }
                    >
                        <HiOutlineDocumentReport />
                        <span>Reports</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/notifications"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-3 text-primary font-medium mb-6 text-lg focus:outline-none"
                                : "flex items-center space-x-3 text-textSecondary hover:text-primary font-normal mb-6 text-lg focus:outline-none"
                        }
                    >
                        <LuBellRing />
                        <span>Notifications</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/settings"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-3 text-primary font-medium mb-6 text-lg focus:outline-none"
                                : "flex items-center space-x-3 text-textSecondary hover:text-primary font-normal mb-6 text-lg focus:outline-none"
                        }
                    >
                        <IoSettingsOutline />
                        <span>Settings</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/logout"
                        className={({ isActive }) =>
                            isActive
                                ? "flex items-center space-x-3 text-primary font-medium mb-6 text-lg focus:outline-none"
                                : "flex items-center space-x-3 text-textSecondary hover:text-primary font-normal mb-6 text-lg focus:outline-none"
                        }
                    >
                        <AiOutlineLogout />
                        <span>Logout</span>
                    </NavLink>
                </nav>
            </div>

            {/* Bottom Section - Profile */}
            <div className="px-6 flex items-start space-x-3">
                <img
                    className="w-10 h-10 rounded-full"
                    src={maleAvatar}
                    alt="User profile"
                />
                <div>
                    <p className="text-textSecondary font-medium">Michael Smith</p>
                    <p className="text-textSlateGray text-sm">michaelsmith12@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;