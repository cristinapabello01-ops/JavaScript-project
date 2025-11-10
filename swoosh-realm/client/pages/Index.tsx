import { useState } from "react";
import { Bell, MapPin, User, Trash2, Calendar, AlertCircle } from "lucide-react";

interface UserProfile {
  name: string;
  address: string;
  barangay: string;
  city: string;
  province: string;
  zone: number;
}

interface ScheduleEvent {
  zone: number;
  day: string;
  date: string;
  time: string;
  nextSchedule: boolean;
}

interface Notification {
  id: number;
  zone: number;
  message: string;
  timestamp: string;
  type: "reminder" | "alert" | "info";
}

export default function Index() {
  const [userProfile] = useState<UserProfile>({
    name: "Maria Santos",
    address: "123 Imus Street, Brgy. Zone 5",
    barangay: "Barangay Zapote",
    city: "Cavite City",
    province: "Cavite",
    zone: 5,
  });

  const [schedules] = useState<ScheduleEvent[]>([
    { zone: 1, day: "Monday", date: "Jan 13", time: "6:00 AM", nextSchedule: false },
    { zone: 2, day: "Tuesday", date: "Jan 14", time: "6:00 AM", nextSchedule: false },
    { zone: 3, day: "Wednesday", date: "Jan 15", time: "6:00 AM", nextSchedule: false },
    { zone: 4, day: "Thursday", date: "Jan 16", time: "6:00 AM", nextSchedule: false },
    { zone: 5, day: "Friday", date: "Jan 17", time: "6:00 AM", nextSchedule: true },
    { zone: 6, day: "Monday", date: "Jan 20", time: "6:00 AM", nextSchedule: false },
    { zone: 7, day: "Tuesday", date: "Jan 21", time: "6:00 AM", nextSchedule: false },
    { zone: 8, day: "Wednesday", date: "Jan 22", time: "6:00 AM", nextSchedule: false },
    { zone: 9, day: "Thursday", date: "Jan 23", time: "6:00 AM", nextSchedule: false },
    { zone: 10, day: "Friday", date: "Jan 24", time: "6:00 AM", nextSchedule: false },
    { zone: 11, day: "Monday", date: "Jan 27", time: "6:00 AM", nextSchedule: false },
  ]);

  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      zone: 5,
      message: "Your zone's pickup is tomorrow at 6:00 AM. Please have your garbage out by 5:30 AM.",
      timestamp: "2 hours ago",
      type: "reminder",
    },
    {
      id: 2,
      zone: 4,
      message: "Schedule change: Zone 4 pickup moved to Thursday due to holiday.",
      timestamp: "5 hours ago",
      type: "alert",
    },
    {
      id: 3,
      zone: 5,
      message: "Thank you for proper waste segregation in Zone 5!",
      timestamp: "1 day ago",
      type: "info",
    },
  ]);

  const nextSchedule = schedules.find((s) => s.nextSchedule);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 pt-4 pb-6">
        <div className="max-w-md mx-auto">
          {/* Top Bar with Notification Icon */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Trash2 className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold">EcoSched</h1>
            </div>
            <button className="relative bg-white/20 p-2 rounded-lg hover:bg-white/30 transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full"></span>
            </button>
          </div>

          {/* User Location Info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-start gap-3 mb-3">
              <User className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">{userProfile.name}</p>
                <p className="text-white/80 text-xs mt-1">{userProfile.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/80 text-xs">{userProfile.barangay}</p>
                <p className="text-white/80 text-xs">{userProfile.city}, {userProfile.province}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6">
        {/* Next Schedule Card */}
        {nextSchedule && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-400 rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-green-900">Your Next Pickup</h2>
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700 mb-2">{nextSchedule.day}</p>
            <p className="text-green-600 text-sm mb-4">{nextSchedule.date} at {nextSchedule.time}</p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-2">Zone {nextSchedule.zone}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-700">
                  🎯 Have your garbage ready by 5:30 AM
                </p>
              </div>
            </div>
          </div>
        )}

        {/* All Zones Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">All 11 Zones Schedule</h2>
          <div className="grid grid-cols-2 gap-3">
            {schedules.map((schedule) => (
              <div
                key={schedule.zone}
                className={`rounded-lg p-4 border-2 transition-all ${
                  schedule.zone === userProfile.zone
                    ? "bg-gradient-to-br from-green-100 to-emerald-100 border-green-500 shadow-md"
                    : "bg-white border-gray-200 hover:border-green-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-bold ${
                    schedule.zone === userProfile.zone ? "text-green-700" : "text-gray-600"
                  }`}>
                    Zone {schedule.zone}
                  </span>
                  {schedule.zone === userProfile.zone && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 font-medium">{schedule.day}</p>
                <p className="text-xs text-gray-500 mt-1">{schedule.date}</p>
                <p className="text-xs text-green-600 font-semibold mt-2">{schedule.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notifications
          </h2>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`rounded-lg p-4 border-l-4 ${
                  notif.type === "reminder"
                    ? "bg-blue-50 border-blue-400"
                    : notif.type === "alert"
                    ? "bg-orange-50 border-orange-400"
                    : "bg-green-50 border-green-400"
                }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 pt-0.5">
                    {notif.type === "alert" ? (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    ) : (
                      <Bell className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Zone {notif.zone}</p>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-8">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            View Full Schedule
          </button>
          <button className="flex-1 bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors">
            Settings
          </button>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 text-sm mb-2">♻️ Waste Segregation Tips</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Separate organic, recyclable, and residual waste</li>
            <li>• Ensure garbage bags are tied properly</li>
            <li>• Place bins at your gate on pickup day</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
