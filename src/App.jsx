import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [page,setPage] = useState(0);
  const [pages,setPages] = useState((new Array(1)).fill(0));
  const [moren,setMoreNext] = useState(false);
  const [morep,setMorePrev] = useState(true);
  const [data,setData] = useState([]);
  useEffect(()=>{
         const fetchfunc = async()=>{
              const res = await fetch(`https://dummyjson.com/products`);
              let result = await res.json();
              result = result.products;
              setPages(new Array(Math.round(result.length/10)).fill(0));
              result = result.slice(page*10,(page+1)*10);
              setData(result);
         }
          fetchfunc();
  },[page]) 
  const handlenext = ()=>{
       
      setPage((p)=>p+1);
      if(page+2 >= pages.length){
        setMoreNext(true);
      }
      setMorePrev(false)
  
  }
  const handleprev = ()=>{
       
      setPage((p)=>p-1);
      
      if(page-1<1){
        setMorePrev(true);
      }
      setMoreNext(false)
  }
  const pageselect=(e)=>{
    setPage(e);
  }
  return (
    <>
     {data.length> 0 && data.map((i)=>{
       return (
         <p key={i.id}>{i.title}</p>
         )
        })}
     <div>
        <button onClick={handlenext} disabled={moren}>Next</button>
      {pages.map((i,index)=>{
        return (
          <span key={index} style={{color: `${page==index?'red':''}`}} onClick={()=>pageselect(index)}>{index+1}</span>
          )
        })
      }
      <button onClick={handleprev} disabled={morep}> Prev</button>
      </div>
    </>
  )
}

export default App
