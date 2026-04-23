import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProfileHeader } from './ProfileHeader';

describe('ProfileHeader', () => {
  const mockProps = {
    fullName: 'Петров Алексей Сергеевич',
    status: 'active' as const,
    citizenId: 'cit-123',
    onBack: vi.fn(),
    sections: [{ id: 'personal', title: 'Основное', icon: undefined }],
    onNavigateToSection: vi.fn(),
  };

  it('отображает ФИО и статус', () => {
    render(<ProfileHeader {...mockProps} />);
    expect(screen.getByText('Петров Алексей Сергеевич')).toBeInTheDocument();
    expect(screen.getByText('Активен')).toBeInTheDocument();
  });

  it('вызывает onBack при клике', async () => {
    render(<ProfileHeader {...mockProps} />);
    await userEvent.click(screen.getByRole('button', { name: /назад/i }));
    expect(mockProps.onBack).toHaveBeenCalledTimes(1);
  });
});