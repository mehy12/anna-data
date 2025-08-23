import { Sprout, Home, Plus, BarChart3, FileText, Cloud, LogOut } from "lucide-react";
import useUser from "@/utils/useUser";

function Navigation({ currentUser }) {
  const isDistributor = currentUser?.role === 'distributor';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Anna-Data</h1>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </a>

            {!isDistributor && (
              <>
                <a
                  href="/add-crop"
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Crop
                </a>
                <a
                  href="/add-equipment"
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Equipment
                </a>
                <a
                  href="/schemes"
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Schemes
                </a>
                <a
                  href="/weather"
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Cloud className="h-4 w-4 mr-2" />
                  Weather
                </a>
              </>
            )}

            {isDistributor && (
              <>
                <a
                  href="/marketplace"
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Marketplace
                </a>
                <a
                  href="/equipment-rentals"
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Equipment Rentals
                </a>
              </>
            )}

            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {currentUser?.name} ({currentUser?.role})
              </span>
              <a
                href="/account/logout"
                className="flex items-center text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
