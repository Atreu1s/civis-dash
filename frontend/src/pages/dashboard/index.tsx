import { Grid, Typography, Box, Card, CardContent, Skeleton } from '@mui/material';
import { People, PersonAdd, CheckCircle, Pending } from '@mui/icons-material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie
} from 'recharts';
import StatsCard from './components/StatsCard';
import { useDashboardStats } from './hooks/useDashStats';

const COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0'];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardStats();

  const pieData = (data?.regionDistribution ?? [])
    .slice(0, 5)
    .map((item: { region: string; count: number }, i: number) => ({
      ...item,
      fill: COLORS[i % COLORS.length]
    }));

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
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>Обзор системы учёта граждан</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Агрегированные показатели реестра на текущий момент</Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Всего граждан" value={data?.totalCitizens ?? 0} icon={<People />} color="primary" trend={12.5} isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Новых за месяц" value={data?.newThisMonth ?? 0} icon={<PersonAdd />} color="success" trend={8.2} isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="Активные записи" value={data?.activeRecords ?? 0} icon={<CheckCircle />} color="primary" trend={-2.1} isLoading={isLoading} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard title="На проверке" value={data?.pendingVerification ?? 0} icon={<Pending />} color="warning" isLoading={isLoading} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Распределение по возрастным группам</Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.ageDistribution ?? []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="group" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: any, name: any) => [value ?? 0, name ?? 'Кол-во']} />
                    <Bar dataKey="count" fill="#1976d2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Топ регионов регистрации</Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} dataKey="count" nameKey="region" cx="50%" cy="50%" outerRadius={90} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}