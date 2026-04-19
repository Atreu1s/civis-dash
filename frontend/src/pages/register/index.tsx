import { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, MenuItem, TablePagination, Skeleton, InputAdornment } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import CitizenTable from '../register/components/CitizenTable';
import { useCitizens } from './hooks/useCitizen';
import type { SortingState } from '@tanstack/react-table';

const useDebounce = <T,>(value: T, delay: number): T => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

export default function RegistryPage() {
  const [page, setPage] = useState(0);
  const [limit] = useState(50);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [status, setStatus] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const debouncedSearch = useDebounce(search, 300); 

  const handleSortingChange = (updater: SortingState | ((prev: SortingState) => SortingState)) => {
    const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
    setSorting(newSorting);
    setPage(0);
  };

  const { data, isLoading, error } = useCitizens({
    page: page + 1,
    limit,
    search: debouncedSearch || undefined,
    region: region || undefined,
    status: status || undefined,
  });

  const handleReset = () => { setSearch(''); setRegion(''); setStatus(''); setPage(0); };

  if (error) return <Typography color="error" sx={{ p: 4 }}>Ошибка загрузки данных</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>Картотека граждан</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField 
          label="Поиск (ФИО/СНИЛС)" 
          size="small" 
          sx={{ flex: '1 1 200px' }}
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
        <TextField select label="Регион" size="small" value={region} onChange={(e) => { setRegion(e.target.value); setPage(0); }} sx={{ minWidth: 180 }}>
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="Москва">Москва</MenuItem>
          <MenuItem value="Санкт-Петербург">Санкт-Петербург</MenuItem>
          <MenuItem value="Московская область">Московская область</MenuItem>
          <MenuItem value="Казань">Казань</MenuItem>
          <MenuItem value="Новосибирск">Новосибирск</MenuItem>
        </TextField>
        <TextField select label="Статус" size="small" value={status} onChange={(e) => { setStatus(e.target.value); setPage(0); }} sx={{ minWidth: 160 }}>
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="active">Активен</MenuItem>
          <MenuItem value="pending_verification">На проверке</MenuItem>
          <MenuItem value="archived">Архив</MenuItem>
          <MenuItem value="blocked">Заблокирован</MenuItem>
        </TextField>
        <Button variant="outlined" onClick={handleReset} startIcon={<Clear />}>Сбросить</Button>
      </Box>
      {isLoading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[...Array(5)].map((_, i) => <Skeleton key={i} variant="rectangular" height={46} sx={{ borderRadius: 1 }} />)}
        </Box>
      ) : (
        <>
          <CitizenTable data={data?.data ?? []} sorting={sorting} onSortingChange={handleSortingChange} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <TablePagination
              component="div"
              count={data?.total ?? 0}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={limit}
              rowsPerPageOptions={[limit]}
              labelRowsPerPage="Записей на странице:"
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}