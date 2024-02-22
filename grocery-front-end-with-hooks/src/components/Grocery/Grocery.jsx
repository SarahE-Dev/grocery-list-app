import React, {useState, useContext} from 'react'
import { GroceryContext } from '../../Context/Context'
import '../../App.css'

export default function Grocery() {
    const {handleDelete, handleEdit, item, handlePurchased, handlePriorityByID} = useContext(GroceryContext)
    const [isEditable, setIsEditable] = useState(false)
    const [editInput, setEditInput] = useState(item.grocery)

    function handleDoneSubmit(){
        handleEdit(item._id, editInput)
        setIsEditable(false)
    }
    
  return (
    
    
    <div key={`div${item._id}`} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <input onChange={()=>handlePriorityByID(item._id, item.priority)} style={{marginRight: '10px'}} type="checkbox" defaultChecked={item.priority} id="checkbox" />
                {isEditable ? <input type='text' onChange={e=>setEditInput(e.target.value)} value={editInput} /> : <li style={{textAlign: 'left', textDecoration: item.purchased ? 'line-through' : '', listStyleType: 'none'}} key={item._id}>{item.grocery}</li>}
                </div>
                <div key={`but${item._id}`}>
                    <button className='button2' key={`del${item._id}`} onClick={()=>handleDelete(item._id)}>Delete</button>
                    {isEditable ? <button className='button2' onClick={handleDoneSubmit}>Done</button> : <button className='button2' onClick={e=>setIsEditable(true)}>Edit</button>}
                    <button className='button2' onClick={()=>handlePurchased(item._id, item.purchased)}>Purchased</button>
                    
                </div>
                </div>
                
  )
}
