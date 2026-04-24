import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCitizenById } from './useCitizenById';
import { server } from '../../../setupTests';
import { http, HttpResponse } from 'msw';

const createWrapper = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
};

describe('useCitizenById', () => {
  it('успешно загружает данные', async () => {
    server.use(
      http.get('/api/citizens/:id', () => HttpResponse.json({ id: 'cit-1', lastName: 'Тестов', status: 'active' }))
    );

    const { result } = renderHook(() => useCitizenById('cit-1'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.lastName).toBe('Тестов');
  });

  it('обрабатывает ошибку сети', async () => {
    server.use(
      http.get('/api/citizens/:id', () => HttpResponse.json({ error: 'Not Found' }, { status: 404 }))
    );

    const { result } = renderHook(() => useCitizenById('cit-99'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});