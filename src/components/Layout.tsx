import { Link, useLocation } from "react-router-dom";
import { Activity, Users, Menu, Bell } from "lucide-react";
import { useState, ReactNode } from "react";
import { clsx } from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", icon: Activity },
  { name: "Patients", href: "/patients", icon: Users },
];

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-center h-16 border-b border-slate-800 px-4">
          <Activity className="w-6 h-6 text-emerald-400 mr-2" />
          <span className="text-lg font-bold tracking-tight">
            BarbadosDKD-AI
          </span>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center space-x-4">
            <button className="text-slate-400 hover:text-slate-500 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              Dr
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
