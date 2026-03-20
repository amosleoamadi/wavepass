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
    if (message) setMessage(null);
  };

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      tempErrors.email = "Invalid email format";
    if (!formData.password) tempErrors.password = "Password is required";
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
      setErrors((prev) => ({
        ...prev,
        server: err?.data?.message || "Invalid credentials",
      }));
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 overflow-hidden">
      <div className="flex items-center gap-2 shrink-0">
        <div className="bg-[#241B7A] w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#241B7A] font-bold text-sm tracking-tight">
          Wave Pass
        </span>
      </div>

      <div className="grow flex items-center justify-center">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="text-center mb-5">
            <h2 className="text-xl font-bold text-[#1E1B4B]">Welcome Back</h2>
            <p className="text-gray-400 text-xs mt-1">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#241B7A] transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#241B7A] transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 p-2 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex justify-end pt-0.5">
                <Link
                  to="/auth/forgot-password"
                  size="sm"
                  className="text-[#241B7A] text-[11px] font-bold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {(errors.server || message || errors.email || errors.password) && (
              <p
                className={`text-center text-[10px] font-bold uppercase tracking-wider ${message?.type === "success" ? "text-green-500" : "text-red-500"}`}
              >
                {errors.server ||
                  errors.email ||
                  errors.password ||
                  message?.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#241B7A] text-white font-bold py-3 rounded-xl text-sm transition-all hover:bg-[#1a1459] active:scale-[0.98] flex items-center justify-center shadow-md disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-50">
            <p className="text-center text-xs text-gray-500">
              Don't have an account?
              <Link
                to="/auth/register"
                className="text-[#241B7A] font-bold ml-1 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
