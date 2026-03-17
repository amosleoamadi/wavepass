import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginMutation } from "../../services/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slice";
import logo from "../../assets/public/wavepass.png";

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
    if (!formData.email) tempErrors.email = "Required";
    else if (!emailRegex.test(formData.email))
      tempErrors.email = "Invalid format";
    if (!formData.password) tempErrors.password = "Required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await login(formData).unwrap();
      const { data: user, accessToken } = response;
      dispatch(setCredentials({ user, token: accessToken }));

      setMessage({
        type: "success",
        text: response.message || "Login successful",
      });

      setTimeout(() => navigate("/dashboard/overview"), 1000);
    } catch (err) {
      setErrors((prev) => ({ ...prev, server: err?.data?.message || "Error" }));
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-8 overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-[#241B7A] w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#241B7A] font-bold text-base tracking-tight">
          Wave Pass
        </span>
      </div>

      <div className="grow flex items-center justify-center">
        <div className="w-full max-w-100 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl font-bold text-[#1E1B4B]">Welcome Back</h2>
            <p className="text-gray-400 text-xs">Sign in to your account</p>
          </div>

          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-gray-500 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[12px] font-semibold text-gray-500 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-11 pr-12 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-start">
                <Link
                  to="/auth/forgot-password"
                  size="sm"
                  className="text-[#241B7A] text-[11px] font-bold"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {(errors.server || message || errors.email || errors.password) && (
              <div className="h-6">
                <p className="text-center text-[10px] font-bold text-red-500 uppercase">
                  {errors.server ||
                    errors.email ||
                    errors.password ||
                    message?.text}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full -mt-4 md:mt-0 bg-[#241B7A] text-white font-bold py-3 rounded-xl text-sm transition-transform active:scale-95 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="shrink-0 py-2">
        <p className="text-center text-xs text-gray-400">
          Don't have an account?
          <Link to="/auth/register" className="text-[#241B7A] font-bold ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
