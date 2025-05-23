"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Video, LogOut, Settings, Bell } from "lucide-react";
import { useNotification } from "./Notification"; // Assuming this path is correct

export default function Header() {
  const { data: session } = useSession();
  const { showNotification } = useNotification();

  // Helper function to close the dropdown by blurring the active element
  const closeDropdown = () => {
    // Ensure this runs after other event handlers
    setTimeout(() => {
      if (
        document.activeElement &&
        typeof (document.activeElement as HTMLElement).blur === "function"
      ) {
        (document.activeElement as HTMLElement).blur();
      }
    }, 0);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      showNotification("Signed out successfully", "success");
    } catch {
      showNotification("Failed to sign out", "error");
    } finally {
      closeDropdown(); // Close dropdown after sign out attempt
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="group flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              prefetch={true}
              onClick={() =>
                showNotification("Welcome to ImageKit ReelsPro", "info")
              }
            >
              <div className="relative">
                <Home className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 group-hover:opacity-40 blur transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                  ImageKit
                </span>
                <span className="text-xs text-purple-300/80 font-medium -mt-1">
                  ReelsPro
                </span>
              </div>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell (if user is logged in) */}
            {session && (
              <button className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 group">
                <Bell className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
              </button>
            )}

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 group"
              >
                <User className="w-5 h-5 text-white group-hover:text-purple-300 transition-colors duration-300" />
              </div>

              <ul
                tabIndex={0} // This makes the dropdown content focusable, which is part of how DaisyUI handles it.
                className="dropdown-content z-[1] mt-4 w-72 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-purple-900/20 overflow-hidden"
              >
                {session ? (
                  <>
                    {/* User Info Section */}
                    <li className="px-6 py-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10 border-b border-white/5">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {session.user?.name ||
                              session.user?.email?.split("@")[0]}
                          </p>
                          <p className="text-purple-300/70 text-sm">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    {/* Menu Items */}
                    <div className="py-2">
                      <li>
                        <Link
                          href="/upload"
                          className="flex items-center space-x-3 px-6 py-3 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-blue-600/10 text-white/90 hover:text-white transition-all duration-300 group"
                          onClick={() => {
                            showNotification(
                              "Welcome to Admin Dashboard",
                              "info"
                            );
                            closeDropdown(); // Close dropdown
                          }}
                        >
                          <Video className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                          <span className="font-medium">Video Upload</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/" // Assuming this is the settings page or similar
                          className="flex items-center space-x-3 px-6 py-3 hover:bg-gradient-to-r hover:from-purple-600/10 hover:to-blue-600/10 text-white/90 hover:text-white transition-all duration-300 group"
                          onClick={() => {
                            // If you want a notification for settings, add it here.
                            closeDropdown(); // Close dropdown
                          }}
                        >
                          <Settings className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-300" />
                          <span className="font-medium">Settings</span>
                        </Link>
                      </li>

                      <div className="divider my-2 border-white/5"></div>

                      <li>
                        <button
                          onClick={handleSignOut} // handleSignOut now calls closeDropdown
                          className="flex items-center space-x-3 px-6 py-3 w-full text-left hover:bg-gradient-to-r hover:from-red-600/10 hover:to-pink-600/10 text-red-400 hover:text-red-300 transition-all duration-300 group"
                        >
                          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </li>
                    </div>
                  </>
                ) : (
                  <li className="p-2">
                    <Link
                      href="/login"
                      className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                      onClick={() => {
                        showNotification("Please sign in to continue", "info");
                        closeDropdown(); // Close dropdown
                      }}
                    >
                      <User className="w-5 h-5" />
                      <span>Sign In</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </header>
  );
}
