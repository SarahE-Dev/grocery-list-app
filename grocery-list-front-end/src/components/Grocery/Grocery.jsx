import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Grocery.css'

export class Grocery extends Component {
    
    state = {
        canEdit: false,
        editInput: this.props.grocery.grocery
    }

    handleOnChange = (event) => {
        this.setState({
            editInput: event.target.value
        })
    }

    handleEditOnClick = (event) => {
        if(event.target.innerText === "Done" && this.state.editInput){
            this.props.handleEditByID(this.props.grocery._id, this.state.editInput)
        }
        this.setState({
            canEdit: !this.state.canEdit,
            editInput: this.props.grocery.grocery
        })
    }

    handleCheckboxChange = (event) => {
        this.props.handlePriorityByID(this.props.grocery._id, this.props.grocery.priority)
        
        
    }

  render() {
    const { grocery, purchased, _id, date, priority } = this.props.grocery
    const { handlePurchasedByID, handleDeleteByID } = this.props
    return (
      <div className='grocery-div'>
        <div className="li-check">
            <input onChange={this.handleCheckboxChange} type="checkbox" id="checkbox" />
        {
            this.state.canEdit ? <input type="text" value={this.state.editInput} onChange={this.handleOnChange} /> : <li className={`li style ${purchased ? "li-style-isDone" : ""}`} >{grocery}</li>
        }
        </div>
        <div className="button-div">
            <button id="edit" onClick={this.handleEditOnClick} >{this.state.canEdit ? "Done" : "Edit"}</button>
            <button id="purchased" onClick={()=>handlePurchasedByID(_id, purchased)} >Purchased</button>
            <button id="delete" onClick={()=>handleDeleteByID(_id)} >Delete</button>
        </div>
      </div>
    )
  }
}

Grocery.propTypes = {
    grocery: PropTypes.object.isRequired,
    handleDeleteByID: PropTypes.func.isRequired,
    handleEditByID: PropTypes.func.isRequired,
    handlePurchasedByID: PropTypes.func.isRequired
}

export default Grocery