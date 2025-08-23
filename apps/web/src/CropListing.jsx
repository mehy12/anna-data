import React, { useState, useEffect } from 'react';

const CropListing = ({ user, onLogout, onNavigate }) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock mandi prices for demo
  const mandiPrices = {
    wheat: 1750,
    rice: 2200,
    corn: 1600,
    barley: 1500,
    soybean: 3500,
    cotton: 5200,
    sugarcane: 350,
    potato: 800,
    onion: 1200,
    tomato: 1500
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const response = await fetch('/server/crops', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCrops(data.crops);
      }
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMandiPrice = (cropName) => {
    const normalizedName = cropName.toLowerCase();
    return mandiPrices[normalizedName] || null;
  };

  const getPriceComparison = (askingPrice, mandiPrice) => {
    if (!mandiPrice) return null;
    const difference = askingPrice - mandiPrice;
    const percentage = ((difference / mandiPrice) * 100).toFixed(1);
    return { difference, percentage };
  };

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Anna-Data</h1>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('crops')}
              className="text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Marketplace
            </button>
            <button
              onClick={() => onNavigate('tractors')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Equipment Rentals
            </button>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {user.name} ({user.role})
              </span>
              <button
                onClick={onLogout}
                className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Crop Marketplace</h1>
          <p className="text-gray-600 mt-2">Browse available crops with transparent pricing</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        ) : crops.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No crops available</h3>
            <p className="text-gray-600">Check back later for new crop listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop) => {
              const mandiPrice = getMandiPrice(crop.name);
              const comparison = mandiPrice ? getPriceComparison(crop.asking_price, mandiPrice) : null;

              return (
                <div key={crop.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                        <p className="text-sm text-gray-600">by {crop.farmer_name}</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg">
                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-medium">{crop.quantity?.toLocaleString()} kg</span>
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
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm">{crop.location}</span>
                        </div>
                      )}
                    </div>

                    {crop.description && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{crop.description}</p>
                    )}

                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                        Contact Farmer
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </button>
                    </div>

                    {comparison && (
                      <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                        {comparison.difference >= 0 
                          ? `₹${Math.abs(comparison.difference)} above mandi price`
                          : `₹${Math.abs(comparison.difference)} below mandi price`
                        }
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropListing;