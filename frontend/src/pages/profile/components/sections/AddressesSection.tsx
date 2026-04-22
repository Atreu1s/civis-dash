import { Grid, TextField, FormControlLabel, Switch, Typography, Box } from '@mui/material';
import { Controller, useWatch, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper'; 
import { Home } from '@mui/icons-material';

interface AddressesSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

const AddressBlock = ({ prefix, title, control, isEditable }: { prefix: string; title: string; control: Control<any>; isEditable: boolean }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>{title}</Typography>
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Регион/Область *" {...control.register(`${prefix}.region`)} disabled={!isEditable} /></Grid>
      <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Город *" {...control.register(`${prefix}.city`)} disabled={!isEditable} /></Grid>
      <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Индекс" {...control.register(`${prefix}.postalCode`)} disabled={!isEditable} /></Grid>
      <Grid size={{ xs: 12, sm: 8 }}><TextField fullWidth label="Улица, дом, корпус, квартира" {...control.register(`${prefix}.street`)} disabled={!isEditable} /></Grid>
      <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Доп. информация" {...control.register(`${prefix}.additional`)} disabled={!isEditable} /></Grid>
    </Grid>
  </Box>
);

export const AddressesSection: React.FC<AddressesSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const isSame = useWatch({ control, name: 'addresses.areSame' });

  return (
    <SectionWrapper id="addresses" title="Адреса" icon={<Home color="primary" />} sectionRef={sectionRef}>
      <Controller
        name="addresses.areSame"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />}
            label="Адрес регистрации совпадает с фактическим"
            sx={{ mb: 2 }}
          />
        )}
      />
      <AddressBlock prefix="addresses.registration" title="Адрес регистрации" control={control} isEditable={isEditable} />
      {!isSame && <AddressBlock prefix="addresses.actual" title="Фактический адрес проживания" control={control} isEditable={isEditable} />}
    </SectionWrapper>
  );
};