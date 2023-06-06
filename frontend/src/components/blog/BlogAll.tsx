import BlogALLContent from './BlogALLContent';
import BlogDetails from './BlogDetails';

const BlogAll = () => {

        return(
        <>
            <BlogDetails/>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                <BlogALLContent/>
            </div>  
        </>
    )   
}

export default BlogAll;