import { useState } from "react";
import { Link } from "react-router-dom";
import { usePatients } from "../context/PatientContext";
import { Search, Filter, Plus } from "lucide-react";

export default function Patients() {
  const { patients } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Patient Population
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor DKD patients.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-slate-200 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <Link to="/patients/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.map((patient) => (
          <Link
            key={patient.id}
            to={`/patients/${patient.id}`}
            className="block"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {patient.name}
                    </h2>
                    <p className="text-sm text-slate-500">
                      {patient.id} &middot; {patient.age}y {patient.gender}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    patient.sentinel.urgency === "Priority"
                      ? "bg-orange-100 text-orange-800"
                      : patient.sentinel.urgency === "Routine"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {patient.sentinel.urgency}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Subtype
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {patient.stratifier.subtype}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    eGFR
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {patient.clinical.eGFR}{" "}
                    <span className="text-xs font-normal text-slate-500">
                      mL/min
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    APOL1
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${patient.genomics.APOL1.includes("G1") || patient.genomics.APOL1.includes("G2") ? "text-red-600" : "text-slate-900"}`}
                  >
                    {patient.genomics.APOL1}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    DDS-17
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${patient.psychosocial.DDS17 > 3 ? "text-amber-600" : "text-slate-900"}`}
                  >
                    {patient.psychosocial.DDS17}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
