"use client";
import { useState, useRef, useEffect, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import { 
  Settings, Sun, Bell, Menu, Moon, 
  User, LogOut, HelpCircle, X, ChevronDown, 
  User2,
  User2Icon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: Date;
};

type DropdownItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: () => void;
  href?: string;
  divider?: boolean;
};

const Navbar = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  // Component state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Saint Mary",
    email: "saint.mary@example.com",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Refs
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  const user: User = {
    id: "1",
    name: profileData.name,
    email: profileData.email,
    image: imagePreview || "/avatar-placeholder.png",
    role: "Admin"
  };

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New message",
      message: "You have 3 unread messages",
      read: false,
      date: new Date()
    },
    {
      id: "2",
      title: "System update",
      message: "New version available",
      read: true,
      date: new Date(Date.now() - 86400000)
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Dropdown items
  const dropdownItems: DropdownItem[] = [
    {
      label: "Edit Profile",
      icon: User,
      action: () => {
        setIsProfileModalOpen(true);
        setIsDropdownOpen(false);
      }
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings"
    },
    {
      label: "Help Center",
      icon: HelpCircle,
      href: "/help"
    },
    {
      divider: true
    } as DropdownItem,
    {
      label: "Sign out",
      icon: LogOut,
      action: () => {
        // Handle logout logic
        console.log("User logged out");
        setIsDropdownOpen(false);
      }
    }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handlers
  const toggleSidebar = () => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    console.log('Profile updated:', profileData);
    setIsProfileModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const markAsRead = (id: string) => {
    // API call to mark notification as read
    console.log(`Marked notification ${id} as read`);
  };

  return (
    <nav className="bg-white shadow-lg rounded-lg py-2 px-10 mb-5 md:px-6">
      <div className="flex justify-between items-center h-16">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 "
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-700 " />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <Transition
              show={isNotificationsOpen}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-600 focus:outline-none z-50">
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Notifications
                  </p>
                </div>
                <div className="py-1 max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 ${!notification.read ? 'bg-blue-50 dark:bg-gray-800' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-0.5">
                            <Bell className="h-5 w-5 text-gray-400" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              {notification.message}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">
                              {notification.date.toLocaleDateString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="ml-4 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No new notifications
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2">
                  <Link
                    href="/notifications"
                    className="block text-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    View all
                  </Link>
                </div>
              </div>
            </Transition>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="User menu"
            >
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={user.image || "/utils/image/avatar-placeholder.png"}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
            </button>

            <Transition
              show={isDropdownOpen}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  {dropdownItems.map((item, index) => (
                    <Fragment key={index}>
                      {item.divider ? (
                        <div className="border-t border-gray-100 dark:border-gray-600 my-1" />
                      ) : item.href ? (
                        <Link
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 text-left"
                        >
                          <item.icon className="mr-3 h-5 w-5 text-gray-400" />
                          {item.label}
                        </button>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      {/* Profile edit modal */}
      <Transition appear show={isProfileModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsProfileModalOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={() => setIsProfileModalOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="mt-4 space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full overflow-hidden">
                        <Image
                          src={imagePreview || user.image || "/images/avatar-placeholder.png"}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsProfileModalOpen(false)}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default Navbar;