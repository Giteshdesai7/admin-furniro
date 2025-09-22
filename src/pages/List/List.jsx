import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
const List = ({url}) => {

const [list, setList] = useState([]);
const fetchList = async ()=>{
  const response =await axios.get(`${url}/api/product/list`);
  
  if(response.data.success){
    setList(response.data.data);
  }
  else{
    console.log("error")
  }
}

const removeProduct = async(productId)=>{
  const response= await axios.post(`${url}/api/product/remove`, {id:productId});
  await fetchList();
  if(response.data.success){
    console.log(response.data.message);
  }
  else{
    console.log("Error")
  }
}


useEffect(()=>{
  fetchList();
},[])


  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` +item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹ {item.price}</p>
              <p onClick={()=>removeProduct(item._id)}className='X'>X</p>

              </div>
          )
        })}
      </div>
        
      
    </div>
  )
}

export default List