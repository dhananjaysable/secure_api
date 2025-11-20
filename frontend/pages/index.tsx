import { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { apiClient } from '../lib/api-client';
import { User } from '../types/api';

export default function Home() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      setEmail('');
      setPassword('');
    } else {
      alert('Login failed!');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await apiClient.get<User[]>('/users');
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
        <h1>Secure API Demo</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.75rem' }}>
            Login
          </button>
        </form>
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5' }}>
          <h3>Demo Credentials:</h3>
          <p>Email: john.doe@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Secure API Demo</h1>
        <div>
          <span>Welcome, {user?.firstName}!</span>
          <button onClick={logout} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={fetchUsers} 
          disabled={loading}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>
      </div>

      {users.length > 0 && (
        <div>
          <h2>Users List</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '0.75rem' }}>{user.id}</td>
                  <td style={{ padding: '0.75rem' }}>{user.firstName} {user.lastName}</td>
                  <td style={{ padding: '0.75rem' }}>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f8ff', border: '1px solid #ccc' }}>
        <h3>Security Features Demonstrated:</h3>
        <ul>
          <li>✅ JWT Authentication</li>
          <li>✅ End-to-End Encryption</li>
          <li>✅ Secure Headers</li>
          <li>✅ CORS Configuration</li>
          <li>✅ Input Validation</li>
          <li>✅ Error Handling</li>
        </ul>
      </div>
    </div>
  );
}