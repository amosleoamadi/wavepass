import React from "react";
import ExploreEvents from "../../components/ui/ExploreEvents";
import EventFeatureSection from "../../components/ui/EventFeatureSection";
import ClientTestimonials from "../../components/ui/ClientTestimonials";
import Pricing from "../../components/ui/Pricing";
import CallToAction from "../../components/ui/CallToAction";
import NewsLetter from "../../components/ui/NewsLetter";

const DiscoverEvents = () => {
  return (
    <div>
      <ExploreEvents />
      <EventFeatureSection />
      <ClientTestimonials />
      <Pricing />
      <CallToAction />
      <NewsLetter />
    </div>
  );
};

export default DiscoverEvents;
