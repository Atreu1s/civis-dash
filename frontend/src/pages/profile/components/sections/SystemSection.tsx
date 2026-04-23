import { Grid, TextField, MenuItem, Switch, FormControlLabel, Typography, Box, Divider } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { Settings, Shield, Notifications, Info } from '@mui/icons-material';

interface SystemSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const SystemSection: React.FC<SystemSectionProps> = ({ control, sectionRef, isEditable = true }) => (
  <SectionWrapper id="system" title="Системные настройки" icon={<Settings color="primary" />} sectionRef={sectionRef}>
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><Shield color="primary" /><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Доступ и безопасность</Typography></Box>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="system.accessLevel" control={control} render={({ field }) => (
            <TextField select fullWidth label="Уровень доступа" {...field} disabled={!isEditable}>
              <MenuItem value="user">Пользователь</MenuItem>
              <MenuItem value="moderator">Модератор</MenuItem>
              <MenuItem value="admin">Администратор</MenuItem>
              <MenuItem value="readonly">Только чтение</MenuItem>
            </TextField>
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="system.mfaEnabled" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Двухфакторная аутентификация" />
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="system.sessionTimeout" control={control} render={({ field }) => (
            <TextField select fullWidth label="Таймаут сессии" {...field} disabled={!isEditable}>
              <MenuItem value="15">15 минут</MenuItem>
              <MenuItem value="30">30 минут</MenuItem>
              <MenuItem value="60">1 час</MenuItem>
              <MenuItem value="never">Нет</MenuItem>
            </TextField>
          )} />
        </Grid>
      </Grid>
    </Box>
    <Divider sx={{ my: 2 }} />
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><Notifications color="primary" /><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Уведомления и язык</Typography></Box>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="system.language" control={control} render={({ field }) => (
            <TextField select fullWidth label="Язык интерфейса" {...field} disabled={!isEditable}>
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="kz">Қазақша</MenuItem>
            </TextField>
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="system.notifyEmail" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Email-уведомления" />
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="system.notifySms" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="SMS-уведомления" />
          )} />
        </Grid>
      </Grid>
    </Box>
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><Info color="primary" /><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Внутренние заметки</Typography></Box>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth multiline rows={3} label="Заметки для операторов (не видны гражданину)" {...control.register('system.internalNotes')} disabled={!isEditable} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller name="system.dataConsent" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Согласие на обработку персональных данных" />
          )} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller name="system.thirdPartyConsent" control={control} render={({ field }) => (
            <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Согласие на передачу данных третьим лицам" />
          )} />
        </Grid>
      </Grid>
    </Box>
  </SectionWrapper>
);