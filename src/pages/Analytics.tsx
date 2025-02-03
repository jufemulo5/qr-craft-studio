import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { AnalyticsFilters } from "@/components/analytics/AnalyticsFilters";
import { MetricCards } from "@/components/analytics/MetricCards";
import { ScanActivityChart } from "@/components/analytics/ScanActivityChart";
import { DistributionCharts } from "@/components/analytics/DistributionCharts";

const Analytics = () => {
  return (
    <div className="w-full p-6">
      <AnalyticsHeader />
      <AnalyticsFilters />
      <MetricCards />
      <ScanActivityChart />
      <DistributionCharts />
    </div>
  );
};

export default Analytics;