import { z } from 'zod';

export const step1Schema = z.object({
  lastName: z.string().min(2, 'Минимум 2 символа'),
  firstName: z.string().min(2, 'Минимум 2 символа'),
  patronymic: z.string().optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Формат: ГГГГ-ММ-ДД'),
  birthPlace: z.string().optional(),
  gender: z.enum(['male', 'female', 'other']),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']).optional(),
  citizenship: z.string().min(2, 'Укажите гражданство'),
  nationality: z.string().optional(),
  phonePrimary: z.string().min(10, 'Минимум 10 символов'),
  phoneSecondary: z.string().optional(),
  email: z.string().email('Некорректный email').optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  snils: z.string().regex(/^\d{3}-\d{3}-\d{3} \d{2}$/, 'Формат: 123-456-789 00').optional(),
  inn: z.string().regex(/^\d{10,12}$/, '10 или 12 цифр').optional(),
});

export const step2Schema = z.object({
  registrationAddress: z.object({
    region: z.string().min(2), city: z.string().min(2), district: z.string().optional(),
    street: z.string().min(2), building: z.string().min(1), apartment: z.string().optional(),
    postalCode: z.string().regex(/^\d{6}$/, '6 цифр'), isRegistered: z.boolean().default(true),
  }),
  actualAddress: z.object({
    region: z.string().min(2).optional(), city: z.string().min(2).optional(),
    district: z.string().optional(), street: z.string().optional(),
    building: z.string().optional(), apartment: z.string().optional(),
    postalCode: z.string().regex(/^\d{6}$/, '6 цифр').optional(), isRegistered: z.boolean().optional(),
  }),
});

export const step3Schema = z.object({
  hasChildren: z.boolean(),
  childrenCount: z.number().min(0).max(20).optional(),
  isLargeFamily: z.boolean(),
  familyMembers: z.array(z.object({
    fullName: z.string().min(2), relation: z.enum(['spouse', 'child', 'parent', 'sibling', 'guardian']),
    birthDate: z.string().optional(), isDependent: z.boolean(), disabilityStatus: z.boolean(),
    educationLevel: z.enum(['secondary', 'vocational', 'bachelor', 'master', 'phd']).nullable(),
    occupation: z.string().optional(),
  })).min(0),
  educationHistory: z.array(z.object({
    institution: z.string().min(2), level: z.enum(['secondary', 'vocational', 'bachelor', 'master', 'phd']),
    graduationYear: z.preprocess(v => (v === '' || v == null ? undefined : Number(v)), z.number().int().min(1900).max(2100).optional()),
    specialization: z.string().optional(), diplomaNumber: z.string().optional(), isCompleted: z.boolean().default(true),
  })).min(0),
  employmentHistory: z.array(z.object({
    companyName: z.string().min(2), position: z.string().min(2),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
    isCurrent: z.boolean(), monthlyIncome: z.number().min(0).optional(),
    employmentType: z.enum(['full_time', 'part_time', 'contract', 'freelance']),
  })).min(0),
});

export const step4Schema = z.object({
  medical: z.object({
    bloodGroup: z.enum(['I+', 'I-', 'II+', 'II-', 'III+', 'III-', 'IV+', 'IV-']).optional(),
    allergies: z.array(z.string()).optional(), chronicDiseases: z.array(z.string()).optional(),
    disabilityGroup: z.enum(['I', 'II', 'III']).nullable(), disabilityCertificate: z.string().optional(),
    lastCheckupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  }),
  isVeteran: z.boolean(), isPensioner: z.boolean(),
  pensionType: z.enum(['age', 'disability', 'survivor']).nullable(),
  socialBenefits: z.array(z.enum(['veteran', 'pensioner', 'disabled', 'large_family', 'subsidy'])).optional(),
  housingCondition: z.enum(['adequate', 'improved', 'substandard', 'homeless']),
  subsidyEligible: z.boolean(),
  militaryCategory: z.enum(['fit', 'limited', 'exempt', 'deferred', 'not_served']),
  militaryUnit: z.string().nullable(), rank: z.string().nullable(),
  draftDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  conscriptionRegion: z.string().nullable(),
  mobilizationStatus: z.enum(['civilian', 'reserve', 'active', 'demobilized']),
});

export const step5Schema = z.object({
  financial: z.object({
    taxNumber: z.string().optional(), bankAccountMasked: z.string().optional(),
    hasDebts: z.boolean(), debtAmount: z.number().min(0).optional(),
    propertyOwnership: z.array(z.enum(['apartment', 'house', 'land', 'car', 'business'])).optional(),
    incomeSource: z.enum(['employment', 'pension', 'business', 'unemployed', 'student']),
  }),
  system: z.object({
    assignedOperator: z.string().optional(), department: z.string().optional(),
    verificationLevel: z.enum(['basic', 'advanced', 'government']),
    dataConsentGiven: z.boolean(), preferredLanguage: z.enum(['ru', 'en', 'tt', 'ba']),
    communicationChannel: z.enum(['email', 'sms', 'phone', 'post']),
    tags: z.array(z.string()).optional(), internalNotes: z.string().optional(),
  }),
  status: z.enum(['active', 'archived', 'pending_verification', 'blocked']),
  profileCompletionPercent: z.number().min(0).max(100).optional(),
});

export const profileSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema).merge(step5Schema);
export type ProfileFormData = z.infer<typeof profileSchema>;