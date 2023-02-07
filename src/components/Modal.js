import React, { useState   } from 'react'
import axios from 'axios';
import './modal.css'
const Modal = ({data,setData,isUpdating, onClose}) => {
  const currentData = data.find(item => item._id === isUpdating);
  const [title, setTitle] = useState(currentData.title);
  const [description, setDescription] = useState(currentData.description);


  
  const updateItem=async(e)=>{
    e.preventDefault() 
    if (!title || !description) {
      return alert("Title and description cannot be empty");
    }

   try{
    const res=await axios.patch(`https://todo-today.onrender.com/api/item/${isUpdating}`,{
      title: title,
      description:description

    })
    console.log(res.data)
    setTitle('')
    setDescription('')
   
   
    const updatedTodoIndex = data.findIndex((data) => data._id === isUpdating);
    const updatedData = [...data];
    updatedData[updatedTodoIndex] = {
      _id: isUpdating,
      title: title,
      description: description,
    };

    setData(updatedData);
    onClose(false)

   }catch(err){
     console.log(err)
   }
  }
  return (
    <div className="modalContainer">
      <p>ID: {currentData._id}</p>
      <div className='modal-body'>
      <input type="text" placeholder="Edit title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Edit desc..." value={description} onChange={e => setDescription(e.target.value)} />
      </div>
     
      <span className='modal-footer'>
      <button className='updates'  onClick={e=>{updateItem(e)}}>Update</button>
      <button className='close' onClick={()=>onClose(false)}> Close</button>
      </span>
    </div>
  );
};
export default Modal;
