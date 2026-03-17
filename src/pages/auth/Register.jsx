import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useRegisterMutation } from "../../services/authApi";
import logo from "../../assets/public/wavepass.png";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullname.trim()) newErrors.fullname = "Name required";
    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.password) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Min 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await register(formData).unwrap();
        setMessage({
          type: "success",
          text: response?.message || "Success!",
        });
        localStorage.setItem("userEmail", formData.email);
        setTimeout(() => navigate("/auth/verify-email"), 1500);
      } catch (error) {
        setMessage({
          type: "error",
          text: error?.data?.message || "Failed",
        });
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 overflow-hidden">
      <header className="flex items-center gap-2 shrink-0 mb-2">
        <div className="bg-[#241B7A] w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#241B7A] font-bold text-base tracking-tight">
          Wave Pass
        </span>
      </header>

      <main className="grow flex items-center justify-center">
        <div className="w-full max-w-100 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-[#1E1B4B]">Create Account</h2>
            <p className="text-gray-400 text-[11px]">Join us to get started</p>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-0.5">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[#241B7A] focus:bg-white text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@mail.com"
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[#241B7A] focus:bg-white text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:border-[#241B7A] focus:bg-white text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {(errors.fullname || errors.email || errors.password) && (
              <div className="min-h-3.5 flex items-center justify-center">
                <p className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">
                  {errors.fullname || errors.email || errors.password}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 py-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-3 h-3 rounded border-gray-300 text-[#241B7A] accent-[#241B7A] cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-[9px] text-gray-400 font-medium cursor-pointer"
              >
                I agree to the{" "}
                <span className="text-gray-600 underline">Terms & Privacy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-300 text-white font-bold py-2.5 rounded-xl text-sm transition-transform active:scale-95 flex items-center justify-center shadow-md mt-1"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign up"
              )}
            </button>

            <p className="text-center text-[11px] text-gray-500 pt-1">
              Already have an account?{" "}
              <Link
                to="/auth"
                className="text-[#241B7A] font-bold hover:underline ml-0.5"
              >
                Sign in
              </Link>
            </p>

            {message.text && (
              <div
                className={`flex items-center justify-between p-2 mt-2 rounded-lg border animate-in fade-in slide-in-from-top-1 ${
                  message.type === "success"
                    ? "bg-green-50 border-green-100 text-green-700"
                    : "bg-red-50 border-red-100 text-red-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {message.type === "success" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  <span className="text-[10px] font-bold leading-none">
                    {message.text}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMessage({ type: "", text: "" })}
                >
                  <X className="w-3 h-3 opacity-50 hover:opacity-100" />
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
