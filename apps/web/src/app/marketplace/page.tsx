import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package, MapPin, ArrowLeft } from "lucide-react";
import useUser from "@/utils/useUser"; // You should rename this to useUser.ts
import Navigation from "@/components/Navigation"; // You should rename this to Navigation.tsx

// Define the structure (type) of our data
interface UserProfile {
  id: string;
  name: string;
  email: string;
  // Add any other user properties you expect from your API
}

interface Crop {
  id: string | number;
  name: string;
  farmer_name: string;
  quantity: number;
  asking_price: number;
  location?: string; // The '?' makes this property optional
  description?: string; // Optional
}

// Define the type for the mandi prices object
type MandiPrices = {
  [key: string]: number;
};

// Mock mandi prices for demo with the new type
const mandiPrices: MandiPrices = {
  wheat: 1750,
  rice: 2200,
  corn: 1600,
  barley: 1500,
  soybean: 3500,
  cotton: 5200,
  sugarcane: 350,
  potato: 800,
  onion: 1200,
  tomato: 1500,
};

function MarketplacePage() {
  const { data: authUser, loading: userLoading } = useUser();
  // Add a type to the currentUser state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Fetch user profile with types for useQuery
  const { data: userProfile } = useQuery<UserProfile, Error>({
    queryKey: ['user-profile'],
    queryFn: async (): Promise<UserProfile> => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      return data.user;
    },
    enabled: !!authUser,
  });

  // Fetch crops with types for useQuery
  const { data: cropsData, isLoading: cropsLoading } = useQuery<{ crops: Crop[] }, Error>({
    queryKey: ['marketplace-crops'],
    queryFn: async (): Promise<{ crops: Crop[] }> => {
      const response = await fetch('/api/crops');
      if (!response.ok) {
        throw new Error('Failed to fetch crops');
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

  // Add a type to the cropName parameter
  const getMandiPrice = (cropName: string): number | null => {
    const normalizedName = cropName.toLowerCase();
    return mandiPrices[normalizedName] || null;
  };

  // Add types to the price parameters
  const getPriceComparison = (askingPrice: number, mandiPrice: number | null) => {
    if (mandiPrice === null) return null;
    const difference = askingPrice - mandiPrice;
    const percentage = ((difference / mandiPrice) * 100).toFixed(1);
    return { difference, percentage };
  };

  if (userLoading || !authUser || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // The 'crops' variable is now correctly typed as an array of Crop objects
  const crops: Crop[] = cropsData?.crops || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentUser={currentUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <a
            href="/dashboard"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </a>
          <h1 className="text-3xl font-bold text-gray-900">Crop Marketplace</h1>
          <p className="text-gray-600 mt-2">Browse available crops with transparent pricing</p>
        </div>

        {cropsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : crops.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No crops available</h3>
            <p className="text-gray-600">Check back later for new crop listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* The 'crop' parameter is now automatically typed as a Crop object */}
            {crops.map((crop) => {
              const mandiPrice = getMandiPrice(crop.name);
              const comparison = getPriceComparison(crop.asking_price, mandiPrice);

              return (
                <div key={crop.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  {/* ... rest of your JSX remains the same ... */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                        <p className="text-sm text-gray-600">by {crop.farmer_name}</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Package className="h-5 w-5 text-green-600" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{crop.quantity.toLocaleString()} kg</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Asking Price:</span>
                        <span className="font-bold text-lg text-green-600">₹{crop.asking_price}/kg</span>
                      </div>

                      {mandiPrice && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mandi Price:</span>
                          <span className="font-medium">₹{mandiPrice}/kg</span>
                        </div>
                      )}

                      {comparison && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price Difference:</span>
                          <span className={`font-medium ${comparison.difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {comparison.difference >= 0 ? '+' : ''}₹{comparison.difference} ({comparison.percentage}%)
                          </span>
                        </div>
                      )}

                      {crop.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{crop.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketplacePage;
