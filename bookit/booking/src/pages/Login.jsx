import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password }, { withCredentials: true });
            if (response.status === 200) {
                const profile = await axios.get('/profile', { withCredentials: true });

                dispatch(login(response.data));

                toast.success('Signed in successfully');
                setTimeout(() => {
                    setRedirect(true);
                }, 1000);
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            toast.error('Invalid credentials');
        }
    };

    useGSAP(() => {
        let t = gsap.timeline();
        t.from('.heading', { x: -200, duration: 1, delay: 0.2, opacity: 0 });
        t.from('.form', { x: -200, duration: 1, opacity: 0 });
        t.from('.button', { x: 400, duration: 1, opacity: 0 }, '-=1');
        t.from('.register', { opacity: 0, duration: 1 });
    });

    return (
        <div className="mt-4 h-screen">
            <Toaster />
            {redirect && <Navigate to="/" />}
            <div className="h-full flex flex-col justify-start gap-10 items-center">
                <h1 className="heading text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input
                        className="form"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="form"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary button" type="submit">Login</button>
                    <div className="register text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-black" to="/register">Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
