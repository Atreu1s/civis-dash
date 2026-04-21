import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: 'primary' | 'success' | 'warning' | 'error';
  trend?: number;
  trendBold?: boolean; 
  isLoading?: boolean;
}

export default function StatsCard({ 
  title, 
  value, 
  icon,
  trend, 
  trendBold = false, 
  isLoading 
}: StatsCardProps) {
  if (isLoading) {
    return (
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Skeleton width={40} height={40} sx={{ mb: 2, borderRadius: 1 }} />
          <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
          <Skeleton width="40%" height={32} />
        </CardContent>
      </Card>
    );
  }

  const trendColor = trend && trend >= 0 ? 'success.main' : 'error.main';
  const trendSign = trend && trend >= 0 ? '+' : '';
1
  return (
    <Card sx={{ 
      height: '100%', 
      bgcolor: 'rgba(25, 118, 210, 0.2)', 
      border: '1px solid', 
      borderColor: 'primary.main',        
      transition: 'transform 0.2s',
      boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
      '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 16px rgba(25, 118, 210, 0.3)' }
    }}>
      <CardContent>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          </Box>
          <Box sx={{ 
            p: 1.5, 
            borderRadius: 2, 
            bgcolor: 'primary.lighter', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            {icon}
          </Box>
          
        </Box>
        {trend !== undefined && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: trendColor, 
                fontWeight: trendBold ? 700 : 500, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5 
              }}
            >
              {trendSign}{trend}%
            </Typography>
          )}
        
      </CardContent>
    </Card>
  );
}