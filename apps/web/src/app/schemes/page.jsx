import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FileText, ArrowLeft, ExternalLink, DollarSign, Users, Calendar } from "lucide-react";
import useUser from "@/utils/useUser";
import Navigation from "@/components/Navigation";

// Mock government schemes data
const governmentSchemes = [
  {
    id: 1,
    title: "PM-KISAN Scheme",
    description: "Direct income support of ₹6,000 per year to small and marginal farmers",
    eligibility: "Small and marginal farmers with landholding up to 2 hectares",
    benefits: "₹2,000 per installment, 3 times a year",
    applicationProcess: "Online application through PM-KISAN portal",
    documents: ["Aadhaar Card", "Bank Account Details", "Land Records"],
    category: "Income Support",
    status: "Active"
  },
  {
    id: 2,
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description: "Crop insurance scheme providing financial support to farmers in case of crop loss",
    eligibility: "All farmers including sharecroppers and tenant farmers",
    benefits: "Up to ₹2 lakh insurance coverage per farmer",
    applicationProcess: "Through banks, CSCs, or insurance companies",
    documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate"],
    category: "Insurance",
    status: "Active"
  },
  {
    id: 3,
    title: "Kisan Credit Card (KCC)",
    description: "Credit facility for farmers to meet their agricultural and allied activities",
    eligibility: "All farmers including tenant farmers, oral lessees, and sharecroppers",
    benefits: "Credit limit up to ₹3 lakh at 4% interest rate",
    applicationProcess: "Apply through banks or cooperative societies",
    documents: ["Identity Proof", "Address Proof", "Land Documents"],
    category: "Credit",
    status: "Active"
  },
  {
    id: 4,
    title: "Soil Health Card Scheme",
    description: "Provides soil health cards to farmers with recommendations for appropriate nutrients",
    eligibility: "All farmers across the country",
    benefits: "Free soil testing and nutrient recommendations",
    applicationProcess: "Contact local agriculture department",
    documents: ["Land Records", "Identity Proof"],
    category: "Soil Health",
    status: "Active"
  },
  {
    id: 5,
    title: "National Agriculture Market (e-NAM)",
    description: "Online trading platform for agricultural commodities",
    eligibility: "All farmers and traders",
    benefits: "Better price discovery and transparent trading",
    applicationProcess: "Register on e-NAM portal",
    documents: ["Aadhaar Card", "Bank Account Details"],
    category: "Marketing",
    status: "Active"
  },
  {
    id: 6,
    title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    description: "Irrigation scheme to enhance water use efficiency in agriculture",
    eligibility: "All farmers with focus on small and marginal farmers",
    benefits: "Subsidy for drip and sprinkler irrigation systems",
    applicationProcess: "Through state agriculture departments",
    documents: ["Land Records", "Water Source Certificate", "Project Report"],
    category: "Irrigation",
    status: "Active"
  }
];

function MainComponent() {
  const { data: authUser, loading: userLoading } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Redirect if not farmer
  useEffect(() => {
    if (currentUser && currentUser.role !== 'farmer') {
      window.location.href = '/dashboard';
    }
  }, [currentUser]);

  if (userLoading || !authUser || !currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const categories = ["All", ...new Set(governmentSchemes.map(scheme => scheme.category))];
  const filteredSchemes = selectedCategory === "All" 
    ? governmentSchemes 
    : governmentSchemes.filter(scheme => scheme.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Income Support": return <DollarSign className="h-5 w-5" />;
      case "Insurance": return <Users className="h-5 w-5" />;
      case "Credit": return <DollarSign className="h-5 w-5" />;
      case "Marketing": return <ExternalLink className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Income Support": return "bg-green-100 text-green-800";
      case "Insurance": return "bg-blue-100 text-blue-800";
      case "Credit": return "bg-yellow-100 text-yellow-800";
      case "Marketing": return "bg-purple-100 text-purple-800";
      case "Irrigation": return "bg-cyan-100 text-cyan-800";
      case "Soil Health": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Government Schemes</h1>
          <p className="text-gray-600 mt-2">Explore agricultural schemes and benefits available to farmers</p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                        {getCategoryIcon(scheme.category)}
                        <span className="ml-1">{scheme.category}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Benefits:</h4>
                    <p className="text-sm text-gray-600">{scheme.benefits}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Eligibility:</h4>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Required Documents:</h4>
                    <div className="flex flex-wrap gap-1">
                      {scheme.documents.map((doc, index) => (
                        <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Application Process:</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      scheme.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {scheme.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{scheme.applicationProcess}</p>
                  
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
            <p className="text-gray-600">Try selecting a different category.</p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Contact your local agriculture department or visit the nearest Common Service Center (CSC) for assistance with scheme applications.
              </p>
              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Find CSC Near Me
                </button>
                <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
