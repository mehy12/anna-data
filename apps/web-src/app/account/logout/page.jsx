import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6 md:p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora mb-4">
            Sign Out
          </h1>
          <p className="text-[#666666] dark:text-[#AAAAAA] font-inter mb-6">
            Are you sure you want to sign out?
          </p>

          <button
            onClick={handleSignOut}
            className="w-full py-3 px-4 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:from-[#1a1a1a] active:to-[#000000] dark:active:from-[#E0E0E0] dark:active:to-[#C0C0C0] active:scale-95 font-inter"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
