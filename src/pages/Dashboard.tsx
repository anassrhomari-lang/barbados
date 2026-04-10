import { Activity, Users, ShieldAlert, Layers } from "lucide-react";
import { Link } from "react-router-dom";
import { usePatients } from "../context/PatientContext";

export default function Dashboard() {
  const { patients } = usePatients();
  
  const stats = [
    {
      name: "Total Patients Monitored",
      value: "1,248",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      name: "Silent DKD Alerts (Sentinel)",
      value: "42",
      icon: ShieldAlert,
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
    {
      name: "High Risk (APOL1 G1/G2)",
      value: "18%",
      icon: Activity,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      name: "Protocols Generated",
      value: "856",
      icon: Layers,
      color: "text-emerald-500",
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Clinical Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of DKD monitoring across polyclinics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden rounded-2xl shadow-sm border border-slate-100 p-5"
          >
            <div className="flex items-center">
              <div className={`flex-shrink-0 rounded-xl p-3 ${item.bg}`}>
                <item.icon
                  className={`h-6 w-6 ${item.color}`}
                  aria-hidden="true"
                />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-slate-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="text-2xl font-semibold text-slate-900">
                    {item.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-slate-900">
            Recent Sentinel Alerts
          </h3>
          <Link
            to="/patients"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            View all patients &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Patient
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Sentinel Stage
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Subtype
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Urgency
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {patient.id} &middot; {patient.parish}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.sentinel.stage === "Pre-DKD"
                          ? "bg-amber-100 text-amber-800"
                          : patient.sentinel.stage === "Early"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {patient.sentinel.stage}
                    </span>
                    {patient.sentinel.nonProteinuricFlag === "Yes" && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        Non-Proteinuric
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="font-medium text-slate-900">
                      {patient.stratifier.subtype}
                    </div>
                    <div className="text-xs truncate max-w-[200px]">
                      {patient.stratifier.subtypeName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.sentinel.urgency === "Priority"
                          ? "bg-orange-100 text-orange-800"
                          : patient.sentinel.urgency === "Routine"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {patient.sentinel.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/patients/${patient.id}`}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      Review Protocol
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
