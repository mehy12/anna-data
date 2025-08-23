import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import useUser from "@/utils/useUser";
import BuyerSidebar from "@/components/BuyerSidebar";
import { useQuery } from "@tanstack/react-query";

// Import buyer components
import Marketplace from "@/components/buyer/Marketplace";
import EquipmentListings from "@/components/buyer/EquipmentListings";

function MainComponent() {
  const { data: authUser, loading: authLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Marketplace");
  const [userProfile, setUserProfile] = useState(null);

  // Fetch user profile
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      return data.user;
    },
    enabled: !!authUser,
  });

  useEffect(() => {
    if (profileData) {
      setUserProfile(profileData);
    }
  }, [profileData]);

  // Check authentication and role
  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authUser) {
    window.location.href = '/account/signin';
    return null;
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
            <h2 className="text-2xl font-bold text-black dark:text-white font-sora mb-4">
              Access Denied
            </h2>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter mb-6">
              Please complete your profile setup.
            </p>
            <a
              href="/"
              className="inline-block py-3 px-6 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:scale-95 font-inter"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (userProfile.role !== 'buyer') {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
            <h2 className="text-2xl font-bold text-black dark:text-white font-sora mb-4">
              Access Denied
            </h2>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter mb-6">
              This page is only accessible to buyers.
            </p>
            <a
              href="/"
              className="inline-block py-3 px-6 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:scale-95 font-inter"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "Marketplace":
        return <Marketplace />;
      case "Equipment":
        return <EquipmentListings />;
      default:
        return <Marketplace />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <BuyerSidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-16 bg-[#F3F3F3] dark:bg-[#1A1A1A] flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          {/* Left side - Mobile menu button and page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg transition-all duration-150 hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] active:bg-[#EEEEEE] dark:active:bg-[#2A2A2A] active:scale-95"
            >
              <Menu size={20} className="text-[#4B4B4B] dark:text-[#B0B0B0]" />
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight font-sora">
              {currentPage}
            </h1>
          </div>

          {/* Right side - User info */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-medium text-sm text-black dark:text-white font-inter">
                {userProfile.name}
              </p>
              <p className="text-xs text-[#666666] dark:text-[#AAAAAA] font-inter">
                {userProfile.location}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#FEF3F2] dark:bg-[#2E1A1A] rounded-full flex items-center justify-center border border-[#D1D5DB] dark:border-[#404040]">
              <span className="text-lg">🏪</span>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
