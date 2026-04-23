import { Grid, TextField, MenuItem, IconButton, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { Controller, useFieldArray, useWatch, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { ChildCare, PersonAdd, Remove } from '@mui/icons-material';

interface ChildrenSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const ChildrenSection: React.FC<ChildrenSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'children' });
  const hasChildren = useWatch({ control, name: 'hasChildren' });

  return (
    <SectionWrapper id="children" title="Дети" icon={<ChildCare color="primary" />} sectionRef={sectionRef}>
      <Controller
        name="hasChildren"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />}
            label="Есть дети"
            sx={{ mb: 2 }}
          />
        )}
      />

      {hasChildren && (
        <>
          <Grid spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth type="number" label="Количество детей" {...control.register('childrenCount', { valueAsNumber: true })} disabled={!isEditable} />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Controller name="isLargeFamily" control={control} render={({ field }) => (
                <FormControlLabel control={<Checkbox checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Многодетная семья" />
              )} />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Список детей</Typography>
            {isEditable && (
              <IconButton size="small" onClick={() => append({ fullName: '', birthDate: '', school: '', hasDisability: false })} color="primary">
                <PersonAdd />
              </IconButton>
            )}
          </Box>

          {fields.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
              Добавьте информацию о детях
            </Typography>
          ) : (
            fields.map((field, i) => (
              <Box key={field.id} sx={{ p: 2, mb: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth size="small" label="ФИО ребёнка *" {...control.register(`children.${i}.fullName`)} disabled={!isEditable} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <TextField fullWidth size="small" type="date" label="Дата рождения" {...control.register(`children.${i}.birthDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Controller name={`children.${i}.educationStatus`} control={control} render={({ field }) => (
                      <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                        <MenuItem value="kindergarten">Детский сад</MenuItem>
                        <MenuItem value="school">Школа</MenuItem>
                        <MenuItem value="college">Колледж/ВУЗ</MenuItem>
                        <MenuItem value="not_studying">Не обучается</MenuItem>
                      </TextField>
                    )} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FormControlLabel
                      control={<Controller name={`children.${i}.hasDisability`} control={control} render={({ field }) => (
                        <Checkbox checked={!!field.value} onChange={field.onChange} disabled={!isEditable} size="small" />
                      )} />}
                      label="Имеет льготы"
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
        </>
      )}
    </SectionWrapper>
  );
};