import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Minus, Plus, Loader2, AlertCircle } from "lucide-react";
import { Skeleton, ConfigProvider } from "antd";
import {
  useGetEventDetailsQuery,
  useCheckoutTicketMutation,
} from "../../services/attendeeApi";

const EventTicket = () => {
  const location = useLocation();
  const { id: idFromParams } = useParams();
  const id = location.state?.id || idFromParams;
  const navigate = useNavigate();

  const { data: response, isLoading: isFetching } = useGetEventDetailsQuery(id);
  const event = response?.data;

  const purchaseLimit = event?.limit || 1;
  const remainingTickets = (event?.quantity || 0) - (event?.ticketSold || 0);
  const maxAllowed = Math.min(purchaseLimit, remainingTickets);

  const [checkoutTicket, { isLoading: isSubmitting }] =
    useCheckoutTicketMutation();

  const [quantity, setQuantity] = useState(1);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [sendToDifferent, setSendToDifferent] = useState(false);
  const [attendeeList, setAttendeeList] = useState([
    { fullname: "", email: "", phoneNumber: "" },
  ]);

  useEffect(() => {
    setAttendeeList((prev) => {
      const current = [...prev];
      if (quantity > current.length) {
        const extra = Array(quantity - current.length)
          .fill(null)
          .map(() => ({ fullname: "", email: "", phoneNumber: "" }));
        return [...current, ...extra];
      }
      return current.slice(0, quantity);
    });
  }, [quantity]);

  const ticketPrice = event?.price || 0;
  const total = quantity * ticketPrice;

  const incrementQuantity = () => {
    if (quantity < maxAllowed) {
      setQuantity((prev) => prev + 1);
      setShowLimitWarning(false);
    } else {
      setShowLimitWarning(true);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setShowLimitWarning(false);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...attendeeList];
    updated[index][name] = value;
    setAttendeeList(updated);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const primary = attendeeList[0];
    const payload = {
      fullname: primary.fullname,
      email: primary.email,
      phoneNumber: primary.phoneNumber,
      limit: quantity,
    };

    if (quantity > 1 && sendToDifferent) {
      payload.attendees = attendeeList.slice(1);
    }

    try {
      const result = await checkoutTicket({ eventId: id, ...payload }).unwrap();
      navigate("/ticket-download", {
        state: {
          ticket: result.data,
          event: event,
        },
      });
    } catch (err) {
      console.error("Checkout failed", err);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen w-full bg-gray-50/30 p-4 md:p-10 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <Skeleton
              active
              title={{ width: "40%" }}
              paragraph={{ rows: 12 }}
            />
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <Skeleton.Image className="!w-full !h-48 mb-6" active />
            <Skeleton active paragraph={{ rows: 4 }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#241B7A" } }}>
      <div className="min-h-screen w-full bg-gray-50/30 p-4 md:p-10 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-8 tracking-tight">
                Ticket Details
              </h2>

              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Ticket Type
                    </label>
                    <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                      <span className="text-[13px] font-bold text-[#241B7A]">
                        {ticketPrice === 0 ? "FREE" : "PAID"}
                      </span>
                      <span className="text-[13px] font-bold text-gray-600">
                        ₦{ticketPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Quantity
                    </label>
                    <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-2">
                      <span className="text-[13px] font-medium text-gray-400">
                        {quantity} {quantity > 1 ? "slots" : "slot"}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="p-1 hover:bg-gray-100 rounded-md disabled:opacity-20"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="bg-gray-100 px-3 py-1 rounded-lg text-[13px] font-bold text-[#241B7A]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={incrementQuantity}
                          className="p-1 hover:bg-gray-100 rounded-md"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {showLimitWarning && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-[11px] font-bold">
                    <AlertCircle size={14} />
                    <span>
                      Maximum limit of {purchaseLimit} tickets per person
                      reached.
                    </span>
                  </div>
                )}

                <div className="space-y-8">
                  {attendeeList
                    .map((person, index) => (
                      <div
                        key={index}
                        className={
                          index > 0
                            ? "pt-8 border-t border-dashed border-gray-200"
                            : ""
                        }
                      >
                        <h4 className="text-sm font-bold text-gray-900 mb-4">
                          {index === 0
                            ? "Primary Booker"
                            : `Attendee ${index + 1}`}
                        </h4>

                        {/* All inputs forced to single column (stacking) */}
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase">
                              Full Name
                            </label>
                            <input
                              required
                              name="fullname"
                              value={person.fullname}
                              onChange={(e) => handleInputChange(index, e)}
                              placeholder="Enter full name"
                              className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm focus:border-[#241B7A] outline-none transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase">
                              Email Address
                            </label>
                            <input
                              required
                              type="email"
                              name="email"
                              value={person.email}
                              onChange={(e) => handleInputChange(index, e)}
                              placeholder="Enter email address"
                              className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm focus:border-[#241B7A] outline-none transition-all"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-gray-400 uppercase">
                              Phone Number
                            </label>
                            <input
                              required
                              name="phoneNumber"
                              value={person.phoneNumber}
                              onChange={(e) => handleInputChange(index, e)}
                              placeholder="Enter phone number"
                              className="w-full border border-gray-100 bg-gray-50/50 rounded-xl px-4 py-3 text-sm focus:border-[#241B7A] outline-none transition-all"
                            />
                          </div>
                        </div>

                        {index === 0 && quantity > 1 && (
                          <div className="mt-6 space-y-3">
                            <label
                              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${!sendToDifferent ? "border-[#241B7A] bg-blue-50/30" : "border-gray-100"}`}
                            >
                              <input
                                type="radio"
                                checked={!sendToDifferent}
                                onChange={() => setSendToDifferent(false)}
                                className="w-4 h-4 accent-[#241B7A]"
                              />
                              <span className="text-xs font-bold text-gray-600">
                                Send all tickets to my email
                              </span>
                            </label>
                            <label
                              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${sendToDifferent ? "border-[#241B7A] bg-blue-50/30" : "border-gray-100"}`}
                            >
                              <input
                                type="radio"
                                checked={sendToDifferent}
                                onChange={() => setSendToDifferent(true)}
                                className="w-4 h-4 accent-[#241B7A]"
                              />
                              <span className="text-xs font-bold text-gray-600">
                                Send tickets to different emails
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    ))
                    .filter((_, i) => (sendToDifferent ? true : i === 0))}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#241B7A] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#1a135d] transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    `Checkout ₦${total.toLocaleString()}`
                  )}
                </button>
              </form>
            </div>

            {/* Event Summary Card */}
            <div className="bg-white shadow-sm border border-gray-100 p-6 rounded-2xl sticky top-10">
              <div className="rounded-xl overflow-hidden mb-6 aspect-video">
                <img
                  src={event?.cover?.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-lg font-black text-gray-900 mb-4 uppercase leading-tight">
                {event?.title}
              </h1>
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <span>{quantity} X TICKETS</span>
                  <span className="text-gray-900 font-bold">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    TOTAL
                  </span>
                  <span className="text-2xl font-black text-[#241B7A]">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default EventTicket;
