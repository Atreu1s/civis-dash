import { Grid, TextField, IconButton, Typography, Box, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Controller, useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { ChildCare, PersonAdd, Remove } from '@mui/icons-material';

interface FamilySectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'familyMembers' });

  return (
    <SectionWrapper id="family" title="Семья" icon={<ChildCare color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">Члены семьи и иждивенцы</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ fullName: '', relation: 'child', birthDate: '', isDependent: false })} color="primary">
            <PersonAdd />
          </IconButton>
        )}
      </Box>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', fontStyle: 'italic', bgcolor: 'background.default', borderRadius: 2 }}>
          Нет добавленных членов семьи
        </Typography>
      ) : (
        fields.map((field, i) => (
          <Box key={field.id} sx={{ p: 2, mb: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth size="small" label="ФИО *" {...control.register(`familyMembers.${i}.fullName`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller name={`familyMembers.${i}.relation`} control={control} render={({ field }) => (
                  <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                    <MenuItem value="spouse">Супруг(а)</MenuItem>
                    <MenuItem value="child">Ребёнок</MenuItem>
                    <MenuItem value="parent">Родитель</MenuItem>
                    <MenuItem value="other">Другой родственник</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth size="small" type="date" label="Дата рождения" {...control.register(`familyMembers.${i}.birthDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                <FormControlLabel
                  control={
                    <Controller name={`familyMembers.${i}.isDependent`} control={control} render={({ field }) => (
                      <Checkbox checked={!!field.value} onChange={field.onChange} disabled={!isEditable} size="small" />
                    )} />
                  }
                  label="Иждивенец"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
                />
              </Grid>
            </Grid>
            {isEditable && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton size="small" color="error" onClick={() => remove(i)}><Remove /></IconButton>
              </Box>
            )}
          </Box>
        ))
      )}
    </SectionWrapper>
  );
};