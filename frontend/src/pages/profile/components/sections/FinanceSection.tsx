import { Grid, TextField, MenuItem, Typography, Box, Switch, FormControlLabel, Divider } from '@mui/material';
import { Controller, useWatch, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { AccountBalanceWallet, Payments } from '@mui/icons-material';

interface FinanceSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

export const FinanceSection: React.FC<FinanceSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const hasDebts = useWatch({ control, name: 'finance.hasDebts' });

  return (
    <SectionWrapper id="finance" title="Финансы и доходы" icon={<AccountBalanceWallet color="primary" />} sectionRef={sectionRef}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><Payments color="primary" /><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Основной доход</Typography></Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller name="finance.incomeSource" control={control} render={({ field }) => (
              <TextField select fullWidth label="Источник дохода" {...field} disabled={!isEditable}>
                <MenuItem value="salary">Зарплата</MenuItem>
                <MenuItem value="pension">Пенсия</MenuItem>
                <MenuItem value="business">Предпринимательство</MenuItem>
                <MenuItem value="freelance">Фриланс/Самозанятость</MenuItem>
                <MenuItem value="unemployed">Не работает</MenuItem>
              </TextField>
            )} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="Среднемесячный доход (₽)" {...control.register('finance.monthlyIncome', { valueAsNumber: true })} disabled={!isEditable} />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField fullWidth label="Номер расчётного счёта (карты)" {...control.register('finance.bankCardLast4', { maxLength: 4 })} placeholder="****" disabled={!isEditable} />
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Кредитная нагрузка</Typography></Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller name="finance.hasDebts" control={control} render={({ field }) => (
              <FormControlLabel control={<Switch checked={!!field.value} onChange={field.onChange} disabled={!isEditable} />} label="Имеются задолженности" />
            )} />
          </Grid>
          {hasDebts && (
            <>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField fullWidth type="number" label="Общая сумма задолженности (₽)" {...control.register('finance.totalDebtAmount', { valueAsNumber: true })} disabled={!isEditable} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller name="finance.debtType" control={control} render={({ field }) => (
                  <TextField select fullWidth label="Тип задолженности" {...field} disabled={!isEditable}>
                    <MenuItem value="mortgage">Ипотека</MenuItem>
                    <MenuItem value="consumer">Потребительский кредит</MenuItem>
                    <MenuItem value="tax">Налоговая</MenuItem>
                    <MenuItem value="utility">ЖКХ</MenuItem>
                  </TextField>
                )} />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </SectionWrapper>
  );
};