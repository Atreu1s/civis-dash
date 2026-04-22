import { http, HttpResponse } from 'msw';
import type { Citizen, PaginatedResponse, CitizenStatus, Gender, MaritalStatus, MilitaryCategory, VerificationLevel } from '../entities/citizen/types';

const REGIONS = ['Москва', 'Санкт-Петербург', 'Московская область', 'Казань', 'Новосибирск'] as const;

const generateMockCitizens = (count: number): Citizen[] => {
  const weightedRandom = <T>(options: { value: T; weight: number }[]): T => {
    const totalWeight = options.reduce((sum, opt) => sum + opt.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const opt of options) {
      if (random < opt.weight) return opt.value;
      random -= opt.weight;
    }
    return options[options.length - 1].value;
  };

  return Array.from({ length: count }, (_, i) => {
    const region = weightedRandom([
      { value: 'Москва' as const, weight: 35 },      
      { value: 'Санкт-Петербург' as const, weight: 25 }, 
      { value: 'Московская область' as const, weight: 15 },
      { value: 'Казань' as const, weight: 13 },
      { value: 'Новосибирск' as const, weight: 12 },
    ]);

    const status = weightedRandom([
      { value: 'активен' as CitizenStatus, weight: 70 },      
      { value: 'на проверке' as CitizenStatus, weight: 15 },   
      { value: 'в архиве' as CitizenStatus, weight: 10 },      
      { value: 'заблокирован' as CitizenStatus, weight: 5 },   
    ]);

    const gender = weightedRandom([
      { value: 'male' as Gender, weight: 48 },
      { value: 'female' as Gender, weight: 50 },
      { value: 'other' as Gender, weight: 2 },
    ]);

    const maritalStatus = weightedRandom([
      { value: 'married' as MaritalStatus, weight: 45 },
      { value: 'single' as MaritalStatus, weight: 35 },
      { value: 'divorced' as MaritalStatus, weight: 15 },
      { value: 'widowed' as MaritalStatus, weight: 5 },
    ]);

    const militaryCategory = weightedRandom([
      { value: 'fit' as MilitaryCategory, weight: 60 },
      { value: 'limited' as MilitaryCategory, weight: 20 },
      { value: 'deferred' as MilitaryCategory, weight: 12 },
      { value: 'exempt' as MilitaryCategory, weight: 5 },
      { value: 'not_served' as MilitaryCategory, weight: 3 },
    ]);

    const housingCondition = weightedRandom([
      { value: 'adequate' as const, weight: 65 },
      { value: 'improved' as const, weight: 20 },
      { value: 'substandard' as const, weight: 12 },
      { value: 'homeless' as const, weight: 3 },
    ]);

    const incomeSource = weightedRandom([
      { value: 'employment' as const, weight: 55 },
      { value: 'pension' as const, weight: 20 },
      { value: 'business' as const, weight: 12 },
      { value: 'unemployed' as const, weight: 8 },
      { value: 'student' as const, weight: 5 },
    ]);

    const verificationLevel = weightedRandom([
      { value: 'basic' as VerificationLevel, weight: 50 },
      { value: 'advanced' as VerificationLevel, weight: 35 },
      { value: 'government' as VerificationLevel, weight: 15 },
    ]);

    const birthYear = 1949 + Math.floor(Math.random() * 57);
    const birthMonth = Math.floor(Math.random() * 12);
    const birthDay = 1 + Math.floor(Math.random() * 28);
    const birthDate = new Date(birthYear, birthMonth, birthDay).toISOString().split('T')[0];

    const phoneFormats = [
      `+7 (900) ${1000000 + i}`,
      `+7 (9${Math.floor(Math.random() * 9) + 1}) ${1000000 + i}`,
      `+7 (495) ${1000000 + i}`, 
      `+7 (812) ${1000000 + i}`, 
    ];
    const phonePrimary = weightedRandom(phoneFormats.map(f => ({ value: f, weight: 1 })));

    const cityByRegion: Record<string, string> = {
      'Москва': 'Москва',
      'Санкт-Петербург': 'Санкт-Петербург',
      'Московская область': 'Подольск',
      'Казань': 'Казань',
      'Новосибирск': 'Новосибирск',
    };

    return {
      id: `cit-${i + 1}`,
      lastName: `Фамилия${i + 1}`,
      firstName: `Имя${i + 1}`,
      patronymic: i % 3 === 0 ? `Отчество${i + 1}` : '',
      gender,
      birthDate,
      birthPlace: `Город ${region}`,
      maritalStatus,
      citizenship: 'Российская Федерация',
      nationality: '',
      phonePrimary,
      phoneSecondary: Math.random() > 0.7 ? `+7 (999) ${2000000 + i}` : null,
      email: Math.random() > 0.1 ? `user${i}@example.com` : null, 
      emergencyContactName: `Контакт ${i}`,
      emergencyContactPhone: `+7 (900) ${2000000 + i}`,
      
      snils: `${String(100 + i % 1000).padStart(3, '0')}-${String(100 + i % 1000).padStart(3, '0')}-${String(100 + i % 1000).padStart(3, '0')} ${String(i % 100).padStart(2, '0')}`,
      inn: `${100000000000 + i}`,
      documents: [],
      
      registrationAddress: { 
        region, 
        city: cityByRegion[region] || 'Город', 
        district: '', 
        street: ['Улица Ленина', 'Проспект Мира', 'Набережная', 'Бульвар', 'Шоссе'][i % 5], 
        building: String(1 + Math.floor(Math.random() * 200)), 
        apartment: String(1 + Math.floor(Math.random() * 300)), 
        postalCode: region === 'Москва' ? '101000' : region === 'Санкт-Петербург' ? '190000' : '100000', 
        isRegistered: true 
      },
      actualAddress: { 
        region, 
        city: cityByRegion[region] || 'Город', 
        district: '', 
        street: ['Улица Ленина', 'Проспект Мира', 'Набережная', 'Бульвар', 'Шоссе'][i % 5], 
        building: String(1 + Math.floor(Math.random() * 200)), 
        apartment: String(1 + Math.floor(Math.random() * 300)), 
        postalCode: region === 'Москва' ? '101000' : region === 'Санкт-Петербург' ? '190000' : '100000', 
        isRegistered: Math.random() > 0.3 
      },
      
      familyMembers: [],
      hasChildren: Math.random() > 0.4, 
      childrenCount: Math.floor(Math.random() * 5), 
      isLargeFamily: Math.random() > 0.85, 
      
      educationHistory: [],
      employmentHistory: [],
      
      medical: { 
        bloodGroup: ['I+', 'II+', 'III+', 'IV+', 'I-', 'II-', 'III-', 'IV-'][i % 8], 
        allergies: Math.random() > 0.8 ? ['Пенициллин'] : [], 
        chronicDiseases: Math.random() > 0.9 ? ['Гипертония'] : [], 
        disabilityGroup: Math.random() > 0.95 ? (['I', 'II', 'III'][i % 3] as 'I' | 'II' | 'III') : null, 
        disabilityCertificate: null, 
        lastCheckupDate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null 
      },
      
      isVeteran: Math.random() > 0.92, 
      isPensioner: birthYear < 1964, 
      pensionType: birthYear < 1964 ? (['age', 'disability', 'survivor'][i % 3] as any) : null,
      socialBenefits: Math.random() > 0.7 ? ['Льгота на ЖКХ'] : [],
      housingCondition,
      subsidyEligible: Math.random() > 0.8,
      
      militaryCategory,
      militaryUnit: militaryCategory === 'fit' ? `В/Ч ${10000 + i % 1000}` : null,
      rank: militaryCategory === 'fit' ? ['Рядовой', 'Ефрейтор', 'Сержант'][i % 3] : null,
      draftDate: militaryCategory === 'fit' ? new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), 1).toISOString().split('T')[0] : null,
      conscriptionRegion: region,
      mobilizationStatus: weightedRandom([
        { value: 'civilian' as const, weight: 85 },
        { value: 'reserve' as const, weight: 10 },
        { value: 'active' as const, weight: 3 },
        { value: 'demobilized' as const, weight: 2 },
      ]),
      
      financial: { 
        taxNumber: `${i}`, 
        bankAccountMasked: `**** ${1000 + i % 9000}`, 
        hasDebts: Math.random() > 0.85, 
        debtAmount: Math.random() > 0.85 ? Math.floor(Math.random() * 500000) : 0, 
        propertyOwnership: weightedRandom([
          { value: [] as const, weight: 30 },
          { value: ['apartment'] as const, weight: 40 },
          { value: ['apartment', 'car'] as const, weight: 20 },
          { value: ['house', 'land'] as const, weight: 10 },
        ]), 
        incomeSource 
      },
      
      system: { 
        assignedOperator: `Оператор ${1 + Math.floor(Math.random() * 10)}`, 
        department: ['Отдел 1', 'Отдел 2', 'Отдел 3', 'Центр обработки'][i % 4], 
        verificationLevel, 
        dataConsentGiven: Math.random() > 0.05, 
        preferredLanguage: weightedRandom([
          { value: 'ru' as const, weight: 90 },
          { value: 'en' as const, weight: 7 },
          { value: 'tt' as const, weight: 2 },
          { value: 'ba' as const, weight: 1 },
        ]), 
        communicationChannel: weightedRandom([
          { value: 'email' as const, weight: 60 },
          { value: 'sms' as const, weight: 25 },
          { value: 'phone' as const, weight: 12 },
          { value: 'post' as const, weight: 3 },
        ]), 
        tags: Math.random() > 0.7 ? ['VIP', 'Проверен'] : [], 
        internalNotes: null, 
        auditHistory: [] 
      },
      
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      status, 
      lastLogin: Math.random() > 0.2 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null,
      profileCompletionPercent: 60 + Math.floor(Math.random() * 40), 
    } satisfies Citizen; 
  });
};

const allCitizens = generateMockCitizens(1500);

const generateMonthlyStats = () => {
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = date.toISOString().slice(0, 10); 
    
    const baseRegistrations = 100 + i * 5;
    const baseVerifications = Math.floor(baseRegistrations * 0.7);
    
    months.push({
      month: monthKey,
      registrations: baseRegistrations + Math.floor(Math.random() * 30),
      verifications: baseVerifications + Math.floor(Math.random() * 20)
    });
  }
  return months;
};

const generateStatusDistribution = () => {
  const distribution: Array<{ status: CitizenStatus; count: number }> = [];
  
  (['активен', 'на проверке', 'в архиве', 'заблокирован'] as CitizenStatus[]).forEach(status => {
    const count = allCitizens.filter(c => c.status === status).length;
    if (count > 0) {
      distribution.push({ status, count });
    }
  });
  
  return distribution;
};

const generateRegionActivity = () => {
  return REGIONS.map(region => {
    const regionCitizens = allCitizens.filter(c => c.registrationAddress.region === region);
    return {
      region,
      activeCount: regionCitizens.filter(c => c.status === 'активен').length,
      pendingCount: regionCitizens.filter(c => c.status === 'на проверке').length
    };
  }).sort((a, b) => b.activeCount - a.activeCount); 
};

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
        { group: '18-25', count: 320 }, 
        { group: '26-40', count: 510 },
        { group: '41-60', count: 480 }, 
        { group: '60+', count: 190 }
      ],
      regionDistribution: [
        { region: 'Москва', count: 450 }, 
        { region: 'Санкт-Петербург', count: 310 },
        { region: 'Московская область', count: 280 }, 
        { region: 'Казань', count: 190 },
        { region: 'Новосибирск', count: 140 }
      ],

      monthlyRegistrations: generateMonthlyStats(),
      statusDistribution: generateStatusDistribution(),
      regionActivity: generateRegionActivity()
    });
  }),

  http.get('/api/citizens/:id', ({ params }) => {
    const citizen = allCitizens.find(c => c.id === params.id);
    return citizen ? HttpResponse.json(citizen) : new HttpResponse(null, { status: 404 });
  }),
];