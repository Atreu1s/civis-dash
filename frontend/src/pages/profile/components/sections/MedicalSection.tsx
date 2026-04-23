import { Grid, TextField, MenuItem, Typography, Box, Divider, FormControlLabel, Switch } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { LocalHospital, Vaccines, AccessibilityNew } from '@mui/icons-material';

interface MedicalSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const MedicalSection: React.FC<MedicalSectionProps> = ({ control, sectionRef, isEditable = true }) => (
  <SectionWrapper id="medical" title="Медицинские данные" icon={<LocalHospital color="primary" />} sectionRef={sectionRef}>
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><Vaccines color="primary" /><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Страхование и полисы</Typography></Box>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Полис ОМС" {...control.register('medical.omsPolicy')} placeholder="0000 000000 0" disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Полис ДМС" {...control.register('medical.dmsPolicy')} placeholder="Номер полиса" disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Страховая компания" {...control.register('medical.insuranceCompany')} disabled={!isEditable} /></Grid>
      </Grid>
    </Box>

    <Divider sx={{ my: 2 }} />

    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><AccessibilityNew color="primary" /><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Здоровье и инвалидность</Typography></Box>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="medical.bloodGroup" control={control} render={({ field }) => (
            <TextField select fullWidth label="Группа крови" {...field} disabled={!isEditable}>
              <MenuItem value="none">Не указана</MenuItem>
              <MenuItem value="I+">I (Rh+)</MenuItem><MenuItem value="I-">I (Rh-)</MenuItem>
              <MenuItem value="II+">II (Rh+)</MenuItem><MenuItem value="II-">II (Rh-)</MenuItem>
              <MenuItem value="III+">III (Rh+)</MenuItem><MenuItem value="III-">III (Rh-)</MenuItem>
              <MenuItem value="IV+">IV (Rh+)</MenuItem><MenuItem value="IV-">IV (Rh-)</MenuItem>
            </TextField>
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="medical.disabilityGroup" control={control} render={({ field }) => (
            <TextField select fullWidth label="Группа инвалидности" {...field} disabled={!isEditable}>
              <MenuItem value="none">Нет</MenuItem>
              <MenuItem value="I">I группа</MenuItem><MenuItem value="II">II группа</MenuItem><MenuItem value="III">III группа</MenuItem>
            </TextField>
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField fullWidth type="date" label="Последний медосмотр" {...control.register('medical.lastCheckup')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller name="medical.isDonor" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Почётный донор" />
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller name="medical.hasChronic" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Есть хронические заболевания" />
          )} />
        </Grid>
      </Grid>
    </Box>

    <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
      <Grid size={{ xs: 12 }}>
        <TextField fullWidth multiline rows={3} label="Примечания / Аллергии / Противопоказания" {...control.register('medical.notes')} disabled={!isEditable} />
      </Grid>
    </Grid>
  </SectionWrapper>
);