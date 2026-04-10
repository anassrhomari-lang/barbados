export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  parish: string;
  clinical: {
    eGFR: number;
    UACR: number;
    HbA1c: number;
    BP: string;
    BMI: number;
    diabetesDuration: number;
  };
  biomarkers: {
    KIM1: string;
    NGAL: string;
    LFABP: string;
    CystatinC: string;
  };
  genomics: {
    APOL1: string;
  };
  psychosocial: {
    DDS17: number;
    PHQ9: number;
    socialSupport: string;
  };
  contextual: {
    SES: string;
    affordability: string;
  };
  sentinel: {
    dkdProbability: number;
    stage: string;
    nonProteinuricFlag: string;
    urgency: string;
    topFactors: string[];
  };
  stratifier: {
    subtype: string;
    subtypeName: string;
    confidence: number;
  };
  prescriptor: {
    primaryTherapy: string;
    monitoring: string;
    referral: string;
    psychosocial: string;
  };
  guardian: {
    eGFRSlope: number;
    adherenceProxy: string;
    alerts: string[];
  };
}
