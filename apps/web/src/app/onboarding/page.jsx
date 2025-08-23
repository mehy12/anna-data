import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";

function MainComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: authUser } = useUser();

  useEffect(() => {
    if (!authUser) {
      window.location.href = "/account/signin";
      return;
    }

    const completeOnboarding = async () => {
      setLoading(true);
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get("name");
        const role = urlParams.get("role");
        const location = urlParams.get("location");

        if (!name || !role) {
          setError("Missing required information");
          return;
        }

        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, role, location }),
        });

        if (!response.ok) {
          throw new Error("Failed to complete onboarding");
        }

        window.location.href = "/dashboard";
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    completeOnboarding();
  }, [authUser]);

  if (!authUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Setting up your account...
        </h1>
        <p className="text-gray-600">
          Please wait while we complete your registration.
        </p>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;
