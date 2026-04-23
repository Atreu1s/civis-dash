import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider, type Control, type SubmitHandler, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box, Tabs, Tab, Typography, Paper, Alert, CircularProgress, Stack
} from '@mui/material';
import {
  Person, Work, FamilyRestroom, AccountBalance, ArrowBack
} from '@mui/icons-material';

import { useCitizenById } from './hooks/useCitizenById';
import { useProfileDraft } from './store/userStore';
import { profileSchema, type ProfileFormData } from './schemas/profileSchema';
import type { Citizen } from '../../entities/citizen/types';
import { ProfileHeader, type SectionItem } from './components/ProfileHeader';
import { ProfileActions } from './components/ProfileActions';

import { PersonalSection } from './components/sections/PersonalSection';
import { ContactsSection } from './components/sections/ContactsSection';
import { AddressesSection } from './components/sections/AddressesSection';
import { DocumentsSection } from './components/sections/DocumentsSection';
import { ChildrenSection } from './components/sections/ChildrenSection';
import { EducationSection } from './components/sections/EducationSection';
import { EmploymentSection } from './components/sections/EmploymentSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { LanguagesSection } from './components/sections/LanguagesSection';
import { SystemSection } from './components/sections/SystemSection';
import { FamilySection } from './components/sections/FamilySection';
import { MedicalSection } from './components/sections/MedicalSection';
import { MilitarySection } from './components/sections/MilitarySection';
import { MigrationSection } from './components/sections/MigrationSection';
import { LegalSection } from './components/sections/LegalSection';
import { FinanceSection } from './components/sections/FinanceSection';
import { PropertySection } from './components/sections/PropertySection';
import { HousingSection } from './components/sections/HousingSection';
import { BenefitsSection } from './components/sections/BenefitsSection';
import { AuditSection } from './components/sections/AuditSection';

const tabsConfig = [
  { id: 'personal', label: 'Основное', icon: <Person fontSize="small" /> },
  { id: 'career', label: 'Карьера и навыки', icon: <Work fontSize="small" /> },
  { id: 'family', label: 'Семья и учёт', icon: <FamilyRestroom fontSize="small" /> },
  { id: 'assets', label: 'Финансы и имущество', icon: <AccountBalance fontSize="small" /> },
];

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const { data: citizen, isLoading, error } = useCitizenById(id);
  const { setDraft, clearDraft } = useProfileDraft();

  const defaultValues: Partial<ProfileFormData> = {
    lastName: '',
    firstName: '',
    patronymic: '',
    birthDate: '',
    birthPlace: '',
    gender: 'male',
    maritalStatus: 'single',
    citizenship: '',
    nationality: '',
    phonePrimary: '',
    phoneSecondary: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    snils: '',
    inn: '',

    registrationAddress: {
      region: '', city: '', district: '', street: '', building: '',
      apartment: '', postalCode: '', isRegistered: true
    },
    actualAddress: {
      region: '', city: '', district: '', street: '', building: '',
      apartment: '', postalCode: '', isRegistered: undefined
    },

    hasChildren: false,
    childrenCount: 0,
    isLargeFamily: false,
    familyMembers: [],
    educationHistory: [],
    employmentHistory: [],

    medical: {
      bloodGroup: undefined,
      allergies: [],
      chronicDiseases: [],
      disabilityGroup: null,
      disabilityCertificate: '',
      lastCheckupDate: null
    },
    isVeteran: false,
    isPensioner: false,
    pensionType: null,
    socialBenefits: [],
    housingCondition: 'adequate',
    subsidyEligible: false,
    militaryCategory: 'fit',
    militaryUnit: null,
    rank: null,
    draftDate: null,
    conscriptionRegion: null,
    mobilizationStatus: 'civilian',

    financial: {
      taxNumber: '',
      bankAccountMasked: '',
      hasDebts: false,
      debtAmount: 0,
      propertyOwnership: [],
      incomeSource: 'employment'
    },
    system: {
      assignedOperator: '',
      department: '',
      verificationLevel: 'basic',
      dataConsentGiven: true,
      preferredLanguage: 'ru',
      communicationChannel: 'email',
      tags: [],
      internalNotes: ''
    },
    status: 'active',
    profileCompletionPercent: 0
  };

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormData>,
    mode: 'onChange',
    defaultValues: defaultValues as ProfileFormData,
  });

  const { control, handleSubmit, reset, formState: { isValid, isSubmitting } } = methods;
  
  useEffect(() => {
    if (citizen) {
      reset({ ...defaultValues, ...(citizen as unknown as Partial<ProfileFormData>) });
    }
  }, [citizen, reset]);
  
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (value) setDraft(value as unknown as Partial<Citizen>);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, setDraft]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    clearDraft();
    console.log('✅ Данные сохранены:', data);
    navigate('/registry');
  };

  if (isLoading) return <Box sx={{ p: 4, textAlign: 'center' }}><CircularProgress /></Box>;
  if (error || !citizen) return <Box sx={{ p: 4 }}><Alert severity="error">Гражданин не найден или ошибка загрузки</Alert></Box>;

  const fullName = `${citizen.lastName} ${citizen.firstName} ${citizen.patronymic || ''}`.trim();

  const sectionsForHeader: SectionItem[] = tabsConfig.map(tab => ({
    id: tab.id,
    title: tab.label,
    icon: tab.icon
  }));

  const statusMap: Record<string, 'active' | 'archived' | 'pending'> = {
    'активен': 'active', 'active': 'active',
    'архив': 'archived', 'archived': 'archived',
    'на проверке': 'pending', 'pending': 'pending'
  };
  const mappedStatus = statusMap[citizen.status as string] || 'active';

  const safeControl = control as unknown as Control<Record<string, any>>;

  return (
    <FormProvider {...methods}>
      <Box sx={{ 
        padding: { xs: '16px 0', sm: '16px' },
        pt: { xs: 2, md: 4 }, 
        pb: { xs: 12, sm: 10, md: 10 }, 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        ml: { xs: '0 !important', sm: 2 },     
        pl: { xs: 0, sm: 0 },      
        width: { xs: '100%', sm: 'auto' },
        maxWidth: { xs: '100vw', sm: 'none' },
        boxSizing: 'border-box',
        overflowX: 'hidden'
      }}>
        <Paper sx={{ 
          minWidth: 0, 
          maxWidth: 1100, 
          width: '100%', 
          mx: 0,         
          p: { xs: 1, sm: 1.5, md: 4 }, 
          borderRadius: { xs: 0, sm: 1.5, md: 3 }, 
          boxShadow: 3,
          boxSizing: 'border-box',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: (t) => t.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : t.palette.divider,
        }}>
          
          <Stack direction="row" sx={{ mb: { xs: 2, sm: 3 }, flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
            <Box onClick={() => navigate('/registry')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <ArrowBack fontSize="small" />
              <Typography variant="body2">Назад в картотеку</Typography>
            </Box>
            <Typography variant="caption" color="text.disabled">ID: {citizen.id}</Typography>
          </Stack>

          <ProfileHeader 
            fullName={fullName} 
            status={mappedStatus} 
            citizenId={citizen.id} 
            sections={sectionsForHeader} 
            onBack={() => navigate('/registry')} 
            onNavigateToSection={() => {}} 
          />

          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            mb: { xs: 2, md: 4 }, 
            minWidth: 0,
            overflow: 'hidden',
            width: '100%'
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="scrollable" 
              scrollButtons="auto" 
              allowScrollButtonsMobile
              sx={{
                minWidth: 0,
                width: '100%',
                '& .MuiTabs-flexContainer': { minWidth: 0, width: '100%' },
                '& .MuiTab-root': { 
                  minWidth: 0, 
                  px: { xs: 0.5, sm: 2 }, 
                  fontSize: { xs: '0.65rem', sm: '0.875rem' },
                  lineHeight: 1.2,
                  '& .MuiTab-icon': { 
                    fontSize: { xs: '0.85rem', sm: '1.25rem' }, 
                    mr: { xs: 0.3, sm: 1 } 
                  }
                },
                '& .MuiTabs-indicator': { height: 3 }
              }}
            >
              {tabsConfig.map((tab) => (
                <Tab key={tab.id} icon={tab.icon} iconPosition="start" label={tab.label} />
              ))}
            </Tabs>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} style={{ minWidth: 0, width: '100%' }}>
            <TabPanel value={activeTab} index={0}>
              <PersonalSection control={safeControl} />
              <ContactsSection control={safeControl} />
              <AddressesSection control={safeControl} />
              <DocumentsSection control={safeControl} />
              <ChildrenSection control={safeControl} />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <EducationSection control={safeControl} />
              <EmploymentSection control={safeControl} />
              <SkillsSection control={safeControl} />
              <LanguagesSection control={safeControl} />
              <SystemSection control={safeControl} />
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <FamilySection control={safeControl} />
              <MedicalSection control={safeControl} />
              <MilitarySection control={safeControl} />
              <MigrationSection control={safeControl} />
              <LegalSection control={safeControl} />
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <FinanceSection control={safeControl} />
              <PropertySection control={safeControl} />
              <HousingSection control={safeControl} />
              <BenefitsSection control={safeControl} />
              <AuditSection auditLogs={(citizen as any).auditLog || []} />
            </TabPanel>

            <ProfileActions
              isValid={isValid}
              isSubmitting={isSubmitting}
              onCancel={() => { clearDraft(); reset(); navigate('/registry'); }}
            />
          </form>
        </Paper>
      </Box>
    </FormProvider>
  );
}

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ display: value === index ? 'block' : 'none' }}>
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </Box>
  );
}