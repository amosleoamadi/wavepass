import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", server: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (errors.server) setErrors((prev) => ({ ...prev, server: "" }));
  };

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      tempErrors.email = "Invalid email format";

    if (!formData.password) tempErrors.password = "Password is required";
    else if (formData.password.length < 6)
      tempErrors.password = "Minimum 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await login(formData).unwrap();
      setErrors((prev) => ({ ...prev, server: "" }));
      const { data: user, accessToken } = response;
      dispatch(setCredentials({ user, token: accessToken }));

      setMessage({
        type: "success",
        text: response.message || "Login successful",
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("Login error:", err);
      const serverMessage =
        err?.data?.message ||
        err?.error ||
        "Login failed. Check your connection.";
      setErrors((prev) => ({ ...prev, server: serverMessage }));
    }
  };

  return (
    <div className="w-full max-w-100 bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-[#1E1B4B] mb-1">
          Unlock Your Event Access
        </h2>
        <p className="text-gray-400 text-[12px]">
          Sign in to access your event account
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-600 tracking-wide">
            Email address
          </label>
          <div className="relative">
            <Mail
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? "text-red-400" : "text-gray-300"}`}
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="enter your email address"
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none transition-all text-[14px] ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-100 focus:border-[#241B7A]"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-bold uppercase mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-600 tracking-wide">
            Password
          </label>
          <div className="relative">
            <Lock
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? "text-red-400" : "text-gray-300"}`}
            />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
              placeholder="enter your password"
              className={`w-full pl-10 pr-10 py-2.5 bg-white border rounded-lg focus:outline-none transition-all text-[14px] ${
                errors.password
                  ? "border-red-400"
                  : "border-gray-100 focus:border-[#241B7A]"
              }`}
            />
            <p className="text-left text-[12px] text-gray-500 mt-1">
              <Link
                to="/auth/forgot-password"
                className="text-[#241B7A] font-extrabold hover:underline"
              >
                Forgot Password?
              </Link>
            </p>
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
            <p className="text-red-500 text-[10px] font-bold uppercase mt-1">
              {errors.password}
            </p>
          )}
        </div>
        {errors.server && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[12px] rounded-lg text-center">
            {errors.server}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-50 border border-green-100 text-green-600 text-[12px] rounded-lg text-center">
            {message.text}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#241B7A] hover:bg-[#1a135d] disabled:bg-gray-400 text-white font-bold py-3.5 rounded-lg transition-all text-sm mt-2 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-center text-[12px] text-gray-500 pt-1">
          Don't have an account?
          <Link
            to="register"
            className="text-[#241B7A] font-extrabold hover:underline ml-1"
          >
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
