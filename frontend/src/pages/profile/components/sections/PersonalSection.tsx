import { Grid, TextField, MenuItem, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { Person } from '@mui/icons-material';
import type { Control } from 'react-hook-form';

interface PersonalSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<Record<string, any>>;
  isEditable?: boolean;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ control, sectionRef, isEditable = true }) => (
  <SectionWrapper id="personal" title="Личные данные" icon={<Person color="primary" />} sectionRef={sectionRef}>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="Фамилия *" {...control.register('lastName')} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="Имя *" {...control.register('firstName')} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="Отчество" {...control.register('patronymic')} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth type="date" label="Дата рождения *" {...control.register('birthDate')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="gender" control={control} render={({ field }) => (
          <TextField select fullWidth label="Пол *" {...field} disabled={!isEditable}>
            <MenuItem value="male">Мужской</MenuItem>
            <MenuItem value="female">Женский</MenuItem>
          </TextField>
        )} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="СНИЛС" {...control.register('snils')} placeholder="000-000-000 00" disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="ИНН" {...control.register('inn')} placeholder="000000000000" disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="Место рождения" {...control.register('birthPlace')} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="citizenship" control={control} render={({ field }) => (
          <Autocomplete
            {...field}
            options={['РФ', 'Двойное', 'Иностранное', 'Без гражданства']}
            renderInput={(params) => <TextField {...params} label="Гражданство" />}
            disabled={!isEditable}
          />
        )} />
      </Grid>
    </Grid>
  </SectionWrapper>
);