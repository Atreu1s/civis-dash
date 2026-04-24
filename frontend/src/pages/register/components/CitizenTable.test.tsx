// src/pages/register/components/CitizenTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CitizenTable, type CitizenRow } from './CitizenTable';

vi.mock('@tanstack/react-virtual', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useVirtualizer: vi.fn((config) => {
      return {
        getVirtualItems: () => 
          Array.from({ length: config.count }, (_, i) => ({
            index: i,
            start: i * (config.estimateSize?.() || 50),
            end: (i + 1) * (config.estimateSize?.() || 50),
            size: config.estimateSize?.() || 50,
            measureRef: vi.fn(),
          })),
        getTotalSize: () => config.count * (config.estimateSize?.() || 50),
        measure: vi.fn(),
        measureElement: vi.fn(),
      };
    }),
  };
});

const mockRows: CitizenRow[] = [
  { id: '1', lastName: 'Петров', firstName: 'Алексей', birthDate: '1990-05-15', phonePrimary: '+79991234567', status: 'active' },
  { id: '2', lastName: 'Сидоров', firstName: 'Иван', birthDate: '1985-02-20', phonePrimary: '+79997654321', status: 'pending' },
];

describe('CitizenTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('рендерит данные и обрабатывает клик по строке', () => {
    const onRowClick = vi.fn();
    render(<CitizenTable rows={mockRows} onRowClick={onRowClick} />);

    expect(screen.getByText('Петров')).toBeInTheDocument();
    expect(screen.getByText('Активен')).toBeInTheDocument();

    const row = screen.getByText('Петров').closest('tr');
    if (row) fireEvent.click(row);
    expect(onRowClick).toHaveBeenCalledWith(mockRows[0]);
  });

  it('корректно рендерит пустую таблицу', () => {
    render(<CitizenTable rows={[]} />);
    expect(screen.queryByText('Петров')).not.toBeInTheDocument();
  });

  it('показывает индикатор загрузки', () => {
    render(<CitizenTable rows={[]} isLoading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});