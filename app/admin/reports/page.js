"use client";

import { useMemo, useState } from "react";

const reportConfigs = {
  day: {
    label: "Today",
    reportData: {
      totalRevenue: "$486.50",
      totalAppointments: 8,
      completedAppointments: 6,
      pendingAppointments: 2,
      avgRating: "4.9/5",
      topService: "Screen Repair",
      topCustomer: "Sarah Williams",
      topCustomerMeta: "2 bookings, $129.99 spent",
      topServiceMeta: "3 bookings today",
      revenueChange: "+8% from yesterday",
      appointmentChange: "+2 from yesterday",
    },
    trendLabel: "Hourly Trend",
    trendData: [
      { label: "9AM", revenue: 60, appointments: 1 },
      { label: "11AM", revenue: 120, appointments: 2 },
      { label: "1PM", revenue: 90, appointments: 1 },
      { label: "3PM", revenue: 150, appointments: 2 },
      { label: "5PM", revenue: 66.5, appointments: 2 },
    ],
    serviceStats: [
      { name: "Screen Repair", count: 3, revenue: "$179.97" },
      { name: "Battery Replacement", count: 2, revenue: "$99.98" },
      { name: "Camera Repair", count: 1, revenue: "$79.99" },
      { name: "Charging Port Repair", count: 1, revenue: "$49.99" },
      { name: "Other Services", count: 1, revenue: "$76.57" },
    ],
  },

  week: {
    label: "This Week",
    reportData: {
      totalRevenue: "$3,248.75",
      totalAppointments: 42,
      completedAppointments: 34,
      pendingAppointments: 8,
      avgRating: "4.8/5",
      topService: "Battery Replacement",
      topCustomer: "John Doe",
      topCustomerMeta: "3 bookings, $249.99 spent",
      topServiceMeta: "11 bookings this week",
      revenueChange: "+14% from last week",
      appointmentChange: "+6 from last week",
    },
    trendLabel: "Daily Trend",
    trendData: [
      { label: "Mon", revenue: 420, appointments: 5 },
      { label: "Tue", revenue: 510, appointments: 6 },
      { label: "Wed", revenue: 460, appointments: 7 },
      { label: "Thu", revenue: 530, appointments: 8 },
      { label: "Fri", revenue: 610, appointments: 6 },
      { label: "Sat", revenue: 420, appointments: 5 },
      { label: "Sun", revenue: 298.75, appointments: 5 },
    ],
    serviceStats: [
      { name: "Battery Replacement", count: 11, revenue: "$549.89" },
      { name: "Screen Repair", count: 10, revenue: "$849.90" },
      { name: "Water Damage Repair", count: 8, revenue: "$1,039.92" },
      { name: "Charging Port Repair", count: 7, revenue: "$279.93" },
      { name: "Other Services", count: 6, revenue: "$529.11" },
    ],
  },

  month: {
    label: "This Month",
    reportData: {
      totalRevenue: "$12,459.80",
      totalAppointments: 156,
      completedAppointments: 132,
      pendingAppointments: 24,
      avgRating: "4.8/5",
      topService: "Screen Repair",
      topCustomer: "John Doe",
      topCustomerMeta: "5 bookings, $399.95 spent",
      topServiceMeta: "52 bookings this month",
      revenueChange: "+23% from last month",
      appointmentChange: "+45 from last month",
    },
    trendLabel: "Weekly Trend",
    trendData: [
      { label: "Week 1", revenue: 2600, appointments: 32 },
      { label: "Week 2", revenue: 3100, appointments: 39 },
      { label: "Week 3", revenue: 2950, appointments: 37 },
      { label: "Week 4", revenue: 3809.8, appointments: 48 },
    ],
    serviceStats: [
      { name: "Screen Repair", count: 52, revenue: "$4,135.48" },
      { name: "Battery Replacement", count: 38, revenue: "$1,899.62" },
      { name: "Water Damage Repair", count: 28, revenue: "$3,639.72" },
      { name: "Charging Port Repair", count: 24, revenue: "$959.76" },
      { name: "Other Services", count: 14, revenue: "$1,824.22" },
    ],
  },

  year: {
    label: "This Year",
    reportData: {
      totalRevenue: "$142,880.40",
      totalAppointments: 1784,
      completedAppointments: 1512,
      pendingAppointments: 272,
      avgRating: "4.7/5",
      topService: "Screen Repair",
      topCustomer: "Michael Brown",
      topCustomerMeta: "18 bookings, $1,899.50 spent",
      topServiceMeta: "610 bookings this year",
      revenueChange: "+31% from last year",
      appointmentChange: "+328 from last year",
    },
    trendLabel: "Monthly Trend",
    trendData: [
      { label: "Jan", revenue: 8500, appointments: 95 },
      { label: "Feb", revenue: 9200, appointments: 108 },
      { label: "Mar", revenue: 12459, appointments: 156 },
      { label: "Apr", revenue: 11800, appointments: 149 },
      { label: "May", revenue: 12150, appointments: 151 },
      { label: "Jun", revenue: 12900, appointments: 164 },
      { label: "Jul", revenue: 13400, appointments: 170 },
      { label: "Aug", revenue: 11980, appointments: 152 },
      { label: "Sep", revenue: 11620, appointments: 145 },
      { label: "Oct", revenue: 12540, appointments: 158 },
      { label: "Nov", revenue: 13410, appointments: 166 },
      { label: "Dec", revenue: 14921.4, appointments: 170 },
    ],
    serviceStats: [
      { name: "Screen Repair", count: 610, revenue: "$48,795.00" },
      { name: "Battery Replacement", count: 420, revenue: "$20,998.00" },
      { name: "Water Damage Repair", count: 290, revenue: "$37,699.00" },
      { name: "Charging Port Repair", count: 250, revenue: "$9,997.50" },
      { name: "Other Services", count: 214, revenue: "$25,390.90" },
    ],
  },
};

export default function AdminReports() {
  const [dateRange, setDateRange] = useState("month");

  const currentReport = reportConfigs[dateRange];

  const reportData = currentReport.reportData;
  const trendData = currentReport.trendData;
  const serviceStats = currentReport.serviceStats;

  const completionRate = (
    (reportData.completedAppointments / reportData.totalAppointments) *
    100
  ).toFixed(1);

  const maxRevenue = Math.max(...trendData.map((item) => item.revenue));
  const maxAppointments = Math.max(
    ...trendData.map((item) => item.appointments),
  );

  const servicePercent = useMemo(() => {
    return serviceStats.map((service) => ({
      ...service,
      percent: ((service.count / reportData.totalAppointments) * 100).toFixed(
        1,
      ),
    }));
  }, [serviceStats, reportData.totalAppointments]);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Administration
              </p>
              <h1 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                Reports
              </h1>
              <p className="mt-2 text-slate-600 text-lg">
                View business performance across day, week, month, and year.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>

              <button className="bg-orange-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-orange-600 transition">
                Export PDF
              </button>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {reportData.totalRevenue}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {reportData.revenueChange}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm font-medium">
              Total Appointments
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {reportData.totalAppointments}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {reportData.appointmentChange}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm font-medium">
              Completion Rate
            </p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {completionRate}%
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {reportData.completedAppointments} completed
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-slate-500 text-sm font-medium">Avg. Rating</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {reportData.avgRating}
            </p>
            <p className="text-sm text-slate-600 mt-2">From customer reviews</p>
          </div>
        </section>

        {/* Revenue & Appointments Trends */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Revenue Trend
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              {currentReport.trendLabel} for {currentReport.label.toLowerCase()}
            </p>

            <div className="h-72 bg-gradient-to-b from-green-100 to-green-50 rounded-xl flex items-end justify-around p-4 gap-3 overflow-x-auto">
              {trendData.map((data, index) => (
                <div
                  key={index}
                  className="flex min-w-[52px] flex-col items-center justify-end"
                >
                  <div
                    className="bg-green-500 rounded-t-lg w-12"
                    style={{
                      height: `${(data.revenue / maxRevenue) * 200}px`,
                    }}
                  ></div>
                  <span className="text-xs text-slate-600 mt-2">
                    {data.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 mt-1">
                    $
                    {data.revenue >= 1000
                      ? `${(data.revenue / 1000).toFixed(1)}k`
                      : data.revenue.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments Trend */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Appointments Trend
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              {currentReport.trendLabel} for {currentReport.label.toLowerCase()}
            </p>

            <div className="h-72 bg-gradient-to-b from-blue-100 to-blue-50 rounded-xl flex items-end justify-around p-4 gap-3 overflow-x-auto">
              {trendData.map((data, index) => (
                <div
                  key={index}
                  className="flex min-w-[52px] flex-col items-center justify-end"
                >
                  <div
                    className="bg-blue-500 rounded-t-lg w-12"
                    style={{
                      height: `${(data.appointments / maxAppointments) * 200}px`,
                    }}
                  ></div>
                  <span className="text-xs text-slate-600 mt-2">
                    {data.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 mt-1">
                    {data.appointments}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Performance */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Service Performance
          </h3>

          <div className="space-y-5">
            {servicePercent.map((service, index) => (
              <div key={index}>
                <div className="flex justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {service.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {service.count} appointments
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {service.revenue}
                    </p>
                    <p className="text-sm text-slate-600">{service.percent}%</p>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-orange-500 h-2.5 rounded-full"
                    style={{ width: `${service.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Top Service
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {reportData.topService}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {reportData.topServiceMeta}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Top Customer
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              {reportData.topCustomer}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {reportData.topCustomerMeta}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Pending Items
            </h3>
            <p className="text-2xl font-bold text-red-600">
              {reportData.pendingAppointments}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              appointments to confirm
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
