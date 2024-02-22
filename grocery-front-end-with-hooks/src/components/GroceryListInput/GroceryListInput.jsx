import React, {useContext, useState} from 'react'
import { GroceryListInputContext } from '../../Context/Context'
import '../../App.css'

export default function GroceryListInput() {
    const [groceryInput, setGroceryInput] = useState('')
    const {addGrocery} = useContext(GroceryListInputContext)
    const handleOnSubmit=(e)=>{
        e.preventDefault
        addGrocery(groceryInput)
        setGroceryInput('')
    }
  return (
    <div>
        <input value={groceryInput} type="text" onChange={e=>setGroceryInput(e.target.value)} />
        <button onClick={handleOnSubmit}>Add Grocery</button>
    </div>
  )
}
