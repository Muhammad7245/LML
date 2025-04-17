// composables/useTestOptions.ts
import { computed } from 'vue'

export function useTestOptions(serviceType: string) {
  const testOptions = computed(() => {
    switch (serviceType) {
      case 'Blood Test':
        return ['Complete Blood Count(CBC)', 'Comprehensive Metabolic Panel', 'Liver Function Test(LFT)', 'Thyroid Function Test(TFT)','HbA1c', 'Lipid Panel']
        case 'Diagnostic Imaging':
            return ['X-Ray','Ultrasound']
        case 'Pathology Services':
            return ['Biopsy Analysis']
        case 'Covid Test':
            return ['COVID-19 PCR Test']
        case 'Genetic Testing':
            return ['BRCA1/BRCA2 Gene Test', 'Carrier Screening']
         case 'Consultation':
        return ['Health Checkup Basic']
    
      default:
        return []
    }
  })

  return {
    testOptions,
  }
}
