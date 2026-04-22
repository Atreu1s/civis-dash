import { Grid, TextField, IconButton, Typography, Box } from '@mui/material';
import { useFieldArray, type Control } from 'react-hook-form';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { Phone, Add, Remove, Email, Link } from '@mui/icons-material';

interface ContactsSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  control: Control<any>;
  isEditable?: boolean;
}

interface ContactListProps {
  title: string;
  fields: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  namePath: string;
  icon: React.ReactNode;
  placeholder: string;
  isEditable: boolean;
  control: Control<any>;
}

const ContactList = ({ title, fields, onAdd, onRemove, namePath, icon, placeholder, isEditable, control }: ContactListProps) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {icon} {title}
      </Typography>
      {isEditable && <IconButton size="small" onClick={onAdd} color="primary"><Add /></IconButton>}
    </Box>
    {fields.length === 0 ? (
      <Typography variant="caption" color="text.disabled">Не указано</Typography>
    ) : (
      fields.map((_, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <TextField fullWidth size="small" placeholder={placeholder} {...control.register(`${namePath}.${i}`)} disabled={!isEditable} />
          {isEditable && <IconButton size="small" color="error" onClick={() => onRemove(i)}><Remove /></IconButton>}
        </Box>
      ))
    )}
  </Box>
);

export const ContactsSection: React.FC<ContactsSectionProps> = ({ control, sectionRef, isEditable = true }) => {
  const phones = useFieldArray({ control, name: 'phones' });
  const emails = useFieldArray({ control, name: 'emails' });
  const socials = useFieldArray({ control, name: 'socials' });

  return (
    <SectionWrapper id="contacts" title="Контакты" icon={<Phone color="primary" />} sectionRef={sectionRef}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ContactList title="Телефоны" {...phones} onAdd={() => phones.append('')} onRemove={phones.remove} namePath="phones" icon={<Phone fontSize="small" />} placeholder="+7 (___) ___-__-__" isEditable={isEditable} control={control} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ContactList title="Email" {...emails} onAdd={() => emails.append('')} onRemove={emails.remove} namePath="emails" icon={<Email fontSize="small" />} placeholder="mail@example.com" isEditable={isEditable} control={control} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ContactList title="Соцсети / Мессенджеры" {...socials} onAdd={() => socials.append('')} onRemove={socials.remove} namePath="socials" icon={<Link fontSize="small" />} placeholder="tg: @username" isEditable={isEditable} control={control} />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Экстренный контакт (ФИО)" {...control.register('emergencyContact.name')} disabled={!isEditable} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Экстренный контакт (Телефон)" {...control.register('emergencyContact.phone')} disabled={!isEditable} />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};