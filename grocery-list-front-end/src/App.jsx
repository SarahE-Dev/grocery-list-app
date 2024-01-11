import React, { Component } from 'react'
import Header from './components/Header/Header'
import GroceryList from './components/GroceryList/GroceryList'

export class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <GroceryList/>
      </div>
    )
  }
}

export default App
