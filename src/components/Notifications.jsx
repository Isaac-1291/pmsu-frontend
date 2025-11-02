import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("https://pmsu-backend-1.onrender.com/api/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      // Optional: You can create a PATCH endpoint to mark as read in backend
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative p-2 text-white hover:text-yellow-200">
        <FaBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50">
          <div className="flex justify-between items-center p-2 border-b">
            <span className="font-semibold text-[#4a2c0a]">Notifications</span>
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark all read
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="p-2 text-gray-500 text-sm">No notifications</li>
            )}
            {notifications.map((n, index) => (
              <li
                key={index}
                className={`p-2 border-b text-sm ${
                  n.read ? "text-gray-600" : "font-semibold text-[#4a2c0a]"
                }`}
              >
                <span>{n.message}</span>
                {n.recipientEmail && (
                  <div className="text-xs text-gray-400">{n.recipientEmail}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;