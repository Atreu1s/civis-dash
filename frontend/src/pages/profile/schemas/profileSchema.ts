import { z } from 'zod';

export const step1Schema = z.object({
  lastName: z.string().min(2, 'Минимум 2 символа'),
  firstName: z.string().min(2, 'Минимум 2 символа'),
  patronymic: z.string().optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Формат: ГГГГ-ММ-ДД'),
  gender: z.enum(['male', 'female', 'other']),
  phonePrimary: z.string().min(10, 'Минимум 10 символов'),
  email: z.string().email('Некорректный email').optional(),
});

export const step2Schema = z.object({
  registrationAddress: z.object({
    region: z.string().min(2), city: z.string().min(2),
    postalCode: z.string().regex(/^\d{6}$/, '6 цифр'), street: z.string().min(2),
  }),
  actualAddress: z.object({
    region: z.string().min(2).optional(), city: z.string().min(2).optional(),
    postalCode: z.string().regex(/^\d{6}$/, '6 цифр').optional(), street: z.string().min(2).optional(),
  }),
});

export const step3Schema = z.object({
  familyMembers: z.array(z.object({
    fullName: z.string().min(2),
    relation: z.enum(['spouse', 'child', 'parent', 'sibling', 'guardian']),
    birthDate: z.string().optional(),
  })).min(0),
  educationHistory: z.array(z.object({
    institution: z.string().min(2),
    level: z.enum(['secondary', 'vocational', 'bachelor', 'master', 'phd']),
    graduationYear: z.preprocess(
      (val) => (val === '' || val == null ? undefined : Number(val)),
      z.number().int().min(1900).max(2100).optional()
    ),
  })).min(0),
});

export const step4Schema = z.object({
  financial: z.object({
    incomeSource: z.enum(['employment', 'pension', 'business', 'unemployed', 'student']),
    hasDebts: z.boolean(),
  }),
  system: z.object({
    preferredLanguage: z.enum(['ru', 'en', 'tt', 'ba']),
    communicationChannel: z.enum(['email', 'sms', 'phone', 'post']),
  }),
});

export const profileSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);
export type ProfileFormData = z.infer<typeof profileSchema>;