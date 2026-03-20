import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import EventDetail from "../../components/ui/EventDetail";
import { useGetEventDetailsQuery } from "../../services/attendeeApi";
import SimilarEvents from "../../components/ui/SimilarEvents";

const SkeletonLoader = () => (
  <div className="min-h-screen w-full bg-white px-4 md:px-8 lg:px-16 py-8 md:py-12 animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <div className="aspect-video lg:aspect-square bg-gray-200 rounded-3xl w-full"></div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center py-4">
          <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-2/3 bg-gray-200 rounded mb-8"></div>

          <div className="space-y-4 mb-10">
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-100 rounded"></div>
          </div>

          <div className="h-14 w-full sm:w-48 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

const EventPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const eventKey = searchParams.get("key");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [eventKey]);

  const { data, isLoading, isError } = useGetEventDetailsQuery(eventKey, {
    skip: !eventKey,
  });

  if (!eventKey) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <AlertCircle size={48} className="text-gray-200 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Missing Event Key
        </h2>
        <p className="text-gray-400 text-sm max-w-xs mb-6">
          We couldn't find the event key in the URL. Please try again from the
          Explore page.
        </p>
        <button
          onClick={() => navigate("/discover")}
          className="bg-[#241B7A] text-white px-6 py-2.5 rounded-full font-bold text-sm"
        >
          Go to Discover
        </button>
      </div>
    );
  }

  if (isLoading) return <SkeletonLoader />;

  if (isError || !data?.data) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-xl font-bold text-gray-800">Event Unavailable</h2>
        <p className="text-gray-400 text-sm mt-2 mb-6">
          This event might have expired or the link is incorrect.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#241B7A] font-bold hover:underline"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <section className="py-6 md:py-10">
        <EventDetail event={data?.data} />

        <div className="mt-16 border-t border-gray-50 pt-16">
          <SimilarEvents
            category={data?.data?.category}
            currentEventId={data?.data?._id}
          />
        </div>
      </section>
    </div>
  );
};

export default EventPage;
