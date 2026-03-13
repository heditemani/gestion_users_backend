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
            await fetchProfile();
            setMessage('Profile mis à jour ✅');
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-2">
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>

                {/* Message */}
                {message && (
                    <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm text-center">
                        {message}
                    </div>
                )}

                {!editing ? (
                    <div className="space-y-3">
                        {/* Info */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Username</span>
                                <span className="font-medium text-gray-800">{user?.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Email</span>
                                <span className="font-medium text-gray-800">{user?.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Phone</span>
                                <span className="font-medium text-gray-800">{user?.phone || 'Mish محدد'}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <button
                            onClick={() => setEditing(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Badel Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
                        >
                            {loading ? 'Loading...' : 'Sauvgarder'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Annuler
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Profile;