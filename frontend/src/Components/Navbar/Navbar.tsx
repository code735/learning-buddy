import React, { useState } from 'react'
import HtmlIcon from '@mui/icons-material/Html';
import { useDispatch, useSelector } from 'react-redux';
import { handleSwitchController } from '../../store/features/htmlElementSlice';
import { CurrentRootState } from '../../store/store';

export default function Navbar() {

const [selectedOption, setselectedOption] = useState("")
const dispatch = useDispatch();
const { switchControl } = useSelector((state:CurrentRootState) => state.htmlElement)

console.log("switchControl",switchControl)

  return (
    <div className='navbar'>
      <div className={`options-container`}>
        <div onClick={()=>{
          dispatch(handleSwitchController("add-html"))
        }} className={`html-icon add-html option-icons ${ switchControl === 'add-html' && "selected-option"}`}>
          <HtmlIcon />
        </div>
      </div>
    </div>
  )
}
