import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Profile() {
    const { user, logout, fetchProfile } = useAuth();
    const navigate = useNavigate();
    
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            await api.put('/users/profile/', formData);
            await fetchProfile(); // Jded el data
            setMessage('Profile mis à jour!');
            setEditing(false);
        } catch {
            setMessage('Mochkla — a3wed tjarreb!');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>Profile</h2>
            
            {message && <p style={{ color: 'green' }}>{message}</p>}
            
            {!editing ? (
                // Ychouف profile
                <div>
                    <p><strong>Username:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Phone:</strong> {user?.phone || 'Mish محدد'}</p>
                    
                    <button onClick={() => setEditing(true)}>
                        Badel Profile
                    </button>
                    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                        Logout
                    </button>
                </div>
            ) : (
                // Ybadel profile
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Sauvgarder'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setEditing(false)}
                        style={{ marginLeft: '10px' }}
                    >
                        Annuler
                    </button>
                </form>
            )}
        </div>
    );
}

export default Profile;