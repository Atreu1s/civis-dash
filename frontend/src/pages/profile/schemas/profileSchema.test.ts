import { describe, it, expect } from 'vitest';
import { profileSchema } from './profileSchema';

describe('profileSchema', () => {
  it('успешно валидирует корректные данные', () => {
    const validData = {
      lastName: 'Иванов', firstName: 'Иван', birthDate: '1990-05-15', gender: 'male',
      citizenship: 'РФ', phonePrimary: '+79991234567',
      
      registrationAddress: { region: 'Москва', city: 'Москва', street: 'Тестовая', building: '1', postalCode: '101000', isRegistered: true },
      actualAddress: { 
        region: 'Моск',    
        city: 'Москва',     
        postalCode: '101000' 
      },

      hasChildren: false, isLargeFamily: false, familyMembers: [],
      educationHistory: [], employmentHistory: [],

      medical: { 
        bloodGroup: 'I+', allergies: [], chronicDiseases: [], 
        disabilityGroup: null, disabilityCertificate: '', lastCheckupDate: null 
      },
      isVeteran: false, isPensioner: false, pensionType: null,
      
      housingCondition: 'adequate', subsidyEligible: false,
      militaryCategory: 'fit', militaryUnit: null, rank: null, 
      draftDate: null, conscriptionRegion: null, mobilizationStatus: 'civilian',

      financial: { hasDebts: false, incomeSource: 'employment' },
      system: { 
        verificationLevel: 'basic', dataConsentGiven: true, 
        preferredLanguage: 'ru', communicationChannel: 'email' 
      },
      status: 'active'
    };

    const result = profileSchema.safeParse(validData);
    
    if (!result.success) {
      console.error('❌ Ошибка валидации:', result.error.issues);
    }
    expect(result.success).toBe(true);
  });

  it('возвращает ошибки при отсутствии обязательных полей', () => {
    const result = profileSchema.safeParse({ lastName: '', firstName: '', phonePrimary: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(3);
    }
  });
});