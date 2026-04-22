import { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, MenuItem, TablePagination, Skeleton, InputAdornment, Paper, Divider } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCitizens } from './hooks/useCitizen';
import type { Citizen, CitizenStatus } from '../../entities/citizen/types';
import { StatusChip } from './components/StatusStyle';

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

const glassStyle = {
  bgcolor: 'rgba(25, 118, 210, 0.1)',
  border: '1px solid',
  borderColor: 'primary.main',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
  borderRadius: 2,
};

const scrollbarStyles = `
  .custom-scroll-container::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }
  .custom-scroll-container::-webkit-scrollbar-track {
    background: rgba(25, 118, 210, 0.1);
    border-radius: 3px;
  }
  .custom-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(25, 118, 210, 0.6);
    border-radius: 3px;
    transition: background 0.2s;
  }
  .custom-scroll-container::-webkit-scrollbar-thumb:hover {
    background: rgba(25, 118, 210, 0.8);
  }
  .custom-scroll-container::-webkit-scrollbar-button:horizontal {
    display: none;
  }
  .custom-scroll-container {
    scrollbar-width: thin;
    scrollbar-color: rgba(25, 118, 210, 0.6) rgba(25, 118, 210, 0.1);
  }
`;

export default function RegistryPage() {
  const [page, setPage] = useState(0);
  const [limit] = useState(50);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [status, setStatus] = useState<CitizenStatus | ''>('');
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 300); 

  const { data, isLoading, error } = useCitizens({
    page: page + 1,
    limit,
    search: debouncedSearch || undefined,
    region: region || undefined,
    status: status || undefined,
  });

  const handleReset = () => { setSearch(''); setRegion(''); setStatus(''); setPage(0); };

  if (error) return <Typography color="error" sx={{ p: 4 }}>Ошибка загрузки данных</Typography>;

  const citizens = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      <style>{scrollbarStyles}</style>
      
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700,  pt: 2 }}>
        Картотека граждан
      </Typography>
      
      {/* Фильтры */}
      <Paper sx={{ 
        ...glassStyle, 
        p: { xs: 2, md: 2 }, 
        mb: 2, 
      }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField 
            label="Поиск (ФИО/СНИЛС)" 
            size="small" 
            sx={{ 
              flex: '1 1 200px',
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
              }
            }}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <Button size="small" onClick={() => setSearch('')} sx={{ minWidth: 0, p: 0.5 }}>
                      <Clear fontSize="small" />
                    </Button>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
          <TextField 
            select 
            label="Регион" 
            size="small" 
            value={region} 
            onChange={(e) => { setRegion(e.target.value); setPage(0); }} 
            sx={{ 
              minWidth: 180,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover fieldset': { borderColor: 'primary.main' },
              }
            }}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="Москва">Москва</MenuItem>
            <MenuItem value="Санкт-Петербург">Санкт-Петербург</MenuItem>
            <MenuItem value="Московская область">Московская область</MenuItem>
            <MenuItem value="Казань">Казань</MenuItem>
            <MenuItem value="Новосибирск">Новосибирск</MenuItem>
          </TextField>
          <TextField 
            select 
            label="Статус" 
            size="small" 
            value={status} 
            onChange={(e) => { setStatus(e.target.value as CitizenStatus | ''); setPage(0); }} 
            sx={{ 
              minWidth: 160,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                '&:hover fieldset': { borderColor: 'primary.main' },
              }
            }}
          >
            <MenuItem value="">Все</MenuItem>
            <MenuItem value="активен">Активен</MenuItem>
            <MenuItem value="на проверке">На проверке</MenuItem>
            <MenuItem value="в архиве">Архив</MenuItem>
            <MenuItem value="заблокирован">Заблокирован</MenuItem>
          </TextField>
          <Button 
            variant="outlined" 
            onClick={handleReset} 
            startIcon={<Clear />}
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { bgcolor: 'white', borderColor: 'primary.dark' }
            }}
          >
            Сбросить
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ 
        ...glassStyle, 
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: 'calc(100vh - 200px)', md: '500px' },
        maxHeight: { xs: 'calc(100vh - 200px)', md: 'none' },
      }}>
        <Box 
          className="custom-scroll-container"
          sx={{ 
            overflow: 'auto',
            flex: 1,
            minWidth: 0,
            p: { xs: 1, md: 2 },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[...Array(3)].map((_, i) => (
                <Paper key={i} sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.5)' }}>
                  <Skeleton width="60%" height={24} sx={{ mb: 1 }} />
                  <Divider sx={{ my: 1 }} />
                  {[...Array(4)].map((__, j) => (
                    <Skeleton key={j} width="40%" height={16} sx={{ mb: 0.5 }} />
                  ))}
                </Paper>
              ))}
            </Box>
          ) : citizens.length === 0 ? (
            <Typography sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
              Записи не найдены
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {citizens.map((citizen: Citizen) => (
                <Paper
                  key={citizen.id}
                  onClick={() => navigate(`/profile/${citizen.id}`)}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid',
                    borderColor: 'rgba(25, 118, 210, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.25)',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',        
                    gap: { xs: 1.5, md: 2 }, 
                    alignItems: 'flex-start'
                  }}>
                    
                    <Box sx={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: { xs: 700, md: 400 }, 
                        color: { xs: 'primary.main', md: 'text.secondary' },
                        mb: 0.5
                      }}>
                        ФИО
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {citizen.lastName} {citizen.firstName} {citizen.patronymic || ''}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: { xs: 700, md: 400 }, 
                        color: { xs: 'primary.main', md: 'text.secondary' },
                        mb: 0.5
                      }}>
                        Дата
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {citizen.birthDate ? new Date(citizen.birthDate).toLocaleDateString('ru-RU') : '—'}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: { xs: 700, md: 400 }, 
                        color: { xs: 'primary.main', md: 'text.secondary' },
                        mb: 0.5
                      }}>
                        Регион
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {citizen.registrationAddress?.region || '—'}
                      </Typography>
                    </Box>

                    <Box sx={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: { xs: 700, md: 400 }, 
                        color: { xs: 'primary.main', md: 'text.secondary' },
                        mb: 0.5
                      }}>
                        Статус
                      </Typography>
                      <StatusChip status={citizen.status as CitizenStatus} size="small" />
                    </Box>

                    <Box sx={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <Typography variant="caption" sx={{ 
                        fontWeight: { xs: 700, md: 400 }, 
                        color: { xs: 'primary.main', md: 'text.secondary' },
                        mb: 0.5
                      }}>
                        СНИЛС
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace', letterSpacing: 0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {citizen.snils || '—'}
                      </Typography>
                    </Box>

                  </Box>
                </Paper>
              ))}
            </Box>
          )}

          {!isLoading && citizens.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, pb: 1 }}>
              <TablePagination
                component="div"
                count={data && !Array.isArray(data) ? data.total ?? 0 : 0}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                rowsPerPage={limit}
                rowsPerPageOptions={[limit]}
                labelRowsPerPage="Записей:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
                sx={{ 
                  '& .MuiTablePagination-toolbar': { minHeight: 'auto' },
                  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { 
                    m: 0, fontSize: '0.875rem' 
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}