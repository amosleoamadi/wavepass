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
} from "lucide-react";
import { useRegisterMutation } from "../../services/authApi";

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
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
          text: response?.message || "Registration successful!",
        });
        setTimeout(() => navigate("/verify-email"), 2500);
        localStorage.setItem("userEmail", formData.email);
      } catch (error) {
        const errorMsg =
          error?.data?.message || "An error occurred during registration";
        setMessage({ type: "error", text: errorMsg });
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-2">
      <div className="w-full max-w-105 bg-white md:bg-white rounded-xl shadow-sm p-6 md:p-8 relative">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">
            Unlock Your Event Access
          </h2>
          <p className="text-gray-400 text-[12px]">
            Sign up to get started with your event
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-600 ml-0.5">
              Full Name
            </label>
            <div className="relative">
              <User
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.fullname ? "text-red-400" : "text-gray-300"}`}
              />
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="enter your fullname"
                className={`w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none transition-all placeholder:text-gray-300 text-[14px] ${
                  errors.fullname
                    ? "border-red-400"
                    : "border-gray-100 focus:border-[#241B7A]"
                }`}
              />
            </div>
            {errors.fullname && (
              <p className="text-[10px] text-red-500 ml-1">{errors.fullname}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-600 ml-0.5">
              Email address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? "text-red-400" : "text-gray-300"}`}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="enter your email address"
                className={`w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none transition-all placeholder:text-gray-300 text-[14px] ${
                  errors.email
                    ? "border-red-400"
                    : "border-gray-100 focus:border-[#241B7A]"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-500 ml-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-gray-600 ml-0.5">
              Password
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? "text-red-400" : "text-gray-300"}`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="enter your password"
                className={`w-full pl-10 pr-10 py-2 bg-white border rounded-lg focus:outline-none transition-all placeholder:text-gray-300 text-[14px] ${
                  errors.password
                    ? "border-red-400"
                    : "border-gray-100 focus:border-[#241B7A]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[10px] text-red-500 ml-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="w-3.5 h-3.5 rounded border-gray-300 text-[#241B7A] accent-[#241B7A] cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-[11px] text-gray-400 cursor-pointer"
            >
              I agree to the terms & conditions and privacy policy
            </label>
          </div>

          {message.text && (
            <div
              className={`mt-4 flex items-center justify-between p-3 rounded-lg border animate-in fade-in slide-in-from-bottom-2 ${
                message.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center gap-2">
                {message.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <p className="text-[12px] font-medium leading-tight">
                  {message.text}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMessage({ type: "", text: "" })}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors text-sm mt-1 shadow-sm"
          >
            {isLoading ? "Submitting..." : "Sign up"}
          </button>

          <p className="text-center text-[12px] text-gray-500 pt-1">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#241B7A] font-extrabold hover:underline ml-1"
            >
              sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
