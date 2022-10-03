import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
export const chdata = {
    labels: ['0-499', '500-999', '1000-1499', '1500-2000'],
    datasets: [
      {
        label: 'Price Bucket',
        data: [10,20,10,40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        
        ],
        borderWidth: 3,
      },
    ],
  };


const Piecha = () => {
    
    const [allData,setAllData]=useState(null);


    useEffect(()=>{
        axios.get(`https://dummyjson.com/products?limit=100`).then((res)=>{
             setAllData(res.data.products);
             console.log(res.data);

        })
        // console.log(allData);

    },[]);

         
    console.log(allData);
   
    let cdata={a:0,b:0,c:0,d:0};
 
    if(allData){
     
       
    for(let i of allData){
           if(i['price']>=0 &&i['price']<=499){
                cdata['a']+=1;
           }
           else if(i['price']>=500 &&i['price']<=999 ){
            cdata['b']+=1;
           }
           else if(i['price']>=1000 &&i['price']<=1499 ){
            cdata['c']+=1;
           }
           else if(i['price']>=1500 &&i['price']<=2000 ){
            cdata['d']+=1;
           }
    }
       

    console.log(cdata);

    }

    return (
    <Pie data={ {
        labels: ['0-499', '500-999', '1000-1499', '1500-2000'],
        datasets: [
          {
            label: 'Price Bucket',
            data: [cdata['a'],cdata['b'],cdata['c'],cdata['d']],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            
            ],
            borderWidth: 3,
          },
        ],
      }
    } />
    );
}

export default Piecha