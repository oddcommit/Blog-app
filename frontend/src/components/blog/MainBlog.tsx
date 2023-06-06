import BlogContent from './BlogContent';
import BlogDetails from './BlogDetails';

const MainBlog = () => {

        return(
        <>
            <BlogDetails/>
            <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
                <BlogContent/>
            </div>  
        </>
    )   
}

export default MainBlog;