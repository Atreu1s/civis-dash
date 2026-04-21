export type Gender = 'male' | 'female' | 'other';
export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';
export type EducationLevel = 'secondary' | 'vocational' | 'bachelor' | 'master' | 'phd';
export type DocumentType = 'passport' | 'snils' | 'inn' | 'driving_license' | 'military_id' | 'birth_certificate';
export type FamilyRelation = 'spouse' | 'child' | 'parent' | 'sibling' | 'guardian';
export type CitizenStatus = 'активен' | 'на проверке' | 'в архиве' | 'заблокирован';
export type MilitaryCategory = 'fit' | 'limited' | 'exempt' | 'deferred' | 'not_served';
export type VerificationLevel = 'basic' | 'advanced' | 'government';

export interface Address {
  region: string;
  city: string;
  district: string;
  street: string;
  building: string;
  apartment: string;
  postalCode: string;
  isRegistered: boolean;
}

export interface DocumentRecord {
  id: string;
  type: DocumentType;
  series: string;
  number: string;
  issueDate: string;
  expiryDate: string | null;
  issuedBy: string;
  scanUrl: string | null;
}

export interface FamilyMember {
  id: string;
  fullName: string;
  birthDate: string;
  relation: FamilyRelation;
  isDependent: boolean;
  disabilityStatus: boolean;
  educationLevel: EducationLevel | null;
  occupation: string;
}

export interface EducationRecord {
  id: string;
  institution: string;
  level: EducationLevel;
  graduationYear: number;
  specialization: string;
  diplomaNumber: string;
  isCompleted: boolean;
}

export interface Employment {
  id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  monthlyIncome: number;
  employmentType: 'full_time' | 'part_time' | 'contract' | 'freelance';
}

export interface MedicalInfo {
  bloodGroup: string;
  allergies: string[];
  chronicDiseases: string[];
  disabilityGroup: 'I' | 'II' | 'III' | null;
  disabilityCertificate: string | null;
  lastCheckupDate: string | null;
}

export interface FinancialInfo {
  taxNumber: string;
  bankAccountMasked: string;
  hasDebts: boolean;
  debtAmount: number;
  propertyOwnership: ('apartment' | 'house' | 'land' | 'car' | 'business')[];
  incomeSource: 'employment' | 'pension' | 'business' | 'unemployed' | 'student';
}

export interface SystemMeta {
  assignedOperator: string;
  department: string;
  verificationLevel: VerificationLevel;
  dataConsentGiven: boolean;
  preferredLanguage: 'ru' | 'en' | 'tt' | 'ba';
  communicationChannel: 'email' | 'sms' | 'phone' | 'post';
  tags: string[];
  internalNotes: string | null;
  auditHistory: Array<{ date: string; action: string; operator: string }>;
}

export interface Citizen {
  id: string;
  lastName: string;
  firstName: string;
  patronymic: string;
  gender: Gender;
  birthDate: string;
  birthPlace: string;
  maritalStatus: MaritalStatus;
  citizenship: string;
  nationality: string;
  phonePrimary: string;
  phoneSecondary: string | null;
  email: string | null;
  emergencyContactName: string;
  emergencyContactPhone: string;
  snils: string;
  inn: string;
  documents: DocumentRecord[];
  registrationAddress: Address;
  actualAddress: Address;
  familyMembers: FamilyMember[];
  hasChildren: boolean;
  childrenCount: number;
  isLargeFamily: boolean;
  educationHistory: EducationRecord[];
  employmentHistory: Employment[];
  medical: MedicalInfo;
  isVeteran: boolean;
  isPensioner: boolean;
  pensionType: 'age' | 'disability' | 'survivor' | null;
  socialBenefits: string[];
  housingCondition: 'adequate' | 'improved' | 'substandard' | 'homeless';
  subsidyEligible: boolean;
  militaryCategory: MilitaryCategory;
  militaryUnit: string | null;
  rank: string | null;
  draftDate: string | null;
  conscriptionRegion: string | null;
  mobilizationStatus: 'civilian' | 'reserve' | 'active' | 'demobilized';
  financial: FinancialInfo;
  system: SystemMeta;
  createdAt: string;
  updatedAt: string;
  status: CitizenStatus;
  lastLogin: string | null;
  profileCompletionPercent: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalCitizens: number;
  newThisMonth: number;
  activeRecords: number;
  pendingVerification: number;
  processedThisWeek: number;
  ageDistribution: Array<{ group: string; count: number }>;
  regionDistribution: Array<{ region: string; count: number }>;
}