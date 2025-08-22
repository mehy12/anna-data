import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function MainComponent() {
  const { data: authUser, loading: authLoading } = useUser();
  const queryClient = useQueryClient();
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Check for signup callback with role data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const role = urlParams.get("role");
      const name = urlParams.get("name");
      const location = urlParams.get("location");

      if (role && name && location && authUser) {
        // Create user profile after signup
        createUserProfile({ role, name, location });
        // Clean URL
        window.history.replaceState({}, document.title, "/");
      }
    }
  }, [authUser]);

  // Fetch user profile
  const { data: profileData, isLoading: profileQueryLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      return data.user;
    },
    enabled: !!authUser,
  });

  // Create user profile mutation
  const createProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) throw new Error("Failed to create profile");
      return response.json();
    },
    onSuccess: (data) => {
      setUserProfile(data.user);
      queryClient.invalidateQueries(["userProfile"]);
    },
  });

  const createUserProfile = (data) => {
    createProfileMutation.mutate(data);
  };

  useEffect(() => {
    if (profileData) {
      setUserProfile(profileData);
    }
    setProfileLoading(false);
  }, [profileData]);

  // Loading states
  if (authLoading || profileQueryLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!authUser) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white font-sora mb-4">
              Anna-Data
            </h1>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter mb-6">
              Connecting farmers with distributors for fair trade and equipment
              sharing
            </p>
            <div className="space-y-3">
              <a
                href="/account/signin"
                className="block w-full py-3 px-4 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:scale-95 font-inter text-center"
              >
                Sign In
              </a>
              <a
                href="/account/signup"
                className="block w-full py-3 px-4 border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white font-semibold rounded-lg transition-all duration-150 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] active:scale-95 font-inter text-center"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User needs to complete profile
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
            <h2 className="text-2xl font-bold text-black dark:text-white font-sora mb-4">
              Complete Your Profile
            </h2>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter mb-6">
              Please sign up again to complete your profile setup.
            </p>
            <a
              href="/account/signup"
              className="inline-block py-3 px-6 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:scale-95 font-inter"
            >
              Complete Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Redirect based on role
  if (userProfile && userProfile.role === "farmer") {
    window.location.href = "/farmer/dashboard";
    return null;
  } else if (userProfile && userProfile.role === "buyer") {
    window.location.href = "/buyer/marketplace";
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
          Redirecting...
        </p>
      </div>
    </div>
  );
}

export default MainComponent;



