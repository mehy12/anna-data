import { useState } from "react";
import { Package, Wrench, DollarSign, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function FarmerDashboard({ userProfile }) {
  // Fetch farmer's crops
  const { data: cropsData } = useQuery({
    queryKey: ['farmerCrops'],
    queryFn: async () => {
      const response = await fetch('/api/crops?farmer_only=true');
      if (!response.ok) throw new Error('Failed to fetch crops');
      const data = await response.json();
      return data.crops || [];
    },
  });

  // Fetch farmer's equipment
  const { data: equipmentData } = useQuery({
    queryKey: ['farmerEquipment'],
    queryFn: async () => {
      const response = await fetch('/api/equipment?owner_only=true');
      if (!response.ok) throw new Error('Failed to fetch equipment');
      const data = await response.json();
      return data.equipment || [];
    },
  });

  const crops = cropsData || [];
  const equipment = equipmentData || [];

  // Calculate mock earnings and stats
  const totalCrops = crops.length;
  const totalEquipment = equipment.length;
  const totalListings = totalCrops + totalEquipment;

  // Mock earnings calculation
  const mockEarnings = crops.reduce((total, crop) => {
    return total + (crop.quantity_kg * crop.price_per_kg * 0.15); // 15% of listed value as mock sales
  }, 0) + equipment.reduce((total, eq) => {
    return total + ((eq.price_per_day || 0) * 5); // Mock 5 days rental per month
  }, 0);

  const mockCosts = mockEarnings * 0.3; // 30% costs
  const netProfit = mockEarnings - mockCosts;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora mb-2">
          Welcome back, {userProfile.name}!
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
          Here's your farming business overview for this month.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Earnings Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-[#0EA5E9]" />
            </div>
            <h3 className="font-semibold text-[#2B2B2B] dark:text-white font-inter">
              Earnings
            </h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora">
              ₹{mockEarnings.toLocaleString()}
            </span>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
              <TrendingUp size={14} />
              <span className="font-medium">+12%</span>
            </div>
          </div>
          <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
            vs last month
          </p>
        </div>

        {/* Items Listed Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F0FDF4] dark:bg-[#1A2E1A] rounded-lg flex items-center justify-center">
              <Package size={20} className="text-[#22C55E]" />
            </div>
            <h3 className="font-semibold text-[#2B2B2B] dark:text-white font-inter">
              Items Listed
            </h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora">
              {totalListings}
            </span>
            <span className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
              items
            </span>
          </div>
          <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
            {totalCrops} crops, {totalEquipment} equipment
          </p>
        </div>

        {/* Net Profit Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FEF3F2] dark:bg-[#2E1A1A] rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-[#EF4444]" />
            </div>
            <h3 className="font-semibold text-[#2B2B2B] dark:text-white font-inter">
              Net Profit
            </h3>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora">
              ₹{netProfit.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
            Earnings - Costs
          </p>
        </div>
      </div>

      {/* Recent Listings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Crops */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white font-sora">
              My Crops
            </h3>
            <span className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
              {totalCrops} listed
            </span>
          </div>
          
          <div className="space-y-3">
            {crops.slice(0, 3).map((crop) => (
              <div
                key={crop.id}
                className="flex items-center justify-between p-3 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-sm text-black dark:text-white font-inter">
                    {crop.crop_name}
                  </h4>
                  <p className="text-xs text-[#666666] dark:text-[#AAAAAA] font-inter">
                    {crop.quantity_kg} kg
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-black dark:text-white font-inter">
                    ₹{crop.price_per_kg}/kg
                  </p>
                  <p className="text-xs text-[#22C55E] dark:text-[#40D677] font-inter">
                    {crop.is_sold ? 'Sold' : 'Available'}
                  </p>
                </div>
              </div>
            ))}
            
            {totalCrops === 0 && (
              <div className="text-center py-6">
                <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
                  No crops listed yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* My Equipment */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black dark:text-white font-sora">
              My Equipment
            </h3>
            <span className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
              {totalEquipment} listed
            </span>
          </div>
          
          <div className="space-y-3">
            {equipment.slice(0, 3).map((eq) => (
              <div
                key={eq.id}
                className="flex items-center justify-between p-3 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-sm text-black dark:text-white font-inter">
                    {eq.equipment_name}
                  </h4>
                  <p className="text-xs text-[#666666] dark:text-[#AAAAAA] font-inter">
                    {eq.equipment_type}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-black dark:text-white font-inter">
                    {eq.listing_type === 'rent' && eq.price_per_day && `₹${eq.price_per_day}/day`}
                    {eq.listing_type === 'sale' && eq.sale_price && `₹${eq.sale_price.toLocaleString()}`}
                    {eq.listing_type === 'both' && (
                      <>₹{eq.price_per_day}/day</>
                    )}
                  </p>
                  <p className="text-xs text-[#0EA5E9] dark:text-[#60A5FA] font-inter capitalize">
                    {eq.listing_type}
                  </p>
                </div>
              </div>
            ))}
            
            {totalEquipment === 0 && (
              <div className="text-center py-6">
                <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
                  No equipment listed yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


