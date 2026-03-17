import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useResetPasswordMutation } from "../../services/authApi";
import EmailVerificationSuccess from "../../components/ui/EmailVerificationSuccess";
import logo from "../../assets/public/wavepass.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validation = {
    length: formData.password.length >= 8,
    symbol: /[!@#$%^&*(),.?":{}|<>0-9]/.test(formData.password),
    match:
      formData.password === formData.confirmPassword &&
      formData.confirmPassword !== "",
  };

  const getStrength = () => {
    const points = Object.values(validation).filter(Boolean).length;
    if (points === 0) return { label: "Very Weak", color: "text-red-400" };
    if (points === 1) return { label: "Weak", color: "text-red-500" };
    if (points === 2) return { label: "Medium", color: "text-orange-500" };
    return { label: "Strong", color: "text-green-500" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation.length || !validation.symbol || !validation.match) {
      setErrors({ server: "Please fulfill all password requirements" });
      return;
    }

    try {
      const data = {
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
        email: localStorage.getItem("userEmail"),
      };
      await resetPassword(data).unwrap();
      setIsSuccess(true);
    } catch (err) {
      setErrors({ server: err.data?.message || "Failed to reset password" });
    }
  };

  if (isSuccess) {
    return (
      <EmailVerificationSuccess
        navigate={() => navigate("/auth")}
        message="Your password has been reset successfully."
        buttonText="Go to Login"
      />
    );
  }

  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 overflow-hidden">
      <header className="flex items-center gap-2 shrink-0 mb-4">
        <div className="bg-[#241B7A] w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-[#241B7A] font-bold text-lg tracking-tight">
          Wave Pass
        </span>
      </header>

      <main className="grow flex items-center justify-center">
        <div className="w-full max-w-100 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1E1B4B] mb-1">
              Set New Password
            </h2>
            <p className="text-gray-400 text-xs px-2">
              Ensure your new password is secure
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 ml-1 uppercase">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#241B7A] text-sm"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={isLoading}
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
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 ml-1 uppercase">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#241B7A] text-sm"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 px-1">
              <div className="flex items-center gap-2">
                {validation.length && validation.symbol ? (
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                ) : (
                  <AlertCircle className="w-3 h-3 text-gray-300" />
                )}
                <p className="text-[10px] text-gray-500 font-medium">
                  Strength:{" "}
                  <span className={`font-bold ${getStrength().color}`}>
                    {getStrength().label}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${validation.length ? "bg-green-500" : "bg-gray-200"}`}
                />
                <p className="text-[10px] text-gray-500">
                  At least 8 characters
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${validation.symbol ? "bg-green-500" : "bg-gray-200"}`}
                />
                <p className="text-[10px] text-gray-500">Number or symbol</p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${validation.match ? "bg-green-500" : "bg-gray-200"}`}
                />
                <p className="text-[10px] text-gray-500">Passwords match</p>
              </div>
            </div>

            <div className="min-h-6">
              {errors.server && (
                <p className="text-center text-[10px] font-bold text-red-500 uppercase">
                  {errors.server}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#241B7A] hover:bg-[#1a135d] text-white font-bold py-3.5 rounded-xl transition-transform active:scale-95 text-sm shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Reset password"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
