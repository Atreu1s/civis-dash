import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import type { DefaultValues, Resolver, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button, Box, Typography, Paper, Grid, TextField, MenuItem,
  Alert, Snackbar, IconButton, Divider, Switch, FormControlLabel,
  Stack, Chip, useTheme
} from '@mui/material';
import { ArrowBack, Save, Cancel, Person, Home, School, AccountBalance, Add, Remove } from '@mui/icons-material';
import { useCitizenById } from './hooks/useCitizenById';
import { useProfileDraft } from './store/userStore';
import { profileSchema, type ProfileFormData } from './schemas/profileSchema';
import type { Citizen } from '../../entities/citizen/types';

const sections = [
  { id: 'personal', title: 'Личные данные', icon: <Person /> },
  { id: 'addresses', title: 'Адреса', icon: <Home /> },
  { id: 'family', title: 'Семья и Образование', icon: <School /> },
  { id: 'finance', title: 'Финансы и Система', icon: <AccountBalance /> },
];

const defaultValues: DefaultValues<ProfileFormData> = {
  lastName: '', firstName: '', patronymic: '', birthDate: '', gender: 'male',
  phonePrimary: '', email: undefined,
  registrationAddress: { region: '', city: '', postalCode: '', street: '' },
  actualAddress: { region: '', city: '', postalCode: '', street: '' },
  familyMembers: [], educationHistory: [],
  financial: { incomeSource: 'employment', hasDebts: false },
  system: { preferredLanguage: 'ru', communicationChannel: 'email' },
};

export default function ProfilePage() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: citizen, isLoading, error } = useCitizenById(id);
  const { draft, setDraft, clearDraft } = useProfileDraft();

  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' as const });
  const isInitializing = useRef(true);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { control, handleSubmit, reset, watch, formState: { errors, isValid, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema) as Resolver<ProfileFormData>,
    mode: 'onChange',
    defaultValues,
  });

  const { fields: familyFields, append: appendFamily, remove: removeFamily } = useFieldArray({ control, name: 'familyMembers' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'educationHistory' });

  // ✅ Адаптивные пропсы для нативного date-инпута (инверсия иконки в тёмной теме)
  const dateFieldSlotProps = {
    inputLabel: { shrink: true },
    htmlInput: {
      sx: {
        '&::-webkit-calendar-picker-indicator': {
          filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
          opacity: 0.8,
          cursor: 'pointer'
        }
      }
    }
  };

  useEffect(() => {
    if (citizen && isInitializing.current) {
      const src = draft || citizen;
      reset({
        lastName: src.lastName || '',
        firstName: src.firstName || '',
        patronymic: src.patronymic || '',
        birthDate: src.birthDate?.split('T')[0] || '',
        gender: src.gender || 'male',
        phonePrimary: src.phonePrimary || '',
        email: src.email || undefined,
        registrationAddress: { region: src.registrationAddress?.region || '', city: src.registrationAddress?.city || '', postalCode: src.registrationAddress?.postalCode || '', street: src.registrationAddress?.street || '' },
        actualAddress: { region: src.actualAddress?.region || '', city: src.actualAddress?.city || '', postalCode: src.actualAddress?.postalCode || '', street: src.actualAddress?.street || '' },
        familyMembers: src.familyMembers?.map((m: any) => ({ fullName: m.fullName, relation: m.relation, birthDate: m.birthDate || '' })) || [],
        educationHistory: src.educationHistory?.map((e: any) => ({ institution: e.institution, level: e.level, graduationYear: e.graduationYear || undefined })) || [],
        financial: { incomeSource: src.financial?.incomeSource || 'employment', hasDebts: src.financial?.hasDebts ?? false },
        system: { preferredLanguage: src.system?.preferredLanguage || 'ru', communicationChannel: src.system?.communicationChannel || 'email' },
      });
      isInitializing.current = false;
    }
  }, [citizen, reset, draft]);

  useEffect(() => {
    if (isInitializing.current) return;
    const subscription = watch((value) => {
      if (value) setDraft(value as unknown as Partial<Citizen>);
    });
    return () => subscription.unsubscribe();
  }, [watch, setDraft]);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.style.transition = 'background-color 0.3s';
      el.style.backgroundColor = 'rgba(37, 99, 235, 0.08)';
      setTimeout(() => { el.style.backgroundColor = 'transparent'; }, 1500);
    }
  };

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setDraft(data as unknown as Partial<Citizen>);
    setSnack({ open: true, message: 'Профиль сохранён', severity: 'success' });
    setTimeout(() => { clearDraft(); navigate('/registry'); }, 1200);
  };

  if (isLoading) return <Box sx={{ pt: 10, textAlign: 'center', color: 'text.secondary' }}>Загрузка...</Box>;
  if (error || !citizen) return <Box sx={{ pt: 10 }}><Alert severity="error">Гражданин не найден или не выбран</Alert></Box>;

  return (
    <Box sx={{ pt: { xs: 2, md: 6 }, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Stack direction="row" sx={{ mb: 3, flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/registry')} variant="outlined">
          Назад в картотеку
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {sections.map(sec => (
            <Chip
              key={sec.id}
              icon={sec.icon}
              label={sec.title}
              onClick={() => scrollToSection(sec.id)}
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
              variant="outlined"
            />
          ))}
        </Box>
      </Stack>
      
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, boxShadow: 3, bgcolor: 'background.paper' }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>Редактирование профиля</Typography>
        
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* 📍 Основные */}
          <Box 
            ref={(el: HTMLDivElement | null) => { sectionRefs.current['personal'] = el; }} 
            sx={{ mb: 5, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 3 }}>
              <Person color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Основные</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth label="Фамилия *" {...control.register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth label="Имя *" {...control.register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth label="Отчество" {...control.register('patronymic')} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller name="birthDate" control={control} render={({ field }) => (
                  <TextField fullWidth type="date" label="Дата рождения *" {...field} slotProps={dateFieldSlotProps} error={!!errors.birthDate} helperText={errors.birthDate?.message} />
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller name="gender" control={control} render={({ field }) => (
                  <TextField select fullWidth label="Пол *" {...field}>
                    <MenuItem value="male">Мужской</MenuItem>
                    <MenuItem value="female">Женский</MenuItem>
                    <MenuItem value="other">Другой</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth label="Телефон *" {...control.register('phonePrimary')} error={!!errors.phonePrimary} helperText={errors.phonePrimary?.message} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth label="Email" {...control.register('email')} error={!!errors.email} helperText={errors.email?.message} />
              </Grid>
            </Grid>
          </Box>

          {/* 📍 Адреса */}
          <Box 
            ref={(el: HTMLDivElement | null) => { sectionRefs.current['addresses'] = el; }} 
            sx={{ mb: 5, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 2 }}>
              <Home color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Адреса</Typography>
            </Box>
            <Grid container spacing={4}>
              {(['registrationAddress', 'actualAddress'] as const).map((addrKey, i) => (
                <Grid key={addrKey} size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}>
                    {i === 0 ? 'Адрес регистрации' : 'Фактический адрес'}
                  </Typography>
                  <Divider sx={{ mb: 2, borderColor: 'divider' }} />
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}><TextField fullWidth label="Регион *" {...control.register(`${addrKey}.region` as any)} /></Grid>
                    <Grid size={{ xs: 6 }}><TextField fullWidth label="Город *" {...control.register(`${addrKey}.city` as any)} /></Grid>
                    <Grid size={{ xs: 6 }}><TextField fullWidth label="Улица" {...control.register(`${addrKey}.street` as any)} /></Grid>
                    <Grid size={{ xs: 6 }}>
                      <TextField fullWidth label="Индекс *" {...control.register(`${addrKey}.postalCode` as any)} 
                        error={!!errors[addrKey as 'registrationAddress']?.postalCode} 
                        helperText={errors[addrKey as 'registrationAddress']?.postalCode?.message} />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* 📍 Семья и Образование */}
          <Box 
            ref={(el: HTMLDivElement | null) => { sectionRefs.current['family'] = el; }} 
            sx={{ mb: 5, pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 2 }}>
              <School color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Семья и Образование</Typography>
            </Box>
            <Grid container spacing={4}>
              {/* Члены семьи */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction="row" sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>Члены семьи</Typography>
                  <IconButton size="small" color="primary" onClick={() => appendFamily({ fullName: '', relation: 'child', birthDate: '' })}>
                    <Add />
                  </IconButton>
                </Stack>
                {familyFields.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2, fontStyle: 'italic' }}>
                    Нет добавленных членов семьи
                  </Typography>
                ) : (
                  familyFields.map((field, i) => (
                    <Grid key={field.id} container spacing={1} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Grid size={12}><Typography variant="caption" color="text.secondary">Член семьи #{i + 1}</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 4 }}><TextField size="small" fullWidth placeholder="ФИО *" {...control.register(`familyMembers.${i}.fullName` as any)} /></Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Controller name={`familyMembers.${i}.relation` as any} control={control} render={({ field }) => (
                          <TextField size="small" select fullWidth {...field}>
                            <MenuItem value="child">Ребёнок</MenuItem>
                            <MenuItem value="spouse">Супруг(а)</MenuItem>
                            <MenuItem value="parent">Родитель</MenuItem>
                          </TextField>
                        )} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <TextField size="small" fullWidth type="date" {...control.register(`familyMembers.${i}.birthDate` as any)} slotProps={dateFieldSlotProps} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" color="error" onClick={() => removeFamily(i)}><Remove /></IconButton>
                      </Grid>
                    </Grid>
                  ))
                )}
              </Grid>
              
              {/* Образование */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack direction="row" sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>Образование</Typography>
                  <IconButton size="small" color="primary" onClick={() => appendEdu({ institution: '', level: 'secondary', graduationYear: undefined })}>
                    <Add />
                  </IconButton>
                </Stack>
                {eduFields.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2, fontStyle: 'italic' }}>
                    Нет записей об образовании
                  </Typography>
                ) : (
                  eduFields.map((field, i) => (
                    <Grid key={field.id} container spacing={1} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                      <Grid size={12}><Typography variant="caption" color="text.secondary">Запись #{i + 1}</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 5 }}><TextField size="small" fullWidth placeholder="Учебное заведение *" {...control.register(`educationHistory.${i}.institution` as any)} /></Grid>
                      <Grid size={{ xs: 12, sm: 3 }}>
                        <Controller name={`educationHistory.${i}.level` as any} control={control} render={({ field }) => (
                          <TextField size="small" select fullWidth {...field}>
                            <MenuItem value="secondary">Среднее общее</MenuItem>
                            <MenuItem value="spo">Среднее профессиональное (СПО)</MenuItem> 
                            <MenuItem value="specialist">Специалитет</MenuItem> 
                            <MenuItem value="bachelor">Бакалавр</MenuItem>
                            <MenuItem value="master">Магистр</MenuItem>
                          </TextField>
                        )} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 3 }}><TextField size="small" fullWidth type="number" placeholder="Год" {...control.register(`educationHistory.${i}.graduationYear` as any)} /></Grid>
                      <Grid size={{ xs: 12, sm: 1 }} sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton size="small" color="error" onClick={() => removeEdu(i)}><Remove /></IconButton>
                      </Grid>
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Box>

          {/* 📍 Финансы и Система */}
          <Box 
            ref={(el: HTMLDivElement | null) => { sectionRefs.current['finance'] = el; }} 
            sx={{ mb: 5 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 3 }}>
              <AccountBalance color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Финансы и Системные настройки</Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>Финансы</Typography>
                <Controller name="financial.incomeSource" control={control} render={({ field }) => (
                  <TextField select fullWidth label="Источник дохода *" {...field} sx={{ mb: 2 }}>
                    <MenuItem value="employment">Работа</MenuItem>
                    <MenuItem value="pension">Пенсия</MenuItem>
                    <MenuItem value="business">Бизнес</MenuItem>
                    <MenuItem value="unemployed">Не работает</MenuItem>
                  </TextField>
                )} />
                <Controller name="financial.hasDebts" control={control} render={({ field }) => (
                  <FormControlLabel 
                    control={<Switch checked={!!field.value} onChange={field.onChange} color="primary" />} 
                    label="Есть задолженности" 
                  />
                )} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>Системные настройки</Typography>
                <Controller name="system.preferredLanguage" control={control} render={({ field }) => (
                  <TextField select fullWidth label="Язык интерфейса" {...field} sx={{ mb: 2 }}>
                    <MenuItem value="ru">Русский</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="tt">Татарский</MenuItem>
                  </TextField>
                )} />
                <Controller name="system.communicationChannel" control={control} render={({ field }) => (
                  <TextField select fullWidth label="Канал связи" {...field}>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="sms">SMS</MenuItem>
                    <MenuItem value="phone">Телефон</MenuItem>
                    <MenuItem value="post">Почта</MenuItem>
                  </TextField>
                )} />
              </Grid>
            </Grid>
          </Box>

          {/* 📌 Нижняя панель действий */}
          <Box sx={{ 
            position: 'sticky', bottom: 0, pt: 3, pb: 2, 
            bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider',
            display: 'flex', justifyContent: 'space-between', zIndex: 10
          }}>
            <Button variant="outlined" onClick={() => { clearDraft(); reset(); }} startIcon={<Cancel />} color="error">
              Сбросить изменения
            </Button>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={() => navigate('/registry')}>
                Отмена
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                startIcon={<Save />} 
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить профиль'}
              </Button>
            </Stack>
          </Box>
        </form>
      </Paper>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({...s, open: false}))}>
        <Alert severity={snack.severity} sx={{ width: '100%' }}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
}