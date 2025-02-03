import { useState } from "react";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { MetricCards } from "@/components/analytics/MetricCards";
import { ScanActivityChart } from "@/components/analytics/ScanActivityChart";
import { DistributionCharts } from "@/components/analytics/DistributionCharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Analytics = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ["analytics-data"],
    queryFn: async () => {
      const { data: qrCodes, error: qrError } = await supabase
        .from("qr_codes")
        .select("*");

      const { data: scans, error: scansError } = await supabase
        .from("qr_scans")
        .select("*");

      if (qrError || scansError) {
        throw new Error("Error fetching analytics data");
      }

      return {
        qrCodes: qrCodes || [],
        scans: scans || [],
      };
    },
    enabled: !isDemoMode,
  });

  return (
    <div className="w-full p-6">
      <AnalyticsHeader 
        isDemoMode={isDemoMode} 
        onToggleMode={() => setIsDemoMode(!isDemoMode)} 
      />
      <AnalyticsFilters />
      <MetricCards 
        isDemoMode={isDemoMode} 
        analyticsData={analyticsData} 
        isLoading={isLoading} 
      />
      <ScanActivityChart 
        isDemoMode={isDemoMode} 
        analyticsData={analyticsData} 
        isLoading={isLoading} 
      />
      <DistributionCharts 
        isDemoMode={isDemoMode} 
        analyticsData={analyticsData} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default Analytics;