import React,{useEffect,useState} from 'react';
import axios from 'axios';
import PieCha from './PieCha';

// const pageSize = 10;
 const Posts = () => {
    const [posts, setPosts] = useState();
    const [page,setPage]=useState(0);
    const [pageNum,setPageNum]=useState(0);
    useEffect(() => {
      axios.get(`https://dummyjson.com/products?skip=${page}&limit=10`)
      .then((res)=> {
        console.log(res.data);
        
        setPosts(res.data);
        setPageNum(res.data.total/10);
        
      })
    }, []);
    useEffect(() => {
        axios.get(`https://dummyjson.com/products?skip=${page}&limit=10`)
        .then((res)=> {
          console.log(res.data);
          
          setPosts(res.data);
          
          
        })
      }, [page]);
    const pages=[];
    for(let i =1;i<=pageNum;i++){
        pages.push(i);
    }
    if(!posts){
 return <div><p>Loading...</p></div>;
    }
    return  (
        <>
        <div style={{maxWidth:"25%",maxHeight:"25%",textAlign:"center",justifyContent:"center"}}>
         <h2  >Price Bucket Chart</h2>
        <PieCha/>
        </div>
        
        
        <div>
            
         {!posts ? ("No data found") : (
                    <table className='table table-striped '>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Brand</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Category</th>
                                <th>Thumbnail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            posts['products'].map((product,index)=>(
                                <tr key={index}> 
                                    <td>{product['id']}</td>
                                    <td>{product['brand']}</td>
                                    <td>{product['title']}</td>
                                    <td>{product['price']}</td>
                                    <td>{product['rating']}</td>
                                    <td>{product['category']}</td>
                                    <td><img src={product['thumbnail']} alt="thumbnail" style={{width:100,height:100,}}  /></td>
                                </tr>
                            ))
                            }

                        </tbody>
                        </table>
                        )}
                        <nav className='d-flex justify-content-center'>
                            <ul className='pagination'>
                                {pages.map((page,i)=>(
                                    <button onClick={()=>(setPage(i*10),setPosts(null))}  className='page-link'>{page}</button>
                                ))}

                            </ul>
                        </nav>

                        
        </div>
        </>

            // <div>
            // {!posts ? ("No data found") : (
            //         <table>
            //             <thead>
            //                 <tr>
            //                     <th>Brand</th>
            //                     {/* <th>Title</th>
            //                     <th>Price</th>
            //                     <th>Rating</th>
            //                     <th>Category</th>
            //                     <th>Thumbnail</th> */}
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                     {Object.entries(posts).map(([product,index]) => (
            //                     // {/* {posts.entries("products").map((product,index)=>( */}
            //                     <tr key={index}>
            //                         <td>{product}</td>
            //                         {/* <td>{post.title}</td>
            //                         <td>{post.price}</td>
            //                         <td>{post.rating}</td>
            //                         <td>{post.category}</td>
            //                         <td>{post.brand}</td> */}
            //                     </tr>
                                
            //                 ))}
            //             </tbody>
            //         </table>
                 
            // </div> 
           
            )
            
        }
        
export default Posts;