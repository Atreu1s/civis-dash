import { Grid, TextField, MenuItem } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { AirplaneTicket } from '@mui/icons-material';

interface MigrationSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const MigrationSection: React.FC<MigrationSectionProps> = ({ control, sectionRef, isEditable = true }) => (
  <SectionWrapper id="migration" title="Миграционный учёт" icon={<AirplaneTicket color="primary" />} sectionRef={sectionRef}>
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="migration.status" control={control} render={({ field }) => (
          <TextField select fullWidth label="Статус пребывания" {...field} disabled={!isEditable}>
            <MenuItem value="citizen">Гражданин РФ</MenuItem>
            <MenuItem value="permanent">ВНЖ</MenuItem>
            <MenuItem value="temporary">РВП</MenuItem>
            <MenuItem value="visa">Виза</MenuItem>
            <MenuItem value="asylum">Убежище</MenuItem>
          </TextField>
        )} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="Номер миграционной карты / документа" {...control.register('migration.docNumber')} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="migration.purpose" control={control} render={({ field }) => (
          <TextField select fullWidth label="Цель визита/проживания" {...field} disabled={!isEditable}>
            <MenuItem value="work">Работа</MenuItem>
            <MenuItem value="study">Обучение</MenuItem>
            <MenuItem value="family">Воссоединение семьи</MenuItem>
            <MenuItem value="tourism">Туризм</MenuItem>
            <MenuItem value="transit">Транзит</MenuItem>
          </TextField>
        )} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth type="date" label="Дата въезда / выдачи" {...control.register('migration.entryDate')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth type="date" label="Срок действия / Дата выезда" {...control.register('migration.expiryDate')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth label="Принимающая сторона / Организация" {...control.register('migration.hostOrganization')} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField fullWidth multiline rows={2} label="Отметки / Ограничения на въезд" {...control.register('migration.restrictions')} disabled={!isEditable} />
      </Grid>
    </Grid>
  </SectionWrapper>
);