import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useResetPasswordMutation } from "../../services/authApi";
import EmailVerificationSuccess from "../../components/ui/EmailVerificationSuccess";

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
    if (!validation.length || !validation.symbol || !validation.match) return;

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
        navigate={() => navigate("/login")}
        message="Your password has been reset successfully."
        buttonText="Go to Login"
      />
    );
  }

  return (
    <div className="w-full max-w-115 bg-white rounded-3xk shadow-[0_10px_40px_-10px_rgba(0,0,0,0.04)] p-6 md:p-8 border border-gray-50 animate-in fade-in zoom-in-95 duration-300">
      <div className="text-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1E1B4B] mb-0.5 tracking-tight">
          Reset Password
        </h2>
        <p className="text-gray-400 text-[12px]">
          Please put in a new password
        </p>
      </div>

      {errors.server && (
        <div className="mb-4 p-2.5 bg-red-50 border border-red-100 text-red-600 text-[11px] rounded-lg text-center font-medium">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-wider">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter new password"
              className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#4F46E5] transition-all text-[14px] placeholder:text-gray-300"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
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
          <label className="text-[11px] font-bold text-gray-500 ml-1 uppercase tracking-wider">
            Re-enter Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="confirm new password"
              className="w-full pl-10 pr-12 py-2.5 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-[#4F46E5] transition-all text-[14px] placeholder:text-gray-300"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 py-1">
          <div className="flex items-center gap-2">
            <AlertCircle
              className={`w-3 h-3 ${validation.length && validation.symbol ? "text-green-500" : "text-red-400"}`}
            />
            <p className="text-[10px] font-medium text-gray-500">
              Strength:{" "}
              <span className={`font-bold ${getStrength().color}`}>
                {getStrength().label}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle
              className={`w-3 h-3 ${validation.length ? "text-green-500" : "text-red-400"}`}
            />
            <p className="text-[10px] font-medium text-gray-500">
              At least 8 characters
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle
              className={`w-3 h-3 ${validation.symbol ? "text-green-500" : "text-red-400"}`}
            />
            <p className="text-[10px] font-medium text-gray-500">
              Contains a number or symbol
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1E1B4B] hover:bg-[#151336] text-white font-bold py-3 rounded-xl transition-all text-[14px] shadow-md mt-1 flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Resetting...
            </>
          ) : (
            "Reset password"
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
