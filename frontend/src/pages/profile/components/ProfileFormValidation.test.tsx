import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../schemas/profileSchema';

const TestForm = () => {
  const methods = useForm({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: { lastName: '', firstName: '', phonePrimary: '', status: 'active' }
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(vi.fn())} data-testid="profile-form">
        <input {...methods.register('lastName')} aria-label="Фамилия" />
        <input {...methods.register('firstName')} aria-label="Имя" />
        <input {...methods.register('phonePrimary')} aria-label="Телефон" />
        <button type="submit">Сохранить</button>
        {methods.formState.errors.lastName && <span role="alert" data-testid="error">{methods.formState.errors.lastName.message}</span>}
      </form>
    </FormProvider>
  );
};

describe('ProfileForm Validation', () => {
  it('блокирует отправку и показывает ошибку при пустых полях', async () => {
    render(<TestForm />);
    fireEvent.click(screen.getByRole('button', { name: /сохранить/i }));
    await waitFor(() => expect(screen.getByTestId('error')).toHaveTextContent(/минимум 2 символа/i));
  });
});