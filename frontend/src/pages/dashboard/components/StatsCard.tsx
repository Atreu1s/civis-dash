import { Card, CardContent, Typography, Box, Avatar, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'success' | 'warning' | 'error' | 'info';
  trend?: number;
  isLoading?: boolean;
}

const StyledCard = styled(Card)({
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': { 
    transform: 'translateY(-4px)', 
    boxShadow: '0px 6px 12px rgba(0,0,0,0.1)' 
  },
});

export default function StatsCard({ title, value, icon, color, trend, isLoading }: StatsCardProps) {
  if (isLoading) return <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />;

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>{title}</Typography>
            <Typography variant="h3" sx={{ mt: 1, fontWeight: 700 }}>
              {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
            </Typography>
            {trend !== undefined && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1, color: trend >= 0 ? 'success.main' : 'error.main' }}>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% за месяц
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.lighter`, color: `${color}.main`, width: 48, height: 48 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </StyledCard>
  );
}