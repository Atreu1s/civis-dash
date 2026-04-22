import { Grid, TextField, MenuItem, IconButton, Typography, Box } from '@mui/material';
import { Controller, useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { RealEstateAgent, Add, Remove } from '@mui/icons-material';

interface PropertySectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const PropertySection: React.FC<PropertySectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'properties' });

  return (
    <SectionWrapper id="property" title="Имущество и активы" icon={<RealEstateAgent color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Зарегистрированное имущество</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ type: 'real_estate', description: '', value: '', registrationDate: '', ownershipShare: '100' })} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
          Имущество не указано
        </Typography>
      ) : (
        fields.map((field, i) => (
          <Box key={field.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller name={`properties.${i}.type`} control={control} render={({ field }) => (
                  <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                    <MenuItem value="real_estate">Недвижимость</MenuItem>
                    <MenuItem value="vehicle">Транспортное средство</MenuItem>
                    <MenuItem value="land">Земельный участок</MenuItem>
                    <MenuItem value="other">Прочее</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth size="small" label="Описание / Адрес / Гос. номер" {...control.register(`properties.${i}.description`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField fullWidth size="small" label="Оценочная стоимость (₽)" {...control.register(`properties.${i}.value`, { valueAsNumber: true })} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField fullWidth size="small" type="date" label="Дата регистрации" {...control.register(`properties.${i}.registrationDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 1 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isEditable && <IconButton size="small" color="error" onClick={() => remove(i)}><Remove /></IconButton>}
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </SectionWrapper>
  );
};