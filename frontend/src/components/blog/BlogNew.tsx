import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { newBlogAction } from "../../redux/_actions/newBlogAction";
import BlogDetails from "./BlogDetails";
import axios from "axios";
import { BASE_URL } from "../../redux/contstant";

interface BlogNewData {
    title: string;
    content: string;
    url: string;
    created_at: string;
    likes: number;
    watches: number;
    poster:string;
}

const BlogNew = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();  

    const [formData, setFormData] = useState<BlogNewData>({
        title: '',
        content: '',
        url: '',
        created_at: (Date.now()).toString(),
        likes: 0,
        watches: 0,
        poster: (localStorage.getItem('auth')) ? (JSON.parse(localStorage.getItem('auth')|| "")).gmail:'',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
                [name]: value
        }));
   };

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

        const auth = (localStorage.getItem('auth') || '');
        if(auth === '') {
            alert('You are invalid user');
            navigate('/login');
        }
        else {
            let blogs: Object [] = [];
            if(localStorage.getItem('blogs')) blogs = JSON.parse(localStorage.getItem('blogs') || '');
            blogs.push(formData);

            dispatch(newBlogAction(formData));
            localStorage.setItem('blogs', JSON.stringify(blogs));
            alert('Success');
            axios.post(`${BASE_URL}api/blogs/add`, formData)
                .then((res) => console.log(res))
                .catch(err=> console.log(err))
            navigate('/mainblog');
        }
    }

    return(
        <>
            <BlogDetails/>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                <div className="container mt-28 mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white">
                        <form onSubmit={handleSubmit}>
                            <span className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Title</span>
                            <input  className="mb-10 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Title" name="title" onChange={handleInputChange} required value={formData.title}/>
                            <label  className="text-gray-800 text-sm font-bold leading-tight tracking-normal">Content</label>
                            <div className="relative mb-10 mt-2">
                                <input type="text"  className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-32 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Cotent" name="content" onChange={handleInputChange} required value={formData.content}/>
                            </div>
                            <input  className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full  py-2 pl-3 text-sm border-gray-300 rounded border mb-10" id="upload" type="file" name="url" onChange={handleInputChange} required value={formData.url}/>
                            <div className="flex items-center justify-start w-full">
                                <button type='submit' className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                                <Link to='/mainblog' className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" >Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogNew;