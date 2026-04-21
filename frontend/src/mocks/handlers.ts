import { http, HttpResponse } from 'msw';
import type { Citizen, PaginatedResponse, CitizenStatus, Gender, MaritalStatus, MilitaryCategory, VerificationLevel } from '../entities/citizen/types';

const REGIONS = ['Москва', 'Санкт-Петербург', 'Московская область', 'Казань', 'Новосибирск'] as const;
const STATUSES: CitizenStatus[] = ['активен', 'на проверке', 'в архиве', 'заблокирован'];
const GENDERS: Gender[] = ['male', 'female', 'other'];
const MARITAL_STATUSES: MaritalStatus[] = ['single', 'married', 'divorced', 'widowed'];
const MIL_CATEGORIES: MilitaryCategory[] = ['fit', 'limited', 'exempt', 'deferred', 'not_served'];
const HOUSING_CONDITIONS = ['adequate', 'improved', 'substandard', 'homeless'] as const;
const INCOME_SOURCES = ['employment', 'pension', 'business', 'unemployed', 'student'] as const;
const VERIFICATION_LEVELS: VerificationLevel[] = ['basic', 'advanced', 'government'];

const generateMockCitizens = (count: number): Citizen[] => {
  return Array.from({ length: count }, (_, i) => {
    const region = REGIONS[i % REGIONS.length];
    const status = STATUSES[i % STATUSES.length];
    
    return {
      id: `cit-${i + 1}`,
      lastName: `Фамилия${i + 1}`,
      firstName: `Имя${i + 1}`,
      patronymic: i % 3 === 0 ? `Отчество${i + 1}` : '',
      gender: GENDERS[i % GENDERS.length],
      birthDate: new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28)).toISOString().split('T')[0],
      birthPlace: `Город ${region}`, 
      maritalStatus: MARITAL_STATUSES[i % MARITAL_STATUSES.length],
      citizenship: 'Российская Федерация',
      nationality: '',
      phonePrimary: `+7 (900) ${1000000 + i}`,
      phoneSecondary: null,
      email: `user${i}@example.com`,
      emergencyContactName: `Контакт ${i}`,
      emergencyContactPhone: `+7 (900) ${2000000 + i}`,
      
      snils: `${String(100 + i % 1000).padStart(3, '0')}-${String(100 + i % 1000).padStart(3, '0')}-${String(100 + i % 1000).padStart(3, '0')} ${String(i % 100).padStart(2, '0')}`,
      inn: `${100000000000 + i}`,
      documents: [],
      
      registrationAddress: { 
        region, 
        city: 'Город', 
        district: '', 
        street: 'Улица', 
        building: '1', 
        apartment: String(i), 
        postalCode: '100000', 
        isRegistered: true 
      },
      actualAddress: { 
        region, 
        city: 'Город', 
        district: '', 
        street: 'Улица', 
        building: '1', 
        apartment: String(i), 
        postalCode: '100000', 
        isRegistered: false 
      },
      
      familyMembers: [],
      hasChildren: i % 2 === 0,
      childrenCount: i % 4,
      isLargeFamily: i % 7 === 0,
      
      educationHistory: [],
      employmentHistory: [],
      
      medical: { 
        bloodGroup: 'I+', 
        allergies: [], 
        chronicDiseases: [], 
        disabilityGroup: null, 
        disabilityCertificate: null, 
        lastCheckupDate: null 
      },
      
      isVeteran: false,
      isPensioner: false,
      pensionType: null,
      socialBenefits: [],
      housingCondition: HOUSING_CONDITIONS[i % HOUSING_CONDITIONS.length],
      subsidyEligible: false,
      
      militaryCategory: MIL_CATEGORIES[i % MIL_CATEGORIES.length],
      militaryUnit: null,
      rank: null,
      draftDate: null,
      conscriptionRegion: region,
      mobilizationStatus: 'civilian',
      
      financial: { 
        taxNumber: `${i}`, 
        bankAccountMasked: '**** 1234', 
        hasDebts: false, 
        debtAmount: 0, 
        propertyOwnership: [], 
        incomeSource: INCOME_SOURCES[i % INCOME_SOURCES.length] 
      },
      
      system: { 
        assignedOperator: 'Оператор', 
        department: 'Отдел 1', 
        verificationLevel: VERIFICATION_LEVELS[i % VERIFICATION_LEVELS.length], 
        dataConsentGiven: true, 
        preferredLanguage: 'ru', 
        communicationChannel: 'email', 
        tags: [], 
        internalNotes: null, 
        auditHistory: [] 
      },
      
      // === Метаданные ===
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status, 
      lastLogin: null,
      profileCompletionPercent: 100,
    } satisfies Citizen; 
  });
};

const allCitizens = generateMockCitizens(1500);

export const handlers = [
  http.get('/api/citizens', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 50;
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const region = url.searchParams.get('region') || '';
    const status = url.searchParams.get('status') || '';

    let filtered = allCitizens;
    if (search) {
      filtered = filtered.filter(c =>
        c.lastName.toLowerCase().includes(search) ||
        c.firstName.toLowerCase().includes(search) ||
        c.snils.includes(search)
      );
    }
    if (region) filtered = filtered.filter(c => c.registrationAddress.region === region);
    if (status) filtered = filtered.filter(c => c.status === status);

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return HttpResponse.json<PaginatedResponse<Citizen>>({
      data: paginatedData, 
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }),

  http.get('/api/dashboard/stats', () => {
    return HttpResponse.json({
      totalCitizens: allCitizens.length,
      newThisMonth: 42,
      activeRecords: allCitizens.filter(c => c.status === 'активен').length,
      pendingVerification: allCitizens.filter(c => c.status === 'на проверке').length,
      processedThisWeek: Math.floor(Math.random() * 50) + 80,
      ageDistribution: [
        { group: '18-25', count: 320 }, { group: '26-40', count: 510 },
        { group: '41-60', count: 480 }, { group: '60+', count: 190 }
      ],
      regionDistribution: [
        { region: 'Москва', count: 450 }, { region: 'Санкт-Петербург', count: 310 },
        { region: 'Московская область', count: 280 }, { region: 'Казань', count: 190 },
        { region: 'Новосибирск', count: 140 }
      ],
    });
  }),

  http.get('/api/citizens/:id', ({ params }) => {
    const citizen = allCitizens.find(c => c.id === params.id);
    return citizen ? HttpResponse.json(citizen) : new HttpResponse(null, { status: 404 });
  }),
];