import React, {useState, useEffect, useContext} from 'react'
import './App.css'
import Header from './components/Header/Header'
import { GroceryListContext, GroceryListInputContext, SortButtonsGroupContext } from './Context/Context'
import GroceryList from './components/GroceryList/GroceryList'
import axios from 'axios'
import GroceryListInput from './components/GroceryListInput/GroceryListInput'
import SortButtonsGroup from './components/SortButtonsGroup/SortButtonsGroup'


function App() {
  const [groceryList, setGroceryList] = useState([])

  async function getAllGroceries(){
    try {
      const allGroceries = await axios.get("http://localhost:3000/grocery/get-all-groceries")
      setGroceryList(allGroceries.data.payload)
  } catch (error) {
      console.log(error);
  }
  }

  async function addGrocery(input){
    const found = groceryList.some(el=>el.grocery === input)
    if(found){
      alert('This item already exists')
    }else {
      try {
        const newGrocery = await axios.post("http://localhost:3000/grocery/create-grocery", {
                    grocery: input
                })
        let newArray = [newGrocery.data.payload, ...groceryList]
        setGroceryList(newArray)
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleDelete(id){
    try {
      await axios.delete(`http://localhost:3000/grocery/delete-grocery/${id}`)
      let updatedArray = groceryList.filter((grocery)=>grocery._id !== id)
      setGroceryList(updatedArray)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(id, editedValue){
    try {
      await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
          grocery: editedValue
      })
      let updatedArray = groceryList.map((grocery)=>{
        if(grocery._id === id){
            grocery.grocery = editedValue
        }
        return grocery
      })
      setGroceryList(updatedArray)
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePurchased(id, purchased){
    try {
      await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
          purchased: !purchased
      })
      let updatedArray = groceryList.map((grocery)=>{
        if(grocery._id === id){
            grocery.purchased = !grocery.purchased
        }
        return grocery
      })
      setGroceryList(updatedArray)
    } catch (error) {
      console.log(error);
    }
  }

  function sortGroceriesByAscDate(){
    let updatedArray = [...groceryList]
    updatedArray = updatedArray.sort((a, b)=>{
      return new Date(a.date)- new Date(b.date)
    })
    setGroceryList(updatedArray)
  }

  function  sortGroceriesByDescDate(){
    let updatedArray = [...groceryList]
    updatedArray = updatedArray.sort((a, b)=>{
        return new Date(b.date)- new Date(a.date)
    })
    setGroceryList(updatedArray)
  } 

  function sortByPurchased (){
    let updatedArray = [...groceryList]
    updatedArray = updatedArray.sort((x, y)=>{
        return (x.purchased===y.purchased)? 0 : x.purchased? -1 : 1
    })
    console.log(updatedArray);
    setGroceryList(updatedArray)
  }

  function sortByNotPurchased(){
    let updatedArray = [...groceryList]
    updatedArray = updatedArray.sort((x, y)=>{
        return (x.purchased === y.purchased)? 0 : x.purchased? 1 : -1
    })
    console.log(updatedArray);
    setGroceryList(updatedArray)
}

  function sortGroceriesAlphabetically(){
    let updatedArray = [...groceryList]
    updatedArray = updatedArray.sort((a, b)=>a.grocery.localeCompare(b.grocery))
    setGroceryList(updatedArray)
}



  async function handlePriorityByID(id, priorityValue){
    try {
        await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
            priority: !priorityValue
        })
    } catch (error) {
        console.log(error);
    }
    let updatedArray = groceryList.map((grocery)=>{
        if(grocery._id === id){
            grocery.priority = !priorityValue
        }
        return grocery
    })
    let sortedArray = updatedArray.sort((x, y)=>{
        return (x.priority===y.priority)? 0 : x.priority? -1 : 1
    })
    setGroceryList(sortedArray)
    
}
    
  useEffect(() => {
      getAllGroceries()
  }, [])
  return (
    <div>
      <Header/>
      <GroceryListInputContext.Provider value={{addGrocery}}>
        <GroceryListInput/>
      </GroceryListInputContext.Provider>
      <SortButtonsGroupContext.Provider value={{sortByNotPurchased, sortByPurchased, sortGroceriesAlphabetically, sortGroceriesByAscDate, sortGroceriesByDescDate}}>
        <SortButtonsGroup/>
      </SortButtonsGroupContext.Provider>
      <GroceryListContext.Provider value={{groceryList, handleDelete, handleEdit, handlePurchased, handlePriorityByID}}>
        <GroceryList />
      </GroceryListContext.Provider>
    </div>
  )
}

export default App
