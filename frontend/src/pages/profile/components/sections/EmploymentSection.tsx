import { Grid, TextField, MenuItem, IconButton, Typography, Box, Switch, FormControlLabel } from '@mui/material';
import { Controller, useFieldArray, useWatch, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { Work, Add, Remove } from '@mui/icons-material';

interface EmploymentSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const EmploymentSection: React.FC<EmploymentSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'employmentHistory' });
  const isEmployed = useWatch({ control, name: 'employmentStatus.isEmployed' });

  return (
    <SectionWrapper id="employment" title="Трудоустройство" icon={<Work color="primary" />} sectionRef={sectionRef}>
      <Controller
        name="employmentStatus.isEmployed"
        control={control}
        render={({ field }) => (
          <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Официально трудоустроен" sx={{ mb: 2 }} />
        )}
      />

      {isEmployed && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Места работы</Typography>
            {isEditable && <IconButton size="small" onClick={() => append({ company: '', position: '', startDate: '', endDate: '', type: 'fulltime', salary: '' })} color="primary"><Add /></IconButton>}
          </Box>

          {fields.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>Нет записей</Typography>
          ) : (
            fields.map((field, i) => (
              <Box key={field.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <TextField fullWidth size="small" label="Компания / Организация" {...control.register(`employmentHistory.${i}.company`)} disabled={!isEditable} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth size="small" label="Должность" {...control.register(`employmentHistory.${i}.position`)} disabled={!isEditable} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Controller name={`employmentHistory.${i}.type`} control={control} render={({ field }) => (
                      <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                        <MenuItem value="fulltime">Полная занятость</MenuItem>
                        <MenuItem value="parttime">Частичная</MenuItem>
                        <MenuItem value="contract">Срочный договор</MenuItem>
                        <MenuItem value="remote">Удалённая</MenuItem>
                      </TextField>
                    )} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth size="small" type="date" label="Дата приёма" {...control.register(`employmentHistory.${i}.startDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth size="small" type="date" label="Дата увольнения" {...control.register(`employmentHistory.${i}.endDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField fullWidth size="small" label="Средний доход (₽)" {...control.register(`employmentHistory.${i}.salary`)} disabled={!isEditable} />
                  </Grid>
                </Grid>
                {isEditable && <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}><IconButton size="small" color="error" onClick={() => remove(i)}><Remove /></IconButton></Box>}
              </Box>
            ))
          )}
        </>
      )}
    </SectionWrapper>
  );
};