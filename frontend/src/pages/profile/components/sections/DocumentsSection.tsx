import { Grid, TextField, MenuItem, Typography, Box, Divider } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper'; 
import { Description, Badge, CreditCard } from '@mui/icons-material';

interface DocumentsSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({ control, sectionRef, isEditable = true }) => (
  <SectionWrapper id="documents" title="Документы" icon={<Description color="primary" />} sectionRef={sectionRef}>
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Badge color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Паспорт РФ</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Серия" {...control.register('passport.series')} placeholder="0000" disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Номер" {...control.register('passport.number')} placeholder="000000" disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth type="date" label="Дата выдачи" {...control.register('passport.issueDate')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 3 }}><TextField fullWidth label="Код подразделения" {...control.register('passport.code')} placeholder="000-000" disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12 }}><TextField fullWidth label="Кем выдан" {...control.register('passport.issuedBy')} multiline rows={2} disabled={!isEditable} /></Grid>
      </Grid>
    </Box>

    <Divider sx={{ my: 2 }} />

    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CreditCard color="primary" />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Прочие документы</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="documents.driverLicense" control={control} render={({ field }) => (
            <TextField select fullWidth label="Водительское удостоверение" {...field} disabled={!isEditable}>
              <MenuItem value="none">Нет</MenuItem>
              <MenuItem value="cat_b">Категория B</MenuItem>
              <MenuItem value="cat_c">Категория C</MenuItem>
              <MenuItem value="cat_a">Категория A</MenuItem>
            </TextField>
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Загранпаспорт (серия/номер)" {...control.register('documents.foreignPassport')} disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 4 }}><TextField fullWidth label="Полис ОМС" {...control.register('documents.omsPolicy')} placeholder="0000000000000000" disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth type="date" label="Действителен до" {...control.register('documents.validUntil')} slotProps={{ inputLabel: { shrink: true } }} disabled={!isEditable} /></Grid>
        <Grid size={{ xs: 12, sm: 6 }}><TextField fullWidth label="Примечание" {...control.register('documents.notes')} disabled={!isEditable} /></Grid>
      </Grid>
    </Box>
  </SectionWrapper>
);