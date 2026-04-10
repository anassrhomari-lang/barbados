import { useParams, Link } from "react-router-dom";
import { usePatients } from "../context/PatientContext";
import {
  ArrowLeft,
  ShieldAlert,
  Layers,
  Stethoscope,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>();
  const { patients } = usePatients();
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  // Mock eGFR trajectory data
  const egfrData = [
    { year: "2021", egfr: patient.clinical.eGFR + 15 },
    { year: "2022", egfr: patient.clinical.eGFR + 10 },
    { year: "2023", egfr: patient.clinical.eGFR + 5 },
    { year: "2024", egfr: patient.clinical.eGFR + 2 },
    { year: "2025", egfr: patient.clinical.eGFR },
    {
      year: "2026 (Pred)",
      egfr: patient.clinical.eGFR + patient.guardian.eGFRSlope,
    },
    {
      year: "2027 (Pred)",
      egfr: patient.clinical.eGFR + patient.guardian.eGFRSlope * 2,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <Link
          to="/patients"
          className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
          <p className="text-sm text-slate-500">
            {patient.id} &middot; {patient.age}y {patient.gender} &middot;{" "}
            {patient.parish}
          </p>
        </div>
        <div className="flex-1" />
        <span
          className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
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

      {/* 4-Engine Architecture View */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ENGINE 1: SENTINEL */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex items-center">
            <ShieldAlert className="w-5 h-5 text-emerald-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">
              ENGINE 1: SENTINEL
            </h2>
            <span className="ml-auto text-xs font-medium text-slate-400 uppercase tracking-wider">
              Early Detection
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-slate-500">DKD Probability (5yr)</p>
                <p className="text-3xl font-light text-slate-900">
                  {patient.sentinel.dkdProbability}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Stage</p>
                <p className="text-xl font-medium text-slate-900">
                  {patient.sentinel.stage}
                </p>
              </div>
            </div>

            {patient.sentinel.nonProteinuricFlag === "Yes" && (
              <div className="mb-6 bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-start">
                <AlertTriangle className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-purple-900">
                    Silent DKD Alert
                  </h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Non-proteinuric DKD detected via tubular biomarker anomaly
                    (KIM-1/NGAL) despite normal UACR.
                  </p>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Top Driving Factors
              </h4>
              <div className="space-y-3">
                {patient.sentinel.topFactors.map((factor, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-full bg-slate-100 rounded-full h-2 mr-3">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${100 - idx * 20}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap w-32">
                      {factor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ENGINE 2: STRATIFIER */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-6 py-4 flex items-center">
            <Layers className="w-5 h-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">
              ENGINE 2: STRATIFIER
            </h2>
            <span className="ml-auto text-xs font-medium text-slate-400 uppercase tracking-wider">
              Risk Profiling
            </span>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-blue-600 mr-3">
                    {patient.stratifier.subtype}
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {patient.stratifier.subtypeName}
                    </p>
                    <p className="text-sm text-slate-500">
                      Confidence: {patient.stratifier.confidence}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Genomic Profile
                </h4>
                <p className="text-sm font-medium text-slate-900">
                  APOL1: {patient.genomics.APOL1}
                </p>
                {patient.genomics.APOL1.includes("G1") ||
                patient.genomics.APOL1.includes("G2") ? (
                  <p className="text-xs text-red-600 mt-1">
                    High-risk variant present
                  </p>
                ) : (
                  <p className="text-xs text-emerald-600 mt-1">
                    Low-risk variant
                  </p>
                )}
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Psychosocial Profile
                </h4>
                <p className="text-sm font-medium text-slate-900">
                  DDS-17: {patient.psychosocial.DDS17}
                </p>
                <p className="text-sm font-medium text-slate-900">
                  PHQ-9: {patient.psychosocial.PHQ9}
                </p>
                {patient.psychosocial.DDS17 > 3 && (
                  <p className="text-xs text-amber-600 mt-1">
                    Severe distress overrides biological cluster
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Biomarker Signature
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(patient.biomarkers).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-2 py-1 text-xs font-medium rounded-md ${
                      value === "Normal"
                        ? "bg-slate-200 text-slate-700"
                        : value === "Elevated"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {key}: {value}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ENGINE 3: PRESCRIPTOR */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden xl:col-span-2">
          <div className="bg-slate-900 px-6 py-4 flex items-center">
            <Stethoscope className="w-5 h-5 text-purple-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">
              ENGINE 3: PRESCRIPTOR
            </h2>
            <span className="ml-auto text-xs font-medium text-slate-400 uppercase tracking-wider">
              Treatment AI
            </span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                  Primary Pharmacotherapy
                </h3>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                  <p className="text-base font-medium text-emerald-900">
                    {patient.prescriptor.primaryTherapy}
                  </p>
                  <p className="text-sm text-emerald-700 mt-2">
                    Causal reasoning: Maximises glomerular protection based on
                    APOL1 status and current eGFR trajectory.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                  Psychosocial & Contextual
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-sm font-medium text-blue-900">
                    {patient.prescriptor.psychosocial}
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Contextual check: Affordability (
                    {patient.contextual.affordability}) verified for prescribed
                    regimen.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                  Monitoring Schedule
                </h3>
                <p className="text-sm text-slate-700">
                  {patient.prescriptor.monitoring}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                  Referral Pathway
                </h3>
                <p
                  className={`text-sm font-medium ${patient.prescriptor.referral.includes("URGENT") ? "text-red-600" : "text-slate-700"}`}
                >
                  {patient.prescriptor.referral}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ENGINE 4: GUARDIAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden xl:col-span-2">
          <div className="bg-slate-900 px-6 py-4 flex items-center">
            <Eye className="w-5 h-5 text-amber-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">
              ENGINE 4: GUARDIAN
            </h2>
            <span className="ml-auto text-xs font-medium text-slate-400 uppercase tracking-wider">
              Monitoring & Adaptation
            </span>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    eGFR Slope Tracker
                  </h4>
                  <div className="flex items-baseline">
                    <span
                      className={`text-3xl font-bold ${patient.guardian.eGFRSlope < -5 ? "text-red-600" : "text-slate-900"}`}
                    >
                      {patient.guardian.eGFRSlope}
                    </span>
                    <span className="ml-2 text-sm text-slate-500">
                      mL/min/year
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Adherence Proxy
                  </h4>
                  <p
                    className={`text-sm font-medium ${patient.guardian.adherenceProxy.includes("Worsening") ? "text-amber-600" : "text-emerald-600"}`}
                  >
                    {patient.guardian.adherenceProxy}
                  </p>
                </div>

                {patient.guardian.alerts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Active Alerts
                    </h4>
                    <ul className="space-y-2">
                      {patient.guardian.alerts.map((alert, idx) => (
                        <li
                          key={idx}
                          className="flex items-start bg-red-50 p-3 rounded-lg border border-red-100"
                        >
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-red-800">{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 h-64">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  eGFR Trajectory & Prediction
                </h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={egfrData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#e2e8f0"
                    />
                    <XAxis
                      dataKey="year"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <YAxis
                      domain={[0, 120]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#64748b" }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <ReferenceLine
                      x="2025"
                      stroke="#94a3b8"
                      strokeDasharray="3 3"
                    />
                    <Line
                      type="monotone"
                      dataKey="egfr"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
