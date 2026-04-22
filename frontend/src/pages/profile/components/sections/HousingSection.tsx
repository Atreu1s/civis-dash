import { Grid, TextField, MenuItem, Switch, FormControlLabel } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { HomeWork } from '@mui/icons-material';

interface HousingSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const HousingSection: React.FC<HousingSectionProps> = ({ control, sectionRef, isEditable = true }) => (
  <SectionWrapper id="housing" title="Жилищные условия" icon={<HomeWork color="primary" />} sectionRef={sectionRef}>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="housing.type" control={control} render={({ field }) => (
          <TextField select fullWidth label="Тип жилья" {...field} disabled={!isEditable}>
            <MenuItem value="apartment">Квартира</MenuItem>
            <MenuItem value="house">Частный дом</MenuItem>
            <MenuItem value="dormitory">Общежитие</MenuItem>
            <MenuItem value="rental">Съёмное</MenuItem>
            <MenuItem value="none">Нет жилья</MenuItem>
          </TextField>
        )} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="housing.ownership" control={control} render={({ field }) => (
          <TextField select fullWidth label="Форма собственности" {...field} disabled={!isEditable}>
            <MenuItem value="private">Частная</MenuItem>
            <MenuItem value="municipal">Муниципальная</MenuItem>
            <MenuItem value="shared">Долевая</MenuItem>
          </TextField>
        )} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth type="number" label="Общая площадь (м²)" {...control.register('housing.area', { valueAsNumber: true })} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField fullWidth type="number" label="Кол-во зарегистрированных" {...control.register('housing.registeredCount', { valueAsNumber: true })} disabled={!isEditable} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="housing.hasSubsidy" control={control} render={({ field }) => (
          <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Право на субсидию ЖКХ" />
        )} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <Controller name="housing.isEmergency" control={control} render={({ field }) => (
          <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Аварийное жилье" />
        )} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField fullWidth multiline rows={2} label="Примечания по жилью" {...control.register('housing.notes')} disabled={!isEditable} />
      </Grid>
    </Grid>
  </SectionWrapper>
);