import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    
    if (loading) return <p>Loading...</p>;
    
    // Ila mish logged in → redirect lel login
    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;