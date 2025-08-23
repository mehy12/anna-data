import { useState } from "react";
import {
  ShoppingBag,
  Wrench,
  LogOut,
  X,
} from "lucide-react";

export default function BuyerSidebar({ currentPage, onPageChange, onClose }) {
  const [activeItem, setActiveItem] = useState(currentPage);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    onPageChange(itemName);

    if (onClose && typeof window !== "undefined" && window.innerWidth < 1024) {
      onClose();
    }
  };

  const navigationItems = [
    { name: "Marketplace", icon: ShoppingBag, hasSubmenu: false },
    { name: "Equipment", icon: Wrench, hasSubmenu: false },
  ];

  return (
    <div className="w-60 bg-[#F3F3F3] dark:bg-[#1A1A1A] flex-shrink-0 flex flex-col h-full">

      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white dark:bg-[#262626] rounded-full border border-[#E4E4E4] dark:border-[#404040] flex items-center justify-center">
            <span className="text-lg">🏪</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm text-black dark:text-white font-sora">
              Anna-Data
            </h2>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] font-inter">
              Buyer
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-[#F5F5F5] dark:hover:bg-[#2A2A2A]"
          >
            <X size={20} className="text-[#666666] dark:text-[#AAAAAA]" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleItemClick(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white dark:bg-[#262626] border border-[#E4E4E4] dark:border-[#404040] text-black dark:text-white"
                    : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 active:bg-white/70 dark:active:bg-white/15 active:scale-[0.98]"
                }`}
              >
                <Icon
                  size={20}
                  className={
                    isActive
                      ? "text-black dark:text-white"
                      : "text-black/70 dark:text-white/70"
                  }
                />
                <span
                  className={`font-medium text-sm font-inter ${
                    isActive
                      ? "text-black dark:text-white"
                      : "text-black/70 dark:text-white/70"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-[#E4E4E4] dark:border-[#404040]">
        <a
          href="/account/logout"
          className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm font-inter">Sign Out</span>
        </a>
      </div>
    </div>
  );
}
