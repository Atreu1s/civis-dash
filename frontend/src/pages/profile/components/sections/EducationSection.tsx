import { Grid, TextField, MenuItem, IconButton, Typography, Box, Chip } from '@mui/material';
import { Controller, useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { School, Add, Remove, CheckCircle, Pending } from '@mui/icons-material';

interface EducationSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'educationHistory' });

  return (
    <SectionWrapper id="education" title="Образование" icon={<School color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">История обучения</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ level: 'secondary', institution: '', startYear: '', endYear: '', specialization: '', isCompleted: false })} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
          Нет записей об образовании
        </Typography>
      ) : (
        fields.map((field, i) => (
          <Box key={field.id} sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller name={`educationHistory.${i}.level`} control={control} render={({ field }) => (
                  <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                    <MenuItem value="secondary">Среднее общее</MenuItem>
                    <MenuItem value="spo">Среднее профессиональное</MenuItem>
                    <MenuItem value="bachelor">Бакалавриат</MenuItem>
                    <MenuItem value="specialist">Специалитет</MenuItem>
                    <MenuItem value="master">Магистратура</MenuItem>
                    <MenuItem value="phd">Аспирантура / Кандидат наук</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth size="small" label="Учебное заведение *" {...control.register(`educationHistory.${i}.institution`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField fullWidth size="small" type="number" label="Год начала" {...control.register(`educationHistory.${i}.startYear`, { valueAsNumber: true })} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <TextField fullWidth size="small" type="number" label="Год окончания" {...control.register(`educationHistory.${i}.endYear`, { valueAsNumber: true })} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField fullWidth size="small" label="Специальность / Направление" {...control.register(`educationHistory.${i}.specialization`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth size="small" label="Номер диплома" {...control.register(`educationHistory.${i}.diplomaNumber`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Controller name={`educationHistory.${i}.isCompleted`} control={control} render={({ field }) => (
                  <Chip 
                    label={field.value ? 'Завершено' : 'В процессе'} 
                    color={field.value ? 'success' : 'warning'} 
                    size="small" 
                    onClick={() => field.onChange(!field.value)}
                    icon={field.value ? <CheckCircle /> : <Pending />}
                    clickable={!isEditable}
                  />
                )} />
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