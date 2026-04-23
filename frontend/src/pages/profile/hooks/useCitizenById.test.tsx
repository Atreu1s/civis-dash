import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCitizenById } from './useCitizenById';
import { server } from '../../../setupTests';
import { http, HttpResponse } from 'msw';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, 
        gcTime: 0,    
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useCitizenById', () => {
  it('загружает данные гражданина', async () => {
    server.use(
      http.get('/api/citizens/:id', ({ params }) => {
        return HttpResponse.json({
          id: params.id,
          lastName: 'Тестов',
          firstName: 'Тест',
          status: 'active'
        });
      })
    );

    
    const { result } = renderHook(() => useCitizenById('citizen-123'), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.lastName).toBe('Тестов');
    expect(result.current.data?.id).toBe('citizen-123');
  });
});