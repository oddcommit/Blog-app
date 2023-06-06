import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/layout/Navbar';
import MainBlog from './components/blog/MainBlog';
import Register from './components/auth/Register';
import BlogNew from './components/blog/BlogNew';
import Login from './components/auth/Login.';
import BlogAll from './components/blog/BlogAll';
import ThemeContext from './components/Theme/ThemeContext';
import store from './redux/_store/store';
import { Provider } from 'react-redux';

function App() {

  const [color, setColor] = useState<string>('#1e40af');

  return (
        <Provider store={store}>
          <ThemeContext.Provider value={{color, setColor}}>
              <Router>
                <div>
                  <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                    <Navbar/>
                    <Routes>
                      <Route path='/' element={<MainBlog/>}/>
                      <Route path='/mainblog' element={<MainBlog/>}/>
                      <Route path='/login' element={<Login/>}/>
                      <Route path='/register' element={<Register/>}/>
                      <Route path='/new' element={<BlogNew/>}/>
                      <Route path='/allblog' element={<BlogAll/>}/>
                    </Routes>
                  </div>
                </div>
              </Router>
          </ThemeContext.Provider>
        </Provider>
  );
}

export default App;
