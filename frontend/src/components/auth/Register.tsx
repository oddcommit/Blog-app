import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface RegisterData {
    name: string;
    gmail: string;
    password1: string;
    password2: string;
}

const Register = () => {

    const navigate = useNavigate();
    const auth = (localStorage.getItem('auth') || '');
    // console.log(auth);
    useEffect(() => {
        if(auth) navigate('/mainblog', { replace: true});
        else navigate('/register');
    },[])

   const[formData, setFormData] = useState<RegisterData>({
    name: '',
    gmail: '',
    password1: '',
    password2: '',
   });
   

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(formData.password1 !== formData.password2) alert('Not same password');
        let users: Object [] = [];
        if(localStorage.getItem('users')) users = JSON.parse(localStorage.getItem('users') || '');

        let status = 0;
        users.forEach((user: any) => {
            if(user.gmail === formData.gmail) {
                alert('Gmail already exists');
                status = 1;
                return;
            }
        });

        if(status === 0) {
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/login', {replace: true});
        }
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
                [name]: value
        }));
   };

    return (
        <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5">
            <div className="text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" >
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 py-10 px-10">
                        <img className="h-full" src="./img/giorgio-trovato-8krX0HkXw8c-unsplash.jpg" alt="giorgio"/>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mb-10">
                                <label className="font-bold text-3xl text-gray-900">REGISTER</label>
                                <p>Enter your information to register</p>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label  className="text-xs font-semibold px-1">Username</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                            <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" name='name' value={formData.name} onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label  className="text-xs font-semibold px-1">Gmail</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                            <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" name='gmail' value={formData.gmail} onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label  className="text-xs font-semibold px-1">Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" name='password1' value={formData.password1} onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-12">
                                        <label  className="text-xs font-semibold px-1">Verify Password</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                            <input type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" name='password2' value={formData.password2} onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button type='submit' className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">REGISTER NOW</button>
                                    </div>
                                    <div className="w-40 px-3 mb-2">
                                        <Link to='/mainblog'  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 text-center">Back...</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;