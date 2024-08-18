import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Register = () => {
    useGSAP(() => {
        let t = gsap.timeline();
        t.from(".heading", {
            x: -200,
            duration: 1,
            delay: 0.2,
            opacity: 0
        });
        t.from(".form", {
            x: -200,
            duration: 1,
            opacity: 0
        });
        t.from(".button", {
            x: 400,
            duration: 1,
            opacity: 0
        }, "-=1");
        t.from(".login", {
            opacity: 0,
            duration: 1
        });
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', { name, email, password });
            toast.success("registration successfull");
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error registering user');
        }
    };

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="mt-4 h-screen">
            <Toaster />
            <div className="h-full flex flex-col justify-start gap-10 items-center">
                <h1 className="heading text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={submitHandler}>
                    <input
                        className='form'
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        className='form'
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className='form'
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button primary">Register</button>
                    <div className="login text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
