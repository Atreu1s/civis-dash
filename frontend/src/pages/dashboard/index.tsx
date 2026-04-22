import { Grid, Typography, Box, Card, CardContent, Skeleton, Chip, useTheme } from '@mui/material';
import { People, PersonAdd, CheckCircle, TaskAlt, TrendingUp } from '@mui/icons-material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line
} from 'recharts';
import StatsCard from './components/StatsCard';
import { useDashboardStats } from './hooks/useDashStats';

const BLUE_PALETTE = ['#bbdefb', '#64b5f6', '#2196f3', '#1976d2', '#0d47a1'];

export default function DashboardPage() {
  const theme = useTheme();
  const { data, isLoading, error } = useDashboardStats();
  const isDark = theme.palette.mode === 'dark';
  const chartCardSx = {
    bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(25, 118, 210, 0.1)',
    border: '1px solid',
    borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'primary.main',
    boxShadow: isDark ? '0 6px 18px rgba(0, 0, 0, 0.4)' : '0 6px 18px rgba(0, 0, 0, 0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .recharts-cartesian-grid-horizontal line, & .recharts-cartesian-grid-vertical line': {
      stroke: theme.palette.divider,
      strokeDasharray: '3 3'
    }
  };
  const pieData = (data?.regionDistribution ?? [])
    .slice(0, 5)
    .map((item, i) => ({ name: item.region, value: item.count, fill: BLUE_PALETTE[i % 5] }));

  const statusData = (data?.statusDistribution ?? []).map(item => ({
    name: item.status,
    value: item.count,
    fill: item.status === 'активен' ? '#22c55e' : 
          item.status === 'на проверке' ? '#f59e0b' : 
          item.status === 'заблокирован' ? '#ef4444' : '#94a3b8'
  }));

  const dynamicData = (data?.monthlyRegistrations ?? [])
    .slice(-6)
    .map(item => ({
      month: new Date(item.month).toLocaleString('ru', { month: 'short' }),
      registrations: item.registrations,
      verifications: item.verifications
    }));

  const regionActivityData = (data?.regionActivity ?? [])
    .slice(0, 5)
    .map(item => ({
      region: item.region.length > 10 ? item.region.slice(0, 10) + '…' : item.region,
      active: item.activeCount,
      pending: item.pendingCount
    }));

  const axisTickSx = { fontSize: 11, fill: theme.palette.text.secondary };
  const tooltipSx = {
    backgroundColor: theme.palette.background.paper,
    border: 'none', borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    color: theme.palette.text.primary
  };

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error" sx={{ mb: 4 }}>Не удалось загрузить статистику</Typography>
        <Typography variant="body2" color="text.secondary">Проверьте соединение или перезагрузите страницу</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ pt: { xs: 8, md: 6 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Статистика по учёту граждан</Typography>
          <Typography variant="body2" color="text.secondary">Агрегированные показатели реестра на текущий момент</Typography>
        </Box>
        <Chip sx={{ bgcolor: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(25, 118, 210, 0.1)', border: '1px solid', borderColor: 'primary.main' }} label="Период: 30 дней" size="small" variant="outlined" />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Всего граждан" value={data?.totalCitizens ?? 0} icon={<People color="primary" />} color="primary" trend={12.5} trendBold isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Новых за месяц" value={data?.newThisMonth ?? 0} icon={<PersonAdd color="primary" />} color="primary" trend={8.2} trendBold isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Активные записи" value={data?.activeRecords ?? 0} icon={<CheckCircle color="primary" />} color="primary" trend={-2.1} trendBold isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Обработано за неделю" value={data?.processedThisWeek ?? 0} icon={<TaskAlt color="primary" />} color="primary" trend={15.3} trendBold isLoading={isLoading} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={chartCardSx}>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Распределение по возрастным группам</Typography>
              {isLoading ? <Skeleton height={250} sx={{ borderRadius: 1 }} /> : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data?.ageDistribution ?? []}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="group" tick={axisTickSx} axisLine={false} tickLine={false} />
                    <YAxis tick={axisTickSx} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipSx} />
                    <Bar dataKey="count" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={chartCardSx}>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Топ регионов регистрации</Typography>
              {isLoading ? <Skeleton height={250} sx={{ borderRadius: 1 }} /> : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={2}>
                      {pieData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.fill} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipSx} />
                    <Legend verticalAlign="bottom" height={36} formatter={(v) => <span style={{ fontSize: 11, color: theme.palette.text.secondary }}>{v}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={chartCardSx}>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Динамика</Typography>
                <Chip icon={<TrendingUp fontSize="small" />} label="+24%" size="small" sx={{ bgcolor: 'rgba(34, 197, 94, 0.15)', color: 'success.main', fontWeight: 600 }} />
              </Box>
              {isLoading ? <Skeleton height={200} sx={{ borderRadius: 1 }} /> : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dynamicData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tick={axisTickSx} axisLine={false} tickLine={false} />
                    <YAxis tick={axisTickSx} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipSx} />
                    <Legend verticalAlign="top" height={30} wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="registrations" name="Регистрации" stroke={theme.palette.primary.main} strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="verifications" name="Проверено" stroke={theme.palette.success.main} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={chartCardSx}>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Статусы граждан</Typography>
              {isLoading ? <Skeleton height={200} sx={{ borderRadius: 1 }} /> : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={35} paddingAngle={2}>
                      {statusData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.fill} stroke="none" />)}
                    </Pie>
                    <Tooltip contentStyle={tooltipSx} />
                    <Legend verticalAlign="bottom" height={30} wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={chartCardSx}>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>Активность по регионам</Typography>
              {isLoading ? <Skeleton height={200} sx={{ borderRadius: 1 }} /> : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={regionActivityData} layout="vertical">
                    <CartesianGrid horizontal={true} vertical={false} />
                    <XAxis type="number" tick={axisTickSx} axisLine={false} tickLine={false} />
                    <YAxis dataKey="region" type="category" tick={axisTickSx} width={80} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipSx} />
                    <Legend verticalAlign="bottom" height={30} wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="active" name="Активные" stackId="a" fill={theme.palette.primary.main} radius={[0, 4, 4, 0]} />
                    <Bar dataKey="pending" name="На проверке" stackId="a" fill={theme.palette.warning.main} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}