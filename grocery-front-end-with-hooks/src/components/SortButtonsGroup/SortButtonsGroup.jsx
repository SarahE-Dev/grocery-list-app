import React, {useContext} from 'react'
import '../../App.css'
import { SortButtonsGroupContext } from '../../Context/Context'

export default function SortButtonsGroup() {
    const {sortByNotPurchased, sortByPurchased, sortGroceriesAlphabetically, sortGroceriesByAscDate, sortGroceriesByDescDate} = useContext(SortButtonsGroupContext)
  return (
    <div>
        <button onClick={sortByPurchased} className='button'>Sort By Purch.</button>
        <button onClick={sortByNotPurchased} className='button'>Sort By Not Purch.</button>
        <button onClick={sortGroceriesByDescDate} className='button'>Sort By Date ↓</button>
        <button onClick={sortGroceriesByAscDate} className='button'>Sort by Date ↑ </button>
        <button onClick={sortGroceriesAlphabetically} className='button'>Sort Alpha.</button>
    </div>
  )
}
