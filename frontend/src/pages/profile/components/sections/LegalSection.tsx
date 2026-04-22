import { Grid, TextField, MenuItem, IconButton, Typography, Box } from '@mui/material';
import { Controller, useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { Gavel, Add, Remove } from '@mui/icons-material';

interface LegalSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const LegalSection: React.FC<LegalSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'legalRecords' });

  return (
    <SectionWrapper id="legal" title="Судебная информация" icon={<Gavel color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Записи о делах и ограничениях</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ caseNumber: '', type: 'fine', status: 'active', date: '', description: '' })} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>
      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
          Записи отсутствуют
        </Typography>
      ) : (
        fields.map((field, i) => (
          <Box key={field.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth size="small" label="№ Дела / Протокола" {...control.register(`legalRecords.${i}.caseNumber`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller name={`legalRecords.${i}.type`} control={control} render={({ field }) => (
                  <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                    <MenuItem value="fine">Штраф</MenuItem>
                    <MenuItem value="court">Судебное дело</MenuItem>
                    <MenuItem value="restriction">Запрет на выезд</MenuItem>
                    <MenuItem value="other">Иное</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller name={`legalRecords.${i}.status`} control={control} render={({ field }) => (
                  <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                    <MenuItem value="active">Активно</MenuItem>
                    <MenuItem value="resolved">Закрыто</MenuItem>
                    <MenuItem value="appealed">Ожидает обжалования</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth size="small" type="date" label="Дата вынесения" {...control.register(`legalRecords.${i}.date`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth size="small" label="Описание / Исполнительный орган" {...control.register(`legalRecords.${i}.description`)} disabled={!isEditable} />
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