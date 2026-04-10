import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePatients } from '../context/PatientContext';
import { ArrowLeft, Save } from 'lucide-react';

export default function AddPatient() {
  const navigate = useNavigate();
  const { addPatient } = usePatients();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    parish: 'St. Michael',
    clinical: {
      eGFR: '',
      UACR: '',
      HbA1c: '',
      BP: '',
      BMI: '',
      diabetesDuration: '',
    },
    biomarkers: {
      KIM1: 'Normal',
      NGAL: 'Normal',
      LFABP: 'Normal',
      CystatinC: 'Normal',
    },
    genomics: {
      APOL1: 'G0/G0',
    },
    psychosocial: {
      DDS17: '',
      PHQ9: '',
      socialSupport: 'Moderate',
    },
    contextual: {
      SES: 'Middle',
      affordability: 'Moderate',
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData((prev: any) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Convert string numbers to actual numbers
    const patientData = {
      ...formData,
      age: Number(formData.age) || 0,
      clinical: {
        ...formData.clinical,
        eGFR: Number(formData.clinical.eGFR) || 0,
        UACR: Number(formData.clinical.UACR) || 0,
        HbA1c: Number(formData.clinical.HbA1c) || 0,
        BMI: Number(formData.clinical.BMI) || 0,
        diabetesDuration: Number(formData.clinical.diabetesDuration) || 0,
      },
      psychosocial: {
        ...formData.psychosocial,
        DDS17: Number(formData.psychosocial.DDS17) || 0,
        PHQ9: Number(formData.psychosocial.PHQ9) || 0,
      }
    };

    const newId = addPatient(patientData);
    navigate(`/patients/${newId}`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <Link to="/patients" className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Patient</h1>
          <p className="text-sm text-slate-500">Enter patient data to generate AI insights and treatment protocol.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Demographics */}
        <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Demographics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Age</label>
              <input required type="number" name="age" value={formData.age} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Parish</label>
              <select name="parish" value={formData.parish} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>St. Michael</option>
                <option>Christ Church</option>
                <option>St. Philip</option>
                <option>St. James</option>
                <option>St. Peter</option>
                <option>St. Thomas</option>
                <option>St. George</option>
                <option>St. John</option>
                <option>St. Joseph</option>
                <option>St. Andrew</option>
                <option>St. Lucy</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clinical Data */}
        <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Clinical Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">eGFR (mL/min/1.73m²)</label>
              <input required type="number" name="clinical.eGFR" value={formData.clinical.eGFR} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">UACR (mg/g)</label>
              <input required type="number" name="clinical.UACR" value={formData.clinical.UACR} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">HbA1c (%)</label>
              <input required type="number" step="0.1" name="clinical.HbA1c" value={formData.clinical.HbA1c} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Blood Pressure</label>
              <input required type="text" placeholder="120/80" name="clinical.BP" value={formData.clinical.BP} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">BMI</label>
              <input required type="number" step="0.1" name="clinical.BMI" value={formData.clinical.BMI} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Diabetes Duration (Years)</label>
              <input required type="number" name="clinical.diabetesDuration" value={formData.clinical.diabetesDuration} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
          </div>
        </div>

        {/* Biomarkers & Genomics */}
        <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Biomarkers & Genomics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">KIM-1</label>
              <select name="biomarkers.KIM1" value={formData.biomarkers.KIM1} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>Normal</option>
                <option>Elevated</option>
                <option>High</option>
                <option>Very High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">NGAL</label>
              <select name="biomarkers.NGAL" value={formData.biomarkers.NGAL} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>Normal</option>
                <option>Elevated</option>
                <option>High</option>
                <option>Very High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">APOL1 Genotype</label>
              <select name="genomics.APOL1" value={formData.genomics.APOL1} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>G0/G0</option>
                <option>G0/G1</option>
                <option>G0/G2</option>
                <option>G1/G1</option>
                <option>G1/G2</option>
                <option>G2/G2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Psychosocial & Contextual */}
        <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Psychosocial & Contextual</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">DDS-17 Score</label>
              <input required type="number" step="0.1" name="psychosocial.DDS17" value={formData.psychosocial.DDS17} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">PHQ-9 Score</label>
              <input required type="number" name="psychosocial.PHQ9" value={formData.psychosocial.PHQ9} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Affordability</label>
              <select name="contextual.affordability" value={formData.contextual.affordability} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>High</option>
                <option>Moderate</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Social Support</label>
              <select name="psychosocial.socialSupport" value={formData.psychosocial.socialSupport} onChange={handleInputChange} className="mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2 bg-white">
                <option>High</option>
                <option>Moderate</option>
                <option>Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <Save className="w-5 h-5 mr-2" />
            Save & Generate AI Protocol
          </button>
        </div>
      </form>
    </div>
  );
}
