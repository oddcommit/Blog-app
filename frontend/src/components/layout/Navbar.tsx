import { useNavigate, Link } from 'react-router-dom';   
import ThemeContext from '../Theme/ThemeContext';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { colorAction } from '../../redux/_actions/colorAction';

const Navbar = () => {

    const theme = useContext(ThemeContext);
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('auth');
        navigate('/login');
    }
    const dispatch = useDispatch();

    const selectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(colorAction(e.currentTarget.value));
    }

    return (
        <div style={{backgroundColor: theme.color}}  className="fixed w-full flex items-center justify-around h-14 bg-blue-800 text-white z-10">
            <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14  border-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                    <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                <span className="hidden md:block ms-2 uppercase">{(localStorage.getItem('auth')) ? (JSON.parse(localStorage.getItem('auth')|| "")).name:''}</span>
            </div>
            <div className="flex justify-between items-center h-14 header-right">
                <ul className="flex items-center">
                    <li>
                        <div style={{backgroundColor:theme.color}}  className="bg-blue-500 shadow-lg rounded-md flex items-center justify-around  text-white font-medium group">
                            <select className="block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-32 focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="option" onChange={selectOption}>
                                <option value="date">
                                    Date
                                </option>
                                <option value="likes">
                                    Likes
                                </option>
                                <option value="watches">
                                    Watches
                                </option>
                            </select>
                            
                        </div>
                    </li>
                    <li>
                        <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
                    </li>
                </ul>
                {
                localStorage.getItem('auth')?
                <ul className="flex items-center">
                    <li>
                        <button onClick={logout} className="flex items-center mr-4 hover:text-blue-100">
                            <span className="inline-flex mr-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </span>
                            Logout
                        </button>
                    </li>
                </ul>
                :
                <ul className="flex items-center">
                    <li>
                    <Link to="/register" className="flex items-center mr-4 hover:text-blue-100">
                        <span className="inline-flex mr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
                            </svg>
                        </span>
                        Register
                    </Link>
                    </li>
                    <li>
                        <Link to="/login" className="flex items-center mr-4 hover:text-blue-100">
                            <span className="inline-flex mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shield-lock" viewBox="0 0 16 16">
                                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                                </svg>
                            </span>
                            Login
                        </Link>
                    </li>
                </ul>
                }
            </div>
      </div>
    )
}

export default Navbar;