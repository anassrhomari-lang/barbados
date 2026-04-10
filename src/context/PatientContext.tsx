import { createContext, useContext, useState, ReactNode } from 'react';
import { Patient } from '../types';
import { patients as initialPatients } from '../data/mockData';

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, 'id' | 'sentinel' | 'stratifier' | 'prescriptor' | 'guardian'>) => string;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients as Patient[]);

  const addPatient = (patientData: Omit<Patient, 'id' | 'sentinel' | 'stratifier' | 'prescriptor' | 'guardian'>) => {
    const id = `P-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Mock AI Engine Logic based on the PDF architecture
    let subtype = 'S5';
    let subtypeName = 'Glomerular-Classic';
    let urgency = 'Routine';
    let stage = 'Established';
    let nonProteinuricFlag = 'No';
    let primaryTherapy = 'RAAS inhibitor + SGLT2 inhibitor';
    let eGFRSlope = -2.0;

    if (patientData.genomics.APOL1.includes('G1') || patientData.genomics.APOL1.includes('G2')) {
      subtype = 'S1';
      subtypeName = 'APOL1-Driven Rapid Progressor';
      urgency = 'Priority';
      primaryTherapy = 'SGLT2 inhibitor (empagliflozin 10mg) + ACE inhibitor/ARB';
      eGFRSlope = -6.5;
    } else if (patientData.psychosocial.DDS17 > 3) {
      subtype = 'S6';
      subtypeName = 'Psychosocial-Mediated Decliner';
      urgency = 'Priority';
      primaryTherapy = 'SGLT2 inhibitor (dapagliflozin 10mg)';
      eGFRSlope = -3.5;
    } else if (patientData.clinical.UACR < 30 && (patientData.biomarkers.KIM1.includes('High') || patientData.biomarkers.NGAL.includes('High'))) {
      subtype = 'S2';
      subtypeName = 'Silent Tubular Injurer';
      urgency = 'Priority';
      stage = 'Early';
      nonProteinuricFlag = 'Yes';
      primaryTherapy = 'SGLT2 inhibitor immediately';
      eGFRSlope = -4.0;
    }

    const newPatient: Patient = {
      ...patientData,
      id,
      sentinel: {
        dkdProbability: Math.floor(60 + Math.random() * 35),
        stage,
        nonProteinuricFlag,
        urgency,
        topFactors: ['eGFR', 'UACR', 'APOL1'],
      },
      stratifier: {
        subtype,
        subtypeName,
        confidence: Math.floor(80 + Math.random() * 15),
      },
      prescriptor: {
        primaryTherapy,
        monitoring: 'Standard monitoring protocol',
        referral: urgency === 'Priority' ? 'URGENT Nephrology' : 'Routine follow-up',
        psychosocial: patientData.psychosocial.DDS17 > 3 ? 'CBT Referral' : 'Routine support',
      },
      guardian: {
        eGFRSlope,
        adherenceProxy: 'Stable',
        alerts: [],
      }
    };

    setPatients(prev => [newPatient, ...prev]);
    return id;
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
}
