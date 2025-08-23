import { useState } from "react";
import useAuth from "@/utils/useAuth";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin:
          "Couldn't start sign-in. Please try again or use a different method.",
        OAuthCallback: "Sign-in failed after redirecting. Please try again.",
        OAuthCreateAccount:
          "Couldn't create an account with this sign-in method. Try another option.",
        EmailCreateAccount:
          "This email can't be used to create an account. It may already exist.",
        Callback: "Something went wrong during sign-in. Please try again.",
        OAuthAccountNotLinked:
          "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin:
          "Incorrect email or password. Try again or reset your password.",
        AccessDenied: "You don't have permission to sign in.",
        Configuration:
          "Sign-in isn't working right now. Please try again later.",
        Verification: "Your sign-in link has expired. Request a new one.",
      };

      setError(
        errorMessages[err.message] || "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] dark:bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form
          noValidate
          onSubmit={onSubmit}
          className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9E9E9] dark:border-[#333333] p-6 md:p-8"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-sora mb-2">
              Welcome Back
            </h1>
            <p className="text-[#666666] dark:text-[#AAAAAA] font-inter">
              Sign in to Anna-Data
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white font-inter">
                Email
              </label>
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white placeholder-[#666666] dark:placeholder-[#AAAAAA] font-inter transition-all duration-150 focus:border-[#0EA5E9] dark:focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#2B2B2B] dark:text-white font-inter">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-[#E4E4E4] dark:border-[#404040] bg-white dark:bg-[#262626] text-black dark:text-white placeholder-[#666666] dark:placeholder-[#AAAAAA] font-inter transition-all duration-150 focus:border-[#0EA5E9] dark:focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-inter">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-b from-[#252525] to-[#0F0F0F] dark:from-[#FFFFFF] dark:to-[#E0E0E0] text-white dark:text-black font-semibold rounded-lg transition-all duration-150 hover:from-[#2d2d2d] hover:to-[#171717] dark:hover:from-[#F0F0F0] dark:hover:to-[#D0D0D0] active:from-[#1a1a1a] active:to-[#000000] dark:active:from-[#E0E0E0] dark:active:to-[#C0C0C0] active:scale-95 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-[#666666] dark:text-[#AAAAAA] font-inter">
              Don't have an account?{" "}
              <a
                href={`/account/signup${
                  typeof window !== "undefined" ? window.location.search : ""
                }`}
                className="text-[#0EA5E9] hover:text-[#0284C7] transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;


