import { Grid, Typography, Box, Card, CardContent, Skeleton, Chip } from '@mui/material';
import { People, PersonAdd, CheckCircle, TaskAlt } from '@mui/icons-material'; // ✅ TaskAlt вместо Pending
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import StatsCard from './components/StatsCard';
import { useDashboardStats } from './hooks/useDashStats';

const BLUE_PALETTE = ['#bbdefb', '#64b5f6', '#2196f3', '#1976d2', '#0d47a1'];

export default function DashboardPage() {
  const { data, isLoading, error } = useDashboardStats();

  const pieData = (data?.regionDistribution ?? [])
    .slice(0, 5)
    .map((item: { region: string; count: number }, i: number) => ({
      ...item,
      fill: BLUE_PALETTE[i % BLUE_PALETTE.length]
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Статистика по учёту граждан</Typography>
          <Typography variant="body2" color="text.secondary">Агрегированные показатели реестра на текущий момент</Typography>
        </Box>
        <Chip sx={{
          bgcolor: 'rgba(25, 118, 210, 0.1)', 
          border: '1px solid', 
          borderColor: 'primary.main',
        }} label="Период: 30 дней" size="small" variant="outlined" />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard 
            title="Всего граждан" 
            value={data?.totalCitizens ?? 0} 
            icon={<People color="primary" />} 
            color="primary" 
            trend={12.5} 
            trendBold 
            isLoading={isLoading} 
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard 
            title="Новых за месяц" 
            value={data?.newThisMonth ?? 0} 
            icon={<PersonAdd color="primary" />} 
            color="primary" 
            trend={8.2} 
            trendBold 
            isLoading={isLoading} 
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard 
            title="Активные записи" 
            value={data?.activeRecords ?? 0} 
            icon={<CheckCircle color="primary" />} 
            color="primary" 
            trend={-2.1} 
            trendBold 
            isLoading={isLoading} 
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard 
            title="Обработано за неделю" 
            value={data?.processedThisWeek ?? 0} 
            icon={<TaskAlt color="primary" />} 
            color="primary" 
            trend={15.3} 
            trendBold 
            isLoading={isLoading} 
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ 
            bgcolor: 'rgba(25, 118, 210, 0.1)', 
            border: '1px solid', 
            borderColor: 'primary.main', 
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Распределение по возрастным группам</Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.ageDistribution ?? []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                    <XAxis dataKey="group" tick={{ fontSize: 12, color: '#666' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, color: '#666' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(25, 118, 210, 0.08)' }}
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="count" fill="#1976d2" radius={[6, 6, 0, 0]} animationDuration={500} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ 
            bgcolor: 'rgba(25, 118, 210, 0.1)', 
            border: '1px solid', 
            borderColor: 'primary.main',
            boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Топ регионов регистрации</Typography>
              {isLoading ? (
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 1 }} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie 
                      data={pieData} 
                      dataKey="count" 
                      nameKey="region" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80}
                      innerRadius={40} 
                      paddingAngle={2}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span style={{ color: '#666', fontSize: 12 }}>{value}</span>}
                    />
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