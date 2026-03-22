import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetTicketByReferenceQuery } from "../../services/attendeeApi";
import { Loader2, CheckCircle2, AlertCircle, SearchX } from "lucide-react";

const PaymentVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const { data, isLoading, isError, error } = useGetTicketByReferenceQuery(
    reference,
    {
      skip: !reference,
    },
  );

  useEffect(() => {
    if (data?.payment?.status === "successful") {
      const tag = data.attendee?.tag;
      const eventId = data.payment?.eventId;

      const timer = setTimeout(() => {
        navigate(`/ticket-download?tag=${tag}&eventId=${eventId}`, {
          replace: true,
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FBFCFF] p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-4xl p-10 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] text-center">
        {isLoading && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <Loader2 className="w-20 h-20 animate-spin text-[#241B7A] opacity-10" />
                <Loader2
                  className="w-20 h-20 animate-spin text-[#241B7A] absolute inset-0"
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Verifying Payment
              </h2>
              <p className="text-sm text-gray-400 font-medium px-4">
                Confirming your transaction. Please do not refresh the page.
              </p>
            </div>
          </div>
        )}

        {!isLoading && data?.payment?.status === "successful" && (
          <div className="space-y-8 animate-in zoom-in-95 fade-in duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black uppercase tracking-tight text-green-600">
                Payment Successful
              </h2>
              <p className="text-sm text-gray-400 font-medium px-4">
                Your spot is secured! Preparing your ticket for download...
              </p>
            </div>
          </div>
        )}

        {(isError ||
          (!isLoading && data && data.payment?.status !== "successful")) && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Verification Failed
              </h2>
              <p className="text-sm text-red-400 font-medium px-4">
                {error?.data?.message ||
                  "We couldn't verify this payment reference. Please try again."}
              </p>
            </div>
            <button
              onClick={() => navigate("/discover")}
              className="w-full bg-[#241B7A] text-white font-black py-5 rounded-2xl uppercase text-[11px] tracking-widest active:scale-95 transition-all shadow-lg shadow-blue-900/10"
            >
              Back to Events
            </button>
          </div>
        )}

        {!reference && !isLoading && (
          <div className="space-y-8 animate-in zoom-in-95 fade-in duration-500">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                <SearchX className="w-10 h-10 text-orange-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                Missing Link
              </h2>
              <p className="text-sm text-gray-400 font-medium px-4 leading-relaxed">
                We couldn't find a payment reference. Did you come here from the
                payment gateway?
              </p>
            </div>
            <button
              onClick={() => navigate("/discover")}
              className="w-full bg-[#241B7A] text-white font-black py-5 rounded-2xl uppercase text-[11px] tracking-widest active:scale-95 transition-all shadow-xl shadow-[#241B7A]/30"
            >
              Return to Discovery
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;
