// Mock Data for ServicePulse Hub Application

export const services = [
  {
    id: 1,
    name: "Screen Repair",
    price: "$79.99",
    category: "Repair",
    description: "Professional screen replacement and repair service",
  },
  {
    id: 2,
    name: "Battery Replacement",
    price: "$49.99",
    category: "Replacement",
    description: "Battery replacement for extended device lifespan",
  },
  {
    id: 3,
    name: "Water Damage Repair",
    price: "$129.99",
    category: "Repair",
    description: "Expert water damage restoration and repair",
  },
  {
    id: 4,
    name: "Charging Port Repair",
    price: "$39.99",
    category: "Repair",
    description: "Charging port cleaning and repair service",
  },
  {
    id: 5,
    name: "Speaker/Microphone Repair",
    price: "$49.99",
    category: "Repair",
    description: "Speaker and microphone component repair",
  },
  {
    id: 6,
    name: "Camera Repair",
    price: "$89.99",
    category: "Repair",
    description: "Camera lens and sensor repair service",
  },
  {
    id: 7,
    name: "Software Issues",
    price: "$59.99",
    category: "Repair",
    description: "Software troubleshooting and optimization",
  },
  {
    id: 8,
    name: "Other Services",
    price: "Call for Quote",
    category: "Repair",
    description: "Custom repair services available upon consultation",
  },
];

export const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    bookings: 5,
    totalSpent: "$399.95",
    joinDate: "Jan 15, 2026",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(234) 567-8901",
    bookings: 3,
    totalSpent: "$199.97",
    joinDate: "Feb 20, 2026",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "(345) 678-9012",
    bookings: 8,
    totalSpent: "$629.92",
    joinDate: "Dec 10, 2025",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(456) 789-0123",
    bookings: 2,
    totalSpent: "$129.98",
    joinDate: "Mar 5, 2026",
  },
  {
    id: 5,
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "(567) 890-1234",
    bookings: 6,
    totalSpent: "$479.94",
    joinDate: "Jan 25, 2026",
  },
];

export const appointments = [
  {
    id: 1,
    customer: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    service: "Screen Repair",
    device: "iPhone 14",
    date: "Apr 10, 2026",
    time: "9:00 AM",
    status: "Confirmed",
    description: "Cracked screen replacement",
  },
  {
    id: 2,
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "(234) 567-8901",
    service: "Battery Replacement",
    device: "Samsung Galaxy S23",
    date: "Apr 10, 2026",
    time: "10:30 AM",
    status: "Completed",
    description: "Battery not holding charge",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "(345) 678-9012",
    service: "Water Damage Repair",
    device: "iPad Pro",
    date: "Apr 11, 2026",
    time: "2:00 PM",
    status: "Pending",
    description: "Water spill damage assessment needed",
  },
  {
    id: 4,
    customer: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(456) 789-0123",
    service: "Camera Repair",
    device: "Google Pixel 7",
    date: "Apr 11, 2026",
    time: "3:30 PM",
    status: "Confirmed",
    description: "Camera focus issue",
  },
  {
    id: 5,
    customer: "Tom Brown",
    email: "tom@example.com",
    phone: "(567) 890-1234",
    service: "Charging Port Repair",
    device: "OnePlus 11",
    date: "Apr 12, 2026",
    time: "11:00 AM",
    status: "Confirmed",
    description: "Loose charging connection",
  },
];

export const devices = [
  "iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "OnePlus",
  "Motorola",
  "iPad",
  "Android Tablet",
  "Other",
];

export const bookedSlots = {
  "2024-04-10": ["09:00", "09:30", "14:00", "14:30"],
  "2024-04-11": ["10:00", "11:00", "15:00"],
  "2024-04-12": ["09:00", "13:00", "16:00", "16:30"],
};

export const dashboardStats = {
  totalAppointments: 128,
  completed: 96,
  pending: 24,
  customers: 342,
  totalRevenue: "$12,459.80",
  completionRate: 75,
  avgRating: "4.8/5",
  topService: "Screen Repair",
  topCustomer: "John Doe",
};

export const monthlyData = [
  { month: "Jan", revenue: 8500, appointments: 95 },
  { month: "Feb", revenue: 9200, appointments: 108 },
  { month: "Mar", revenue: 12459, appointments: 156 },
];

export const serviceStats = [
  { name: "Screen Repair", count: 52, revenue: "$4,135.48", percent: 35 },
  {
    name: "Battery Replacement",
    count: 38,
    revenue: "$1,899.62",
    percent: 25,
  },
  { name: "Water Damage Repair", count: 28, revenue: "$3,639.72", percent: 20 },
  { name: "Charging Port Repair", count: 24, revenue: "$959.76", percent: 15 },
  { name: "Other Services", count: 14, revenue: "$1,824.22", percent: 5 },
];

export const settingsDefault = {
  companyName: "ServicePulse Hub",
  email: "admin@servicepulsehub.com",
  phone: "(555) 123-4567",
  address: "123 Tech Street, Silicon Valley, CA 94025",
  businessHoursStart: "09:00",
  businessHoursEnd: "18:00",
  appointmentDuration: 30,
  notificationsEmail: true,
  notificationsSMS: true,
  maintenanceMode: false,
};

export const businessHours = {
  start: 8, // 8:00 AM
  end: 18, // 6:00 PM
  interval: 30, // 30-minute intervals
};

export const statCards = [
  {
    title: "Total Appointments",
    value: 128,
    change: "+12%",
    icon: "📅",
    color: "bg-blue-500",
  },
  {
    title: "Completed",
    value: 96,
    change: "+8%",
    icon: "✅",
    color: "bg-green-500",
  },
  {
    title: "Pending",
    value: 24,
    change: "-2%",
    icon: "⏳",
    color: "bg-yellow-500",
  },
  {
    title: "Customers",
    value: 342,
    change: "+15%",
    icon: "👥",
    color: "bg-purple-500",
  },
];

export const statusColors = {
  Completed: "bg-green-100 text-green-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Cancelled: "bg-red-100 text-red-800",
};

export const getStatusColor = (status) => {
  return statusColors[status] || "bg-gray-100 text-gray-800";
};
