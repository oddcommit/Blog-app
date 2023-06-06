import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAllField from './BlogAllField';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/_reducers';


interface Blog {
  title: string;
  content: string;
  url:string;
  created_at: string;
  likes:number;
  watches: number;
  poster: string;
  increaseLike: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BlogALLContent = () => {

  const navigate = useNavigate();

  const [blogArray, setBlogArray] = useState([]);
  const [userArray, setUserArray] = useState([]);
  
  useEffect(() => {
    setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
    setUserArray(JSON.parse(localStorage.getItem('users') || ''));
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
          }
      })
      localStorage.setItem('blogs', JSON.stringify(blogs));
  
      setBlogArray(JSON.parse(localStorage.getItem('blogs') || ''));
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
          <div  className="grid grid-cols-1 justify-items-center gap-5 mt-10">
            {
              userArray.map((userArray: any, key) => {
                return (<div key={key}>
                <span className='text-red-800 underline text-5xl text-center flex items-center uppercase mb-10' key={key}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512">
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                    </svg>
                    {userArray.name}
                </span>
                {blogArray.map((blog:Blog ,key)=>{
                  if(userArray.gmail === blog.poster) {
                    return <BlogAllField key={key}
                    title={blog.title}
                    content={blog.content}
                    url={blog.url}
                    created_at={(new Date(parseInt(blog.created_at))).toTimeString()}
                    likes={blog.likes}
                    watches={blog.watches}
                    poster={blog.poster}
                    increaseLike = {increaseLike}
                  />
                  }
                })}
                  
              </div>)
              })
            }

          </div>
        </main>
    )
}

export default BlogALLContent;