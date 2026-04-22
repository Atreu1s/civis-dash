import { Grid, TextField, MenuItem, IconButton, Typography, Box } from '@mui/material';
import { Controller, useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { Language, Add, Remove } from '@mui/icons-material';

interface LanguagesSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'languages' });

  return (
    <SectionWrapper id="languages" title="Владение языками" icon={<Language color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Знание иностранных языков</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ name: '', level: 'b1', certificate: '' })} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>
      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
          Языки не добавлены
        </Typography>
      ) : (
        fields.map((field, i) => (
          <Box key={field.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth size="small" label="Язык" {...control.register(`languages.${i}.name`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller name={`languages.${i}.level`} control={control} render={({ field }) => (
                  <TextField size="small" select fullWidth {...field} disabled={!isEditable}>
                    <MenuItem value="native">Родной</MenuItem>
                    <MenuItem value="c2">C2 (Владею в совершенстве)</MenuItem>
                    <MenuItem value="c1">C1 (Продвинутый)</MenuItem>
                    <MenuItem value="b2">B2 (Выше среднего)</MenuItem>
                    <MenuItem value="b1">B1 (Средний)</MenuItem>
                    <MenuItem value="a2">A2 (Начальный)</MenuItem>
                  </TextField>
                )} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextField fullWidth size="small" label="Сертификат / Курс" {...control.register(`languages.${i}.certificate`)} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isEditable && <IconButton size="small" color="error" onClick={() => remove(i)}><Remove /></IconButton>}
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </SectionWrapper>
  );
};