import { FileText, ExternalLink, Calendar, DollarSign } from "lucide-react";

export default function Schemes() {
  const schemes = [
    {
      id: 1,
      title: "PM-KISAN (Prime Minister Farmers Income Support)",
      description: "Direct income support of ₹6,000 per year to all farmer families across the country.",
      category: "Income Support",
      amount: "₹6,000/year",
      eligibility: "All landholding farmer families",
      status: "Active",
      link: "https://pmkisan.gov.in/",
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme providing financial support to farmers suffering crop loss/damage.",
      category: "Insurance",
      amount: "Up to ₹2 lakh",
      eligibility: "All farmers growing notified crops",
      status: "Active",
      link: "https://pmfby.gov.in/",
    },
    {
      id: 3,
      title: "Kisan Credit Card (KCC)",
      description: "Credit support for agriculture and allied activities including crop cultivation.",
      category: "Credit",
      amount: "Based on crop pattern",
      eligibility: "Farmers with land ownership documents",
      status: "Active",
      link: "https://www.pmkisan.gov.in/Rpt_BeneficiaryStatus_pub.aspx",
    },
    {
      id: 4,
      title: "PM-KUSUM (Solar Agriculture Scheme)",
      description: "Support for installation of solar pumps and grid connected solar power plants.",
      category: "Energy",
      amount: "60% subsidy",
      eligibility: "Individual farmers, FPOs, cooperatives",
      status: "Active",
      link: "https://pmkusum.mnre.gov.in/",
    },
    {
      id: 5,
      title: "National Agriculture Market (e-NAM)",
      description: "Online trading platform for agricultural commodities to get better prices.",
      category: "Marketing",
      amount: "Platform access",
      eligibility: "All farmers with produce",
      status: "Active",
      link: "https://enam.gov.in/",
    },
    {
      id: 6,
      title: "Soil Health Card Scheme",
      description: "Free soil testing and nutrient management recommendations for farmers.",
      category: "Advisory",
      amount: "Free testing",
      eligibility: "All farmers",
      status: "Active",
      link: "https://soilhealth.dac.gov.in/",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      "Income Support": "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      "Insurance": "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
      "Credit": "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
      "Energy": "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      "Marketing": "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800",
      "Advisory": "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
    };
    return colors[category] || "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora mb-2">
          Government Schemes
        </h2>
        <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
          Explore government schemes and support programs available for farmers
        </p>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6 hover:border-[#D1D5DB] dark:hover:border-[#505050] transition-all duration-150"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-[#0EA5E9]" />
                </div>
                <div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(scheme.category)}`}>
                    {scheme.category}
                  </span>
                </div>
              </div>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                {scheme.status}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-black dark:text-white font-sora mb-3 leading-tight">
              {scheme.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter mb-4 leading-relaxed">
              {scheme.description}
            </p>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-[#22C55E]" />
                <span className="text-sm font-medium text-black dark:text-white font-inter">
                  {scheme.amount}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={16} className="text-[#0EA5E9] mt-0.5" />
                <span className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                  Eligibility: {scheme.eligibility}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] dark:bg-[#1E293B] text-[#0EA5E9] dark:text-[#60A5FA] rounded-lg border border-[#D1D5DB] dark:border-[#404040] hover:bg-[#E0F2FE] dark:hover:bg-[#1E293B] transition-all duration-150 text-sm font-medium font-inter"
            >
              Learn More
              <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white font-sora mb-3">
          Need Help with Applications?
        </h3>
        <p className="text-[#666666] dark:text-[#AAAAAA] font-inter mb-4">
          Visit your nearest Common Service Center (CSC) or Agricultural Extension Officer for assistance with scheme applications and eligibility verification.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg">
            <h4 className="font-medium text-sm text-black dark:text-white font-inter mb-2">
              📞 Helpline Numbers
            </h4>
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
              PM-KISAN: 155261 / 011-24300606<br />
              PMFBY: 14447
            </p>
          </div>
          <div className="p-4 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg">
            <h4 className="font-medium text-sm text-black dark:text-white font-inter mb-2">
              🌐 Official Portals
            </h4>
            <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
              farmer.gov.in<br />
              agricoop.nic.in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


