export const patients = [
  {
    id: "P-1001",
    name: "Marcus Brathwaite",
    age: 54,
    gender: "Male",
    parish: "St. Michael",
    clinical: {
      eGFR: 82,
      UACR: 25, // Normal
      HbA1c: 8.1,
      BP: "135/85",
      BMI: 29,
      diabetesDuration: 8,
    },
    biomarkers: {
      KIM1: "Elevated",
      NGAL: "High",
      LFABP: "Normal",
      CystatinC: "Normal",
    },
    genomics: {
      APOL1: "G1/G2", // High risk
    },
    psychosocial: {
      DDS17: 2.1,
      PHQ9: 5,
      socialSupport: "Moderate",
    },
    contextual: {
      SES: "Middle",
      affordability: "Moderate",
    },
    sentinel: {
      dkdProbability: 85,
      stage: "Pre-DKD",
      nonProteinuricFlag: "Yes",
      urgency: "Priority",
      topFactors: ["APOL1 G1/G2", "KIM-1", "NGAL"],
    },
    stratifier: {
      subtype: "S1",
      subtypeName: "APOL1-Driven Rapid Progressor",
      confidence: 92,
    },
    prescriptor: {
      primaryTherapy:
        "SGLT2 inhibitor (empagliflozin 10mg) + ACE inhibitor/ARB",
      monitoring: "eGFR every 3 months, TNFR-1/2 every 6 months",
      referral: "URGENT Nephrology within 4 weeks",
      psychosocial:
        "Assess for fear of complications, refer for targeted counselling",
    },
    guardian: {
      eGFRSlope: -6.2, // Rapid progressor
      adherenceProxy: "Stable",
      alerts: ["eGFR slope exceeds -5 mL/min/year"],
    },
  },
  {
    id: "P-1002",
    name: "Shirley Griffith",
    age: 62,
    gender: "Female",
    parish: "Christ Church",
    clinical: {
      eGFR: 65,
      UACR: 15, // Normal
      HbA1c: 9.4,
      BP: "142/90",
      BMI: 31,
      diabetesDuration: 12,
    },
    biomarkers: {
      KIM1: "Very High",
      NGAL: "High",
      LFABP: "Elevated",
      CystatinC: "Elevated",
    },
    genomics: {
      APOL1: "G0/G0", // Low risk
    },
    psychosocial: {
      DDS17: 4.2, // Severe distress
      PHQ9: 12, // Moderate depression
      socialSupport: "Low",
    },
    contextual: {
      SES: "Low",
      affordability: "Low",
    },
    sentinel: {
      dkdProbability: 78,
      stage: "Early",
      nonProteinuricFlag: "Yes",
      urgency: "Priority",
      topFactors: ["DDS-17", "HbA1c", "KIM-1"],
    },
    stratifier: {
      subtype: "S6",
      subtypeName: "Psychosocial-Mediated Decliner",
      confidence: 88,
    },
    prescriptor: {
      primaryTherapy: "SGLT2 inhibitor (dapagliflozin 10mg)",
      monitoring:
        "Re-assess at 6 months, escalate biological therapy if psychosocial scores improve",
      referral: "Cognitive Behavioural Therapy (CBT)",
      psychosocial:
        "Family engagement protocol, Simplified medication regimen, Community health worker assigned",
    },
    guardian: {
      eGFRSlope: -3.1,
      adherenceProxy: "Worsening (HbA1c increased)",
      alerts: ["Non-adherence inferred: HbA1c worsened while doses unchanged"],
    },
  },
  {
    id: "P-1003",
    name: "David Clarke",
    age: 58,
    gender: "Male",
    parish: "St. Philip",
    clinical: {
      eGFR: 55,
      UACR: 350, // High
      HbA1c: 7.8,
      BP: "130/80",
      BMI: 27,
      diabetesDuration: 15,
    },
    biomarkers: {
      KIM1: "Normal",
      NGAL: "Normal",
      LFABP: "Normal",
      CystatinC: "High",
    },
    genomics: {
      APOL1: "G0/G1",
    },
    psychosocial: {
      DDS17: 1.5,
      PHQ9: 2,
      socialSupport: "High",
    },
    contextual: {
      SES: "High",
      affordability: "High",
    },
    sentinel: {
      dkdProbability: 95,
      stage: "Established",
      nonProteinuricFlag: "No",
      urgency: "Routine",
      topFactors: ["UACR", "eGFR", "Type IV collagen"],
    },
    stratifier: {
      subtype: "S5",
      subtypeName: "Glomerular-Classic",
      confidence: 96,
    },
    prescriptor: {
      primaryTherapy: "RAAS inhibitor (losartan) + SGLT2 inhibitor",
      monitoring: "Monitor urinary Type IV collagen as response marker",
      referral: "Renal biopsy referral if progression despite treatment",
      psychosocial: "Routine support",
    },
    guardian: {
      eGFRSlope: -2.0,
      adherenceProxy: "Stable",
      alerts: [],
    },
  },
];
