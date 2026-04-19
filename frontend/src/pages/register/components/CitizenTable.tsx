// src/pages/registry/components/CitizenTable.tsx
import { useNavigate } from 'react-router-dom';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from '@mui/material';
import type { Citizen } from '../../../entities/citizen/types';

interface CitizenTableProps {
  data: Citizen[];
  sorting: SortingState;
  onSortingChange: (updater: SortingState | ((prev: SortingState) => SortingState)) => void;
}

const columns: ColumnDef<Citizen>[] = [
  { id: 'fullName', header: 'ФИО', cell: ({ row }) => `${row.original.lastName} ${row.original.firstName} ${row.original.patronymic || ''}`.trim() },
  { accessorKey: 'birthDate', header: 'Дата рождения', cell: ({ getValue }) => new Date(getValue<string>()).toLocaleDateString('ru-RU') },
  { accessorKey: 'registrationAddress.region', header: 'Регион' },
  { accessorKey: 'status', header: 'Статус', cell: ({ getValue }) => <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(0,0,0,0.06)', fontSize: 12 }}>{getValue<string>()}</span> },
  { accessorKey: 'snils', header: 'СНИЛС' },
];

export default function CitizenTable({ data, sorting, onSortingChange }: CitizenTableProps) {
  const navigate = useNavigate();
  const table = useReactTable({
    data, columns, state: { sorting }, onSortingChange,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0) {
    return <Typography sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>Записи не найдены</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: 'auto', width: '100%' }}>
      {/* ✅ tableLayout: fixed + colgroup = колонки всегда 20% */}
      <Table sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <colgroup>
          {[0, 1, 2, 3, 4].map(i => <col key={i} style={{ width: '20%' }} />)}
        </colgroup>

        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{
                    width: '20%',
                    position: 'sticky', top: 0, zIndex: 2,
                    bgcolor: 'background.paper', borderBottom: '2px solid', borderColor: 'divider',
                    cursor: 'pointer', fontWeight: 600, userSelect: 'none',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    p: 2, '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted() as string] ?? ' ⇅'}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        {/* ✅ Обычный tbody без виртуализации — colgroup работает */}
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              onClick={() => navigate(`/profile/${row.original.id}`)}
              sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  sx={{
                    width: '20%',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    p: 2, boxSizing: 'border-box'
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}