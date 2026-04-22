import { TextField, MenuItem, IconButton, Typography, Box, Rating } from '@mui/material';
import { Controller, useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { EmojiEvents, Add, Remove } from '@mui/icons-material';

interface SkillsSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

  return (
    <SectionWrapper id="skills" title="Профессиональные навыки" icon={<EmojiEvents color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Компетенции и сертификаты</Typography>
        {isEditable && (
          <IconButton size="small" onClick={() => append({ name: '', level: 3, category: 'it', validUntil: '' })} color="primary">
            <Add />
          </IconButton>
        )}
      </Box>
      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', bgcolor: 'background.default', borderRadius: 2 }}>
          Навыки не указаны
        </Typography>
      ) : (
        fields.map((field, i) => (
          <Box key={field.id} sx={{ mb: 2, p: 2, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <TextField fullWidth size="small" label="Название навыка" {...control.register(`skills.${i}.name`)} disabled={!isEditable} sx={{ flex: '1 1 200px' }} />
            <Controller name={`skills.${i}.level`} control={control} render={({ field }) => (
              <Rating {...field} max={5} disabled={!isEditable} />
            )} />
            <Controller name={`skills.${i}.category`} control={control} render={({ field }) => (
              <TextField size="small" select {...field} disabled={!isEditable} sx={{ minWidth: 150 }}>
                <MenuItem value="it">IT / Цифровые</MenuItem>
                <MenuItem value="lang">Языки</MenuItem>
                <MenuItem value="tech">Технические</MenuItem>
                <MenuItem value="soft">Софт-скиллы</MenuItem>
              </TextField>
            )} />
            <TextField size="small" type="date" label="Действует до" {...control.register(`skills.${i}.validUntil`)} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} sx={{ minWidth: 140 }} />
            {isEditable && <IconButton size="small" color="error" onClick={() => remove(i)}><Remove /></IconButton>}
          </Box>
        ))
      )}
    </SectionWrapper>
  );
};