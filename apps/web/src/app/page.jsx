import { Sprout, Users, TrendingUp, Shield } from "lucide-react";

function MainComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Sprout className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Anna-Data</h1>
            </div>
            <div className="flex space-x-4">
              <a
                href="/account/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </a>
              <a
                href="/account/signup"
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connecting Farmers & Distributors
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Anna-Data bridges the gap between farmers and distributors, ensuring fair pricing, 
            equipment sharing, and transparent agricultural trade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/account/signup"
              className="bg-green-600 text-white hover:bg-green-700 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Join as Farmer
            </a>
            <a
              href="/account/signup"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Join as Distributor
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Empowering Agricultural Trade
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to buy, sell, and share in agriculture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Crop Marketplace</h3>
              <p className="text-gray-600">
                List and discover crops with transparent pricing and mandi rates
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Equipment Sharing</h3>
              <p className="text-gray-600">
                Rent and share agricultural equipment to reduce costs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fair Pricing</h3>
              <p className="text-gray-600">
                Compare asking prices with mandi rates for informed decisions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Government Schemes</h3>
              <p className="text-gray-600">
                Access information about agricultural schemes and benefits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of farmers and distributors already using Anna-Data
          </p>
          <a
            href="/account/signup"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium"
          >
            Get Started Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="h-6 w-6 text-green-400 mr-2" />
            <span className="text-xl font-bold">Anna-Data</span>
          </div>
          <p className="text-gray-400">
            Connecting farmers and distributors for a better agricultural future
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;