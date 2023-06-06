import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface LoginData {
    gmail: string;
    password: string;
}

const Login  = () => {

    const navigate = useNavigate();
    const auth = (localStorage.getItem('auth') || '');
    useEffect(() => {
        if(auth !== '') navigate('/mainblog', { replace: true});
        else navigate('/login');
    },[])

    const[formData, setFormData] = useState<LoginData>({
        gmail: '',
        password: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
                [name]: value
        }));
   };


   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let users: Object [] = [];
        let status = 0;
        if(localStorage.getItem('users')) users = JSON.parse(localStorage.getItem('users') || '');
        users.forEach((user: any) => {
            if(user.gmail === formData.gmail && user.password1 === formData.password) {
                localStorage.setItem('auth', JSON.stringify(user));
                let cnt:number = parseInt(localStorage.getItem('allVisitor') || '');
                cnt++;
                localStorage.setItem('allVisitor', cnt.toString());
                navigate('/mainblog', { replace: true});
                status = 1;
            }
        })
        if(status === 0) alert('You are invalid user');
    }
    return (
        <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5">
            <div className="text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 py-10 px-10">
                        <img className="h-full" src="./img/giorgio-trovato-8krX0HkXw8c-unsplash.jpg" alt="giorgio"/>
                    </div>
                    <div className="w-full md:w-1/2  px-5 md:px-10 mt-10">
                        <div className="text-center mb-32">
                            <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
                            <p>Enter your information to login</p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="flex -mx-3 mb-8">
                                    <div className="w-full px-3 mb-5">
                                        <label  className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" name='gmail' value={formData.gmail} onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3 mb-3">
                                    <div className="w-full px-3 mb-8">
                                        <label  className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" name='password' value={formData.password} onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-2">
                                        <button type='submit' className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">LOGIN NOW</button>
                                    </div>
                                    <div className="w-40 px-3 mb-2">
                                        <Link to='/mainblog'  className="block w-full text-center max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3">Back...</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;