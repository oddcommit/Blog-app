import { useState, useEffect } from 'react';
import BlogField from './BlogField';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../Theme/ThemeContext';
import { useContext } from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { blogAction } from '../../redux/_actions/blogAction';
import { RootState } from '../../redux/_reducers';
import { BASE_URL } from '../../redux/contstant';

interface Blog {
  title: string;
  content: string;
  url:string;
  created_at: string;
  likes:number;
  watches: number;
  poster: string;
  viewBlog: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface currentBlog {
  title: string;
  content: string;
  url:string;
  created_at: string;
  likes:number;
  watches: number;
  poster: string;
}



const BlogContent = () => {

  const [currentView, setCurrentView] = useState<currentBlog>({
      title:'',
      content: '',
      url: '',
      created_at: '',
      likes: 0,
      watches: 0,
      poster: '',
  })
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [blogArray, setBlogArray] = useState([]);
  const [url, setUrl] = useState('');
  const theme = useContext(ThemeContext);
  
  useEffect(() => {
    setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
  },[])
  
  const increaseLike = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    const auth = (localStorage.getItem('auth') || '');
    if(auth === '') {
        alert('You are invalid user');
        navigate('/login');
    }
    else {
      let blogs: Object [] = [];
      if(localStorage.getItem('blogs')) blogs = JSON.parse(localStorage.getItem('blogs') || '');
      blogs.forEach((blog: any) => {
          if(blog.created_at === e.currentTarget.id && (JSON.parse(auth)).gmail !== e.currentTarget.name) {
            blog.likes++;

            const newLike = {
              likes: blog.likes,
              created_at:blog.created_at,
            }
            localStorage.setItem('currentView', JSON.stringify(blog));
            setCurrentView(blog);
            axios.put(`${BASE_URL}api/blogs/updateLike`, newLike)
                .then((res) => console.log(res))
                .catch(err=> console.log(err))
            return;
          }
      })
      localStorage.setItem('blogs', JSON.stringify(blogs));
  
      setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
    }
  }
  const dispatch = useDispatch();

  const viewBlog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {


    dispatch(blogAction(e.currentTarget.id));

      let blogs: Object [] = [];
      if(localStorage.getItem('blogs')) blogs = JSON.parse(localStorage.getItem('blogs') || '');
      blogs.forEach((blog: any) => {
          if((new Date(parseInt(blog.created_at))).toTimeString() === e.currentTarget.id) {
            blog.watches++;
            setCurrentView(blog);
            localStorage.setItem('currentView', JSON.stringify(blog));

            const updateData = {
              watches: blog.watches,
              created_at: blog.created_at,
            }
            axios.put(`${BASE_URL}api/blogs/updatewatch`, updateData)
                .then((res) => console.log(res))
                .catch(err=> console.log(err))
            return;
          }
      })
      localStorage.setItem('blogs', JSON.stringify(blogs));
      let curUrl = (JSON.parse(localStorage.getItem('currentView') || '')).url;
      let url = './img/'.concat(curUrl.slice(12, curUrl.length));
      setUrl(url);
      setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
      setShowModal(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setCurrentView(prevState => ({
          ...prevState,
              [name]: value
      }));
  };

  const updateBlog = () => {


    const auth = (localStorage.getItem('auth') || '');
      if(auth === '') {
          alert('You are invalid user');
          navigate('/login');
      }
      else {
          let blogs: Object [] = [];
          if(localStorage.getItem('blogs')) blogs = JSON.parse(localStorage.getItem('blogs') || '');
          blogs.forEach((blog: any) => {
            if(blog.created_at === currentView.created_at) {
              blog.content = currentView.content;
              blog.title = currentView.title;
              blog.url = currentView.url; 
              const updateData = {
                created_at:currentView.created_at,
                content: currentView.content,
                title: currentView.title,
                url: currentView.url,
              }     
              localStorage.setItem('currentView', JSON.stringify(blog));
              axios.put(`${BASE_URL}api/blogs/update`, updateData)
                .then((res) => console.log(res))
                .catch(err=> console.log(err))
              setShowModal(false);
              return;
            }
            localStorage.setItem('blogs', JSON.stringify(blogs));
            setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
            })
          }
     }

     const { filter } = useSelector((state:RootState) => state);

     useEffect(() => {
        let blogs: Object [] = [];
        if(localStorage.getItem('blogs')) blogs = JSON.parse(localStorage.getItem('blogs') || '');
  
        switch(filter.colorVariable) {
          case 'likes':
            blogs.sort(function(a: any, b: any){return b.likes - a.likes});
            break;
          case 'watches':
            blogs.sort(function(a: any, b: any){return b.watches - a.watches});
            break;
          case 'date':
            blogs.sort(function(a: any, b: any){return (parseInt(b.created_at)) - (parseInt(a.created_at))});
            break;
          default:
            break;
        }
  
        localStorage.setItem('blogs', JSON.stringify(blogs));
        setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
     },[filter.colorVariable]);

  
    return (
        <main>
          <div  className="fixed grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-4 gap-4">
            <div style={{backgroundColor:theme.color}}  className="bg-blue-500 shadow-lg rounded-md flex items-center justify-around p-3 text-white font-medium group">
              <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-45">
                <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <div className="text-right">
                <p className="text-2xl">{localStorage.getItem('allVisitor')}</p>
                <p>ALL Visitors</p>
              </div>
            </div>
          </div>

          <div  className="grid grid-cols-1 justify-items-center lg:grid-cols-1 xl:grid-cols-3  gap-1 mt-10">
            {blogArray.map((blog:Blog ,key) => {
              return <BlogField key={key}
                title={blog.title}
                content={blog.content}
                url={blog.url}
                created_at={(new Date(parseInt(blog.created_at))).toTimeString()}
                likes={blog.likes}
                watches={blog.watches}
                poster={blog.poster}
                viewBlog = {viewBlog}
              />
            })}

          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-64 md:w-auto my-1 mx-auto max-w-6xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Blog View</h3>
                      <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"onClick={() => setShowModal(false)}>
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                      </button>
                    </div>
                    <div >
                        <img className="object-cover w-80 md:w-full h-80  md:h-96 rounded-lg" src={url} alt='alex-knight'/>
                        <input  className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full  py-2 pl-3 text-sm border-gray-300 rounded border mb-10" id="upload" type="file" name="url" onChange={handleInputChange}/>
                        <div className='flex justify-between'>
                          <button id={currentView.created_at} name={currentView.poster} onClick={increaseLike} className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                            </svg>
                            <span>{(JSON.parse(localStorage.getItem('currentView') || '')).likes}</span>
                          </button>
                          <div className="text-sm text-gray-500 dark:text-gray-300 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                            <span>{currentView.watches}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between py-6 lg:mx-6">
                        <input  className="text-4xl font-semibold text-gray-800 hover:underline dark:text-white " value={currentView.title} name='title' onChange={handleInputChange}/>
                        <input  className="text-xl font-semibold text-gray-800  dark:text-white " value={currentView.content} name='content' onChange={handleInputChange}/>
                        <span className="text-sm text-gray-500 dark:text-gray-300">{(new Date(parseInt(currentView.created_at))).toTimeString()}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-300">{currentView.poster}</span>
                      </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"type="button" onClick={() => setShowModal(false)}>
                        Close
                      </button>
                      <button  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"type="submit"
                        onClick={updateBlog}>
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
            
        </main>
    )
}

export default BlogContent;