import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import background from "../../assets/images/background-sci-likha.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake Credentials
    const validEmail = "admin@gmail.com";
    const validPassword = "admin123";

    if (email === validEmail && password === validPassword) {
      // Store user to localStorage
      const userData = {
        email,
        role: "admin",
        token: "fake-jwt-token"
      };

      localStorage.setItem("user", JSON.stringify(userData));
      
      // Redirect to Admin Dashboard
      window.location.href = "/admin";
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          {/* Brand */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Sci-Likha
            </h1>
            <p className="text-gray-500 mt-1">Admin Portal</p>
          </div>

          {/* Login Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Access your dashboard and manage content with ease.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded"
                />
                <span className="text-sm">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm text-emerald-700 hover:text-emerald-900 font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 text-white font-medium rounded-lg"
              style={{ backgroundColor: "#163409" }}
            >
              Log In
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/70 to-green-900/80" />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white max-w-xl">
          <h2 className="text-4xl font-bold mb-4 drop-shadow">
            Sci-Likha Admin
          </h2>
          <p className="text-lg mb-4 text-white/90 leading-relaxed">
            Empowering science education through structured content management.
            Organize lessons, manage episodes, and oversee academic resources effortlessly.
          </p>
          <p className="text-base text-white/80 leading-relaxed">
            Gain real-time insight into user engagement and maintain the integrity 
            of your educational platform with confidence and clarity.
          </p>
        </div>
      </div>
    </div>
  );
}
