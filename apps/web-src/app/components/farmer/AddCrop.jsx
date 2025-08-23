import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddCrop({ userProfile }) {
  const [formData, setFormData] = useState({
    crop_name: "",
    quantity_kg: "",
    price_per_kg: "",
    location: userProfile?.location || "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const createCropMutation = useMutation({
    mutationFn: async (cropData) => {
      const response = await fetch('/api/crops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cropData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create crop');
      }
      return response.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setError(null);
      setFormData({
        crop_name: "",
        quantity_kg: "",
        price_per_kg: "",
        location: userProfile?.location || "",
      });
      queryClient.invalidateQueries(['farmerCrops']);
      
      setTimeout(() => setSuccess(false), 3000);
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.crop_name || !formData.quantity_kg || !formData.price_per_kg || !formData.location) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(formData.quantity_kg) || formData.quantity_kg <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (isNaN(formData.price_per_kg) || formData.price_per_kg <= 0) {
      setError('Please enter a valid price');
      return;
    }

    createCropMutation.mutate({
      ...formData,
      quantity_kg: parseInt(formData.quantity_kg),
      price_per_kg: parseFloat(formData.price_per_kg),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const cropOptions = [
    "Wheat", "Rice", "Cotton", "Sugarcane", "Corn", "Barley", "Oats", 
    "Soybean", "Sunflower", "Mustard", "Groundnut", "Jowar", "Bajra", 
    "Ragi", "Tur", "Moong", "Chana", "Masoor", "Urad", "Tomato", 
    "Onion", "Potato", "Cabbage", "Cauliflower", "Carrot", "Peas"
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black dark:text-white font-sora mb-2">
            List Your Crop
          </h2>
          <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
            Add your crop to the marketplace to connect with buyers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white font-inter">
              Crop Name
            </label>
            <select
              name="crop_name"
              value={formData.crop_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white font-inter transition-all duration-150 focus:border-[#0EA5E9] dark:focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none"
            >
              <option value="">Select a crop</option>
              {cropOptions.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white font-inter">
              Quantity (kg)
            </label>
            <input
              type="number"
              name="quantity_kg"
              value={formData.quantity_kg}
              onChange={handleChange}
              placeholder="Enter quantity in kilograms"
              min="1"
              className="w-full px-4 py-3 rounded-lg border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white placeholder-[#666666] dark:placeholder-[#AAAAAA] font-inter transition-all duration-150 focus:border-[#0EA5E9] dark:focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white font-inter">
              Price per kg (₹)
            </label>
            <input
              type="number"
              name="price_per_kg"
              value={formData.price_per_kg}
              onChange={handleChange}
              placeholder="Enter price per kilogram"
              min="0.01"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white placeholder-[#666666] dark:placeholder-[#AAAAAA] font-inter transition-all duration-150 focus:border-[#0EA5E9] dark:focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white font-inter">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              className="w-full px-4 py-3 rounded-lg border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white placeholder-[#666666] dark:placeholder-[#AAAAAA] font-inter transition-all duration-150 focus:border-[#0EA5E9] dark:focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-inter">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-inter">
              Crop listed successfully! It's now available in the marketplace.
            </div>
          )}

          <button
            type="submit"
            disabled={createCropMutation.isPending}
            className="w-full py-3 px-4 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:from-[#1a1a1a] active:to-[#000000] dark:active:from-[#E0E0E0] dark:active:to-[#C0C0C0] active:scale-95 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createCropMutation.isPending ? "Adding Crop..." : "List Crop"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg border border-[#D1D5DB] dark:border-[#404040]">
          <h4 className="font-medium text-sm text-black dark:text-white font-inter mb-2">
            Tips for listing your crop:
          </h4>
          <ul className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter space-y-1">
            <li>• Check current market prices before setting your rate</li>
            <li>• Ensure accurate quantity and quality information</li>
            <li>• Provide clear location details for buyers</li>
            <li>• Update availability if crop gets sold</li>
          </ul>
        </div>
      </div>
    </div>
  );
}


