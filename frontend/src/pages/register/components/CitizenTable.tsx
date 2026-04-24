// src/pages/register/components/CitizenTable.tsx
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, LinearProgress, Typography
} from '@mui/material';
import { memo, useRef, useState, useEffect } from 'react';

// Типы
export interface CitizenRow {
  id: string;
  lastName: string;
  firstName: string;
  patronymic?: string;
  birthDate: string;
  phonePrimary: string;
  status: 'active' | 'archived' | 'pending';
}

interface CitizenTableProps {
  rows: CitizenRow[];
  isLoading?: boolean;
  onRowClick?: (citizen: CitizenRow) => void;
}

const ROW_HEIGHT = 52; 
const OVERSCAN = 10;  
const MIN_COLUMN_WIDTH = 100;

export const CitizenTable: React.FC<CitizenTableProps> = memo(({  rows, isLoading = false, onRowClick }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
  
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columns: ColumnDef<CitizenRow>[] = [
    { accessorKey: 'lastName', header: 'Фамилия', minSize: MIN_COLUMN_WIDTH },
    { accessorKey: 'firstName', header: 'Имя', minSize: MIN_COLUMN_WIDTH },
    { accessorKey: 'patronymic', header: 'Отчество', minSize: MIN_COLUMN_WIDTH },
    { accessorKey: 'birthDate', header: 'Дата рождения', minSize: MIN_COLUMN_WIDTH },
    { accessorKey: 'phonePrimary', header: 'Телефон', minSize: MIN_COLUMN_WIDTH },
    { 
      accessorKey: 'status', 
      header: 'Статус',
      minSize: MIN_COLUMN_WIDTH,
      cell: (info) => {
        const statusMap: Record<string, { label: string; color: string }> = {
          active: { label: 'Активен', color: 'success' },
          archived: { label: 'Архив', color: 'text.secondary' },
          pending: { label: 'На проверке', color: 'warning' },
        };
        const s = statusMap[info.getValue() as string] || statusMap.active;
        return (
          <Typography variant="body2" color={s.color as any} sx={{ fontWeight: 500 }}>
            {s.label}
          </Typography>
        );
      }
    },
  ];

  // TanStack Table
  const table = useReactTable({
    data: rows,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  const { rows: virtualRows } = table.getRowModel();
  
  const rowVirtualizer = useVirtualizer({
    count: virtualRows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: OVERSCAN,
    measureElement: 
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [rows.length, rowVirtualizer]);

  const handleRowClick = (row: CitizenRow) => {
    if (onRowClick) onRowClick(row);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: 2 }}>
      {isLoading && <LinearProgress />}
      
      <TableContainer 
        ref={tableContainerRef} 
        sx={{ 
          maxHeight: 'calc(100vh - 280px)', 
          overflow: 'auto',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
          '&::-webkit-scrollbar-thumb': { 
            bgcolor: 'action.hover', 
            borderRadius: 3,
            '&:hover': { bgcolor: 'action.disabled' }
          }
        }}
      >
        <Table stickyHeader size="medium">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell 
                    key={header.id} 
                    sx={{ 
                      fontWeight: 600, 
                      color: 'text.secondary',
                      minWidth: header.column.columnDef.minSize,
                      width: header.column.columnDef.size,
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          
          <TableBody>
            <tr style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
              <td colSpan={columns.length} style={{ padding: 0, margin: 0 }} />
            </tr>
            
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = virtualRows[virtualRow.index];
              return (
                <TableRow
                  key={row.id}
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  onClick={() => handleRowClick(row.original)}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': { bgcolor: 'action.hover' },
                    bgcolor: 'background.paper',
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id} 
                      sx={{ 
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 200]}
        component="div"
        count={rows.length}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={(_, newPage) => setPagination(p => ({ ...p, pageIndex: newPage }))}
        onRowsPerPageChange={(e) => setPagination(p => ({ ...p, pageSize: +e.target.value, pageIndex: 0 }))}
        sx={{ borderTop: '1px solid', borderColor: 'divider' }}
      />
    </Paper>
  );
});

CitizenTable.displayName = 'CitizenTable';