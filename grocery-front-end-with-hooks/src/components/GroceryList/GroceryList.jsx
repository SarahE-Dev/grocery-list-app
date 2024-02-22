import React, {useState, useContext, useEffect} from 'react'
import { GroceryContext, GroceryListContext } from '../../Context/Context'
import '../../App.css'
import Grocery from '../Grocery/Grocery'

export default function GroceryList() {
   const {groceryList, handleDelete, handleEdit, handlePurchased, handlePriorityByID} = useContext(GroceryListContext)

   
   let sortedArray = groceryList.sort((x, y)=>{
    return (x.priority===y.priority)? 0 : x.priority? -1 : 1
    })

   
   
   function renderGroceryList(){
        return (
            <ul style={{width: '80vw'}}>
        {sortedArray.map((item)=>{
            return (
                <GroceryContext.Provider key={`pro${item._id}`} value={{handleDelete, handleEdit,item, handlePurchased, handlePriorityByID}}>
                    <Grocery key={item._id}/>
                </GroceryContext.Provider>
                
            )
        })}
    </ul>
        )
   }
  return (
    renderGroceryList()
  )
}
