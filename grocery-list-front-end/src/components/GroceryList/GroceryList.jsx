import React, { Component } from 'react'
import Grocery from '../Grocery/Grocery'
import axios from 'axios'
import Button from '../common/Button'
import './GroceryList.css'

export class GroceryList extends Component {
    state = {
        groceryList: [],
        groceryInput: ""
    }
    async componentDidMount(){
        try {
            const allGroceries = await axios.get("http://localhost:3000/grocery/get-all-groceries")
            this.setState({
                groceryList: allGroceries.data.payload
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleGroceryOnChange = (event) => {
        this.setState({
            groceryInput: event.target.value
        })
    }

    handleOnSubmit = async (event) => {
        event.preventDefault()
        const found = this.state.groceryList.some(el=>el.item === this.state.groceryInput)
        if(found){
            this.setState({
                alert: "This grocery item already exists."
            })
        }
        if(this.state.alert && !found){
            this.setState({
                alert: ""
            })
        }
        try {
            if(this.state.groceryInput !== "" && !found){
                const newGrocery = await axios.post("http://localhost:3000/grocery/create-grocery", {
                    grocery: this.state.groceryInput
                })
                let newArray = [...this.state.groceryList, newGrocery.data.payload]
                this.setState({
                    groceryList: newArray
                })
                this.setState({
                    groceryInput: ""
                })
            }
        } catch (error) {
            console.log(error);
        }
    }  

    handlePurchasedByID = async (id, purchased)=>{
        try {
            await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
                purchased: !purchased
            })
        } catch (error) {
            console.log(error);
        }

        let updatedArray = this.state.groceryList.map((grocery)=>{
            if(grocery._id === id){
                grocery.purchased = !grocery.purchased
            }
            return grocery
        })
        this.setState({
            groceryList: updatedArray
        })
    }

    handleDeleteByID = async(id)=>{
        try {
            await axios.delete(`http://localhost:3000/grocery/delete-grocery/${id}`)
        } catch (error) {
            console.log(error);
        }
        let updatedArray = this.state.groceryList.filter((grocery)=>grocery._id !== id)
        this.setState({
            groceryList: updatedArray
        })
    }

    handleEditByID = async(id, editedValue)=>{
        try {
            await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
                grocery: editedValue
            })
        } catch (error) {
            console.log(error);
        }
        let updatedArray = this.state.groceryList.map((grocery)=>{
            if(grocery._id === id){
                grocery.grocery = editedValue
            }
            return grocery
        })
        this.setState({
            groceryList: updatedArray
        })
    }

    sortGroceriesByDate = () =>{
        let updatedArray = this.state.groceryList.sort((a, b)=>{
            return new Date(a.date)- new Date(b.date)
        })
        this.setState({
            groceryList: updatedArray
        })
    }

    sortGroceriesAlphabetically = () => {
        let updatedArray = this.state.groceryList.sort((a, b)=>a.todo.localeCompare(b.todo))
        this.setState({
            groceryList: updatedArray
        })
    }

    render() {
    return (
      <div className='main'>
        <div className="form-div">
            <form className='form'>
                {this.state.alert ? <p>{this.state.alert}</p> : ""}
                <input className='text-input' type="text" onChange={this.handleGroceryOnChange} value={this.state.groceryInput}/>
                <Button css={"submitButton"} clickFunc={this.handleOnSubmit} text={"Add to List"} />
            </form>
        </div>
        <div className="grocerylist-div">
            <div className="sort-div">
                <Button clickFunc={this.sortGroceriesByDate} text={"Sort by Date"} />
                <Button clickFunc={this.sortGroceriesAlphabetically} text={"Sort Alphabetically"} />
            </div>
            <ul>
                {this.state.groceryList.map((grocery)=>{
                    return (
                        <Grocery key={grocery._id} grocery={grocery} handleDeleteByID={this.handleDeleteByID} handlePurchasedByID={this.handlePurchasedByID} handleEditByID={this.handleEditByID} />
                    )
                })}
            </ul>
        </div>
      </div>
    )
  }
}

export default GroceryList