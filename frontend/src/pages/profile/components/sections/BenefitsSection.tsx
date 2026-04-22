import { Grid, TextField, MenuItem, IconButton, Typography, Box, Chip } from '@mui/material';
import { Controller, useFieldArray, useWatch, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { EmojiEvents, Add, Remove, CalendarToday } from '@mui/icons-material';

interface BenefitsSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'benefits' });
  
  const benefits = useWatch({ control, name: 'benefits' });

  return (
    <SectionWrapper id="benefits" title="Льготы и соц. поддержка" icon={<EmojiEvents color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Назначенные льготы</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ type: 'veteran', status: 'active', startDate: '', endDate: '', amount: '', documentRef: '' })} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
          Льготы не назначены
        </Typography>
      ) : (
        fields.map((field, i) => {
          const currentStatus = benefits?.[i]?.status;
          
          return (
            <Box key={field.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Controller name={`benefits.${i}.type`} control={control} render={({ field }) => (
                    <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                      <MenuItem value="veteran">Ветеран труда/СВО</MenuItem>
                      <MenuItem value="pensioner">Пенсионер</MenuItem>
                      <MenuItem value="large_family">Многодетная семья</MenuItem>
                      <MenuItem value="disability">Инвалидность</MenuItem>
                      <MenuItem value="housing">Субсидия ЖКХ</MenuItem>
                      <MenuItem value="child_benefit">Пособие на ребёнка</MenuItem>
                    </TextField>
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Controller name={`benefits.${i}.status`} control={control} render={({ field }) => (
                    <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                      <MenuItem value="active">Действует</MenuItem>
                      <MenuItem value="pending">На рассмотрении</MenuItem>
                      <MenuItem value="expired">Истекла</MenuItem>
                      <MenuItem value="suspended">Приостановлена</MenuItem>
                    </TextField>
                  )} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <TextField fullWidth size="small" label="Сумма выплаты (₽)" {...control.register(`benefits.${i}.amount`)} disabled={!isEditable} />
                </Grid>
                <Grid size={{ xs: 12, sm: 2 }}>
                  <Chip
                    icon={<CalendarToday />}
                    label={currentStatus === 'active' ? 'Активна' : 'Проверить'}
                    color={currentStatus === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField fullWidth size="small" type="date" label="Дата назначения" {...control.register(`benefits.${i}.startDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField fullWidth size="small" type="date" label="Дата окончания" {...control.register(`benefits.${i}.endDate`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextField fullWidth size="small" label="Основание (№ документа)" {...control.register(`benefits.${i}.documentRef`)} disabled={!isEditable} />
                </Grid>
              </Grid>
              {isEditable && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <IconButton size="small" color="error" onClick={() => remove(i)}><Remove /></IconButton>
                </Box>
              )}
            </Box>
          );
        })
      )}
    </SectionWrapper>
  );
};