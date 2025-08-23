import { Users, Target, Eye, Heart, Shield, Award } from "lucide-react";

function MainComponent() {
  const features = [
    {
      icon: Heart,
      title: "Farmer-First Approach",
      description: "Our platform prioritizes farmers' welfare by connecting them directly with buyers, eliminating middlemen and ensuring fair prices."
    },
    {
      icon: Shield,
      title: "Transparent Pricing",
      description: "Real-time mandi price comparisons help farmers make informed pricing decisions and buyers understand market rates."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Creating a trusted ecosystem where farmers and distributors can build long-term relationships based on mutual respect."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Verified buyer badges and farmer profiles ensure trust and quality in every transaction on our platform."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Farmers Connected" },
    { number: "5,000+", label: "Successful Trades" },
    { number: "₹50Cr+", label: "Trade Volume" },
    { number: "500+", label: "Cities Covered" }
  ];

  const team = [
    {
      name: "Meesam  Hyder",
      role: "Founder & CEO",
      bio: "Former farmer turned tech entrepreneur, passionate about agricultural transformation.",
      image: "👨‍🌾"
    },
    {
      name: "Aaliya Viquas",
      role: "Head of Operations",
      bio: "Agricultural economist with 15+ years of experience in rural development.",
      image: "👩‍💼"
    },
    {
      name: "Bipen Goswami",
      role: "Chief Technology Officer",
      bio: "IIT graduate specializing in agricultural technology and digital platforms.",
      image: "👨‍💻"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] border-b border-[#E9E9E9] dark:border-[#333333]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌾</span>
              <h1 className="text-2xl font-bold text-black dark:text-white font-sora">
                Anna-Data
              </h1>
            </div>
            <a
              href="/"
              className="py-2 px-4 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0284C7] transition-colors font-inter font-medium"
            >
              Back to Platform
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white font-sora">
              Empowering <span className="text-[#0EA5E9]">Farmers</span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white font-sora">
              Connecting <span className="text-[#22C55E]">Communities</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-[#666666] dark:text-[#AAAAAA] font-inter max-w-3xl mx-auto leading-relaxed">
            Anna-Data is transforming agriculture by creating a transparent, fair, and efficient marketplace 
            that directly connects farmers with distributors, eliminating middlemen and ensuring everyone prospers.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg flex items-center justify-center">
                <Target size={24} className="text-[#0EA5E9]" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white font-sora">Our Mission</h3>
            </div>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter leading-relaxed">
              To create a farmer-first ecosystem that empowers agricultural communities through transparent 
              pricing, direct market access, and technology-driven solutions. We believe in fair trade, 
              sustainable agriculture, and building lasting relationships between farmers and buyers.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#F0FDF4] dark:bg-[#1A2E1A] rounded-lg flex items-center justify-center">
                <Eye size={24} className="text-[#22C55E]" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white font-sora">Our Vision</h3>
            </div>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter leading-relaxed">
              To become India's leading agricultural marketplace where farmers have complete control over 
              their produce pricing, access to modern equipment, and the tools they need to thrive. 
              We envision a future where technology bridges the gap between rural farming and urban markets.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black dark:text-white font-sora mb-4">
              Why Choose Anna-Data?
            </h3>
            <p className="text-lg text-[#666666] dark:text-[#AAAAAA] font-inter max-w-2xl mx-auto">
              Our platform offers unique features designed specifically for the agricultural community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6 hover:border-[#D1D5DB] dark:hover:border-[#505050] transition-all duration-150"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-[#0EA5E9]" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-black dark:text-white font-sora mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-[#666666] dark:text-[#AAAAAA] font-inter leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white font-sora mb-4">
              Our Impact
            </h3>
            <p className="text-lg text-white/90 font-inter max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming agriculture
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white font-sora mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 font-inter">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Badge Information */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#F0F9FF] dark:bg-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-[#0EA5E9]" />
            </div>
            <h3 className="text-2xl font-bold text-black dark:text-white font-sora mb-4">
              Verified Buyer Badge Program
            </h3>
            <p className="text-lg text-[#666666] dark:text-[#AAAAAA] font-inter max-w-3xl mx-auto leading-relaxed">
              To ensure trust and transparency in our marketplace, we offer a verified badge system for buyers. 
              Buyers who complete our verification process with Aadhaar number and business documents receive 
              a <span className="text-[#22C55E] font-medium">✅ Verified Badge</span>, giving farmers confidence 
              in their transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg">
              <div className="text-3xl mb-3">📝</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">Document Verification</h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Aadhaar verification and business license validation
              </p>
            </div>
            
            <div className="text-center p-6 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">Trust & Safety</h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Enhanced security for all marketplace transactions
              </p>
            </div>
            
            <div className="text-center p-6 bg-[#F9FAFB] dark:bg-[#262626] rounded-lg">
              <div className="text-3xl mb-3">⭐</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">Premium Access</h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Priority support and advanced marketplace features
              </p>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black dark:text-white font-sora mb-4">
              The Future of Anna-Data
            </h3>
            <p className="text-lg text-[#666666] dark:text-[#AAAAAA] font-inter max-w-3xl mx-auto leading-relaxed">
              We're building towards becoming a comprehensive one-stop hub for farmers, 
              integrating everything they need to succeed in modern agriculture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-[#E4E4E4] dark:border-[#404040] rounded-lg">
              <div className="text-2xl mb-3">🌐</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">
                Global Marketplace
              </h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Expanding beyond India to connect farmers worldwide with international buyers
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E4] dark:border-[#404040] rounded-lg">
              <div className="text-2xl mb-3">🤖</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">
                AI-Powered Insights
              </h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Smart recommendations for crop selection, pricing, and market timing
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E4] dark:border-[#404040] rounded-lg">
              <div className="text-2xl mb-3">🏦</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">
                Financial Services
              </h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Integrated lending, insurance, and payment solutions for farmers
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E4] dark:border-[#404040] rounded-lg">
              <div className="text-2xl mb-3">📱</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">
                Mobile-First Experience
              </h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Comprehensive mobile app with offline capabilities for rural areas
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E4] dark:border-[#404040] rounded-lg">
              <div className="text-2xl mb-3">🎓</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">
                Education Platform
              </h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Training programs on modern farming techniques and technology adoption
              </p>
            </div>

            <div className="p-6 border border-[#E4E4E4] dark:border-[#404040] rounded-lg">
              <div className="text-2xl mb-3">🌱</div>
              <h4 className="font-semibold text-black dark:text-white font-sora mb-2">
                Sustainability Focus
              </h4>
              <p className="text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
                Carbon tracking, organic certification, and environmental impact monitoring
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-8">
          <h3 className="text-2xl font-bold text-black dark:text-white font-sora mb-4">
            Join the Agricultural Revolution
          </h3>
          <p className="text-lg text-[#666666] dark:text-[#AAAAAA] font-inter mb-6 max-w-2xl mx-auto">
            Whether you're a farmer looking to get fair prices for your crops or a buyer seeking 
            quality produce directly from farmers, Anna-Data is your trusted partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/account/signup"
              className="py-3 px-6 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:scale-95 font-inter"
            >
              Get Started Today
            </a>
            <a
              href="mailto:support@anna-data.com"
              className="py-3 px-6 border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white font-semibold rounded-lg transition-all duration-150 hover:bg-[#F9FAFB] dark:hover:bg-[#2A2A2A] active:scale-95 font-inter"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white dark:bg-[#1E1E1E] border-t border-[#E9E9E9] dark:border-[#333333] py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
            © 2024 Anna-Data. Empowering farmers, connecting communities, transforming agriculture.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;


