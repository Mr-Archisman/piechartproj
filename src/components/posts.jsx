import React,{useEffect,useState} from 'react';
import axios from 'axios';
import PieCha from './PieCha';
import '../App.css';

 const pageSize = 10;
 
 const Posts = () => {
    
    const [posts, setPosts] = useState();
    const [page,setPage]=useState(0);
    const [pageNum,setPageNum]=useState(0);
    const[currentPage,setCurrentPage]=useState(1);
    
    useEffect(() => {
      axios.get(`https://dummyjson.com/products?skip=${page}&limit=10`)
      .then((res)=> {
        console.log(res.data);
        
        setPosts(res.data);
        setPageNum(res.data.total/pageSize);
        
      })
    }, []);
    
    useEffect(() => {
        axios.get(`https://dummyjson.com/products?skip=${page}&limit=10`)
        .then((res)=> {
          console.log(res.data);
          
          setPosts(res.data);
          window.scrollTo(0, 0);
          
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
        <div className='row container-fluid d-flex w-full mx-auto ' style={{ background: 'linear-gradient(to bottom, #000000 -91%, #5a5a5a 143%)'}}>
            <div className='col-3'></div>
                <div className="col-6 align-self-center pb-4 mx-auto " style={{maxWidth:"40%",maxHeight:"25%",textAlign:"center",justifyContent:"center",paddingLeft:"5px",}}>
                    <h2 className='text-white' >Price Bucket Chart</h2>
                    <PieCha/>
                </div>
            <div className='col-3'></div>
        </div>
        
        <div>
            
            {!posts ? ("No data found") : (
                    <table className='table table-striped table-dark'>
                        <thead className='thead-light'>
                            <tr className='my-4'>
                                <th className='px-4'>ID</th>
                                <th>Brand</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Category</th>
                                <th>Thumbnail</th>
                            </tr>
                        </thead>
                        <tbody className='lis'>
                            {
                            posts['products'].map((product,index)=>(
                                <tr key={index} className=" zoom mx-auto pt-3" >  
                                    <td className='align-middle px-4' >{product['id']}</td>
                                    <td className='align-middle'>{product['brand']}</td>
                                    <td className='align-middle'>{product['title']}</td>
                                    <td className='align-middle'>{product['price']}</td>
                                    <td className='align-middle'>{product['rating']}</td>
                                    <td className='align-middle'>{product['category']}</td>
                                    <td><img className='rounded rounded-lg ' src={product['thumbnail']} alt="thumbnail" style={{width:85,height:85,borderRadius:'50%'}}  /></td>
                                </tr>
                            ))
                            }

                        </tbody>
                    </table>
                )}
                        <nav className='d-flex justify-content-center'>
                            <ul className='pagination'>
                                {pages.map((page,i)=>(
                                    <li ><button type="button"  onClick={()=>{(setPage(i*10));setCurrentPage(i+1);}}  className={ page === currentPage ? 'btn btn-secondary' : 'btn'}>{page}</button></li>
                                ))}
                            </ul>
                        </nav>


                        
        </div>
        </>

            
           
    )
            
}
        
export default Posts;
