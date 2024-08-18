import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { logout } from '../features/user/userSlice'; // Adjust the import path to your actual file
import axios from 'axios';
import PlacesPage from './PlacesPage';
const Account = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.globaluser.user);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const handleLogout = async () => {

        // Dispatch the logout action
        await axios.post('/logout');
        dispatch(logout());
        setShouldNavigate(true);
    };

    if (!user || shouldNavigate) {
        return <Navigate to={'/login'} />;
    }

    let { subpage } = useParams();
    if (!subpage) {
        subpage = 'profile';
    }


    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={handleLogout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
};

export default Account;
