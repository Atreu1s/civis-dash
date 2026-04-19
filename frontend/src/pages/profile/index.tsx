import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { id } = useParams();
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#6b778d' }}>
      <h1>Профиль гражданина</h1>
      <p>ID: {id} • Раздел в разработке</p>
    </div>
  );
}