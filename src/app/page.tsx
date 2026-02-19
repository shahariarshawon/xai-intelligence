import DashboardPreview from "@/components/sections/DashboardPreview";
import Hero from "@/components/sections/Hero";
import InsightFlow from "@/components/sections/InsightFlow";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero></Hero>
      <InsightFlow></InsightFlow>
      <DashboardPreview></DashboardPreview>
    </div>
  );
};

export default page;
