import DashboardPreview from "@/components/sections/DashboardPreview";
import Hero from "@/components/sections/Hero";
import InsightFlow from "@/components/sections/InsightFlow";
import WowInteraction from "@/components/sections/WowInteraction";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero></Hero>
      <InsightFlow></InsightFlow>
      <DashboardPreview></DashboardPreview>
      <WowInteraction></WowInteraction>
    </div>
  );
};

export default page;
