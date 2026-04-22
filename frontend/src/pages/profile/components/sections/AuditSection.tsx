import { List, ListItem, ListItemText, ListItemAvatar, Divider, Typography, Box, Chip, Avatar } from '@mui/material';
import { SectionWrapper, type SectionWrapperProps } from '../SectionWrapper';
import { AccessTime } from '@mui/icons-material';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

interface AuditSectionProps extends Pick<SectionWrapperProps, 'sectionRef'> {
  auditLogs?: AuditLogEntry[];
}

const formatTimestamp = (ts: string) => {
  try {
    return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(ts));
  } catch {
    return ts;
  }
};

export const AuditSection: React.FC<AuditSectionProps> = ({ sectionRef, auditLogs = [] }) => (
  <SectionWrapper id="audit" title="История изменений" icon={<AccessTime color="primary" />} sectionRef={sectionRef} readOnly>
    {auditLogs.length === 0 ? (
      <Typography variant="body2" color="text.secondary" sx={{ py: 3, textAlign: 'center', fontStyle: 'italic' }}>
        История изменений пока пуста
      </Typography>
    ) : (
      <List disablePadding sx={{ maxHeight: 320, overflowY: 'auto' }}>
        {auditLogs.map((log, i) => (
          <Box key={log.id}>
            <ListItem sx={{ px: 0, py: 1.5 }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  {log.actor.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {log.actor} <Chip label={log.action} size="small" variant="outlined" sx={{ ml: 1 }} />
                    </Typography>
                    <Chip icon={<AccessTime fontSize="small" />} label={formatTimestamp(log.timestamp)} size="small" variant="filled" />
                  </Box>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                    {log.details}
                  </Typography>
                }
              />
            </ListItem>
            {i < auditLogs.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    )}
  </SectionWrapper>
);