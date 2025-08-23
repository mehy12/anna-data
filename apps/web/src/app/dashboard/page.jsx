import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Package, DollarSign, List } from "lucide-react";
import useUser from "@/utils/useUser";
import Navigation from "@/components/Navigation";

function MainComponent() {
  const { data: authUser, loading: userLoading } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch user profile
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      return data.user;
    },
    enabled: !!authUser,
  });

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      return response.json();
    },
    enabled: !!userProfile,
  });

  useEffect(() => {
    if (userProfile) {
      setCurrentUser(userProfile);
    }
  }, [userProfile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !authUser) {
      window.location.href = '/account/signin';
    }
  }, [authUser, userLoading]);

  // Redirect to onboarding if no profile
  useEffect(() => {
    if (authUser && userProfile === null) {
      window.location.href = '/account/signup';
    }
  }, [authUser, userProfile]);

  if (userLoading || !authUser || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const isFarmer = currentUser.role === 'farmer';
  const stats = dashboardData?.stats || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {isFarmer ? "Manage your crops and equipment" : "Explore the marketplace"}
          </p>
        </div>

        {isFarmer ? (
          // Farmer Dashboard
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings || '0.00'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <List className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalListings || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Net Profit</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.netProfit || '0.00'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Package className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Equipment Listed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.equipmentListings || 0}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Distributor Dashboard
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPurchases || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Equipment Rentals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRentals || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {isFarmer ? (
              <>
                <a
                  href="/add-crop"
                  className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                >
                  <Package className="h-6 w-6 mx-auto mb-2" />
                  <span className="block font-medium">Add New Crop</span>
                </a>
                <a
                  href="/add-equipment"
                  className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                >
                  <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                  <span className="block font-medium">List Equipment</span>
                </a>
                <a
                  href="/schemes"
                  className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
                >
                  <List className="h-6 w-6 mx-auto mb-2" />
                  <span className="block font-medium">View Schemes</span>
                </a>
                <a
                  href="/weather"
                  className="bg-yellow-600 text-white p-4 rounded-lg text-center hover:bg-yellow-700 transition-colors"
                >
                  <DollarSign className="h-6 w-6 mx-auto mb-2" />
                  <span className="block font-medium">Check Weather</span>
                </a>
              </>
            ) : (
              <>
                <a
                  href="/marketplace"
                  className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                >
                  <Package className="h-6 w-6 mx-auto mb-2" />
                  <span className="block font-medium">Browse Crops</span>
                </a>
                <a
                  href="/equipment-rentals"
                  className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                >
                  <TrendingUp className="h-6 w-6 mx-auto mb-2" />
                  <span className="block font-medium">Rent Equipment</span>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
