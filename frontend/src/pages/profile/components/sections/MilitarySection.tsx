import { Grid, TextField, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { Controller, useWatch, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { MilitaryTech } from '@mui/icons-material';

interface MilitarySectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const MilitarySection: React.FC<MilitarySectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const isConscripted = useWatch({ control, name: 'military.isConscripted' });

  return (
    <SectionWrapper id="military" title="Военный учёт" icon={<MilitaryTech color="primary" />} sectionRef={sectionRef}>
      <Controller name="military.isConscripted" control={control} render={({ field }) => (
        <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Стоит на воинском учёте" sx={{ mb: 2 }} />
      )} />
      {isConscripted && (
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller name="military.category" control={control} render={({ field }) => (
              <TextField select fullWidth label="Категория годности" {...field} disabled={!isEditable}>
                <MenuItem value="A">Годен (А)</MenuItem>
                <MenuItem value="B">Годен с незначительными ограничениями (Б)</MenuItem>
                <MenuItem value="V">Ограниченно годен (В)</MenuItem>
                <MenuItem value="G">Временно не годен (Г)</MenuItem>
                <MenuItem value="D">Не годен (Д)</MenuItem>
              </TextField>
            )} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="Воинская часть / Комиссариат" {...control.register('military.unitOrOffice')} disabled={!isEditable} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="Воинское звание" {...control.register('military.rank')} disabled={!isEditable} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth type="date" label="Дата постановки на учёт" {...control.register('military.registrationDate')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth type="date" label="Дата снятия с учёта" {...control.register('military.deregistrationDate')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller name="military.isVeteranStatus" control={control} render={({ field }) => (
              <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Боевые действия / Ветеран" />
            )} />
          </Grid>
        </Grid>
      )}
    </SectionWrapper>
  );
};