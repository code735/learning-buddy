import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRootHtmlElement } from '../../store/features/htmlElementSlice';
import { CurrentRootState } from '../../store/store';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Add, Close } from '@mui/icons-material';

export default function Rightsidebar() {
  // Redux
  const dispatch = useDispatch();
  const htmlElementRedux = useSelector((state: CurrentRootState) => state.htmlElement.allHtmlTags);

  // useStates
  const [cssProperties, setCssProperties] = useState([
    { property: "color", inputType: "color-picker" },
    { property: "background-color", inputType: "color-picker" },
    { property: "font-size", inputType: "number-input" },
    { property: "font-family", inputType: "font" },
    { property: "padding", inputType: "four-box-input" },
    { property: "margin", inputType: "four-box-input" },
    { property: "border", inputType: "border" },
    { property: "border-radius", inputType: "number-input" },
    { property: "width", inputType: "number-input" },
    { property: "height", inputType: "number-input" },
    { property: "line-height", inputType: "number-input" },
    { property: "letter-spacing", inputType: "number-input" },
    { property: "text-align", inputType: "options-box", options: ["left", "center", "right", "justify"] },
    { property: "display", inputType: "search-options-box", options: ["inline", "block", "flex", "contents", "grid", "table", "table-row", "table-column"] },
    { property: "justify-content", inputType: "options-box", options: ["center", "flex-start", "flex-end", "space-between", "space-around"] },
    { property: "align-items", inputType: "options-box", options: ["flex-start", "center", "flex-end", "stretch", "baseline"] },
    { property: "position", inputType: "options-box", options: ["static", "relative", "absolute", "fixed", "sticky"] },
    { property: "top", inputType: "number-input" },
    { property: "right", inputType: "number-input" },
    { property: "bottom", inputType: "number-input" },
    { property: "left", inputType: "number-input" },
    { property: "box-shadow", inputType: "box-shadow-input" },
    { property: "opacity", inputType: "slider" },
    { property: "overflow", inputType: "options-box", options: ["visible", "hidden", "scroll", "auto"] },
    { property: "cursor", inputType: "options-box", options: ["default", "pointer", "move", "text", "wait", "crosshair", "not-allowed"] }
  ]);



  // if there are more than 6 options then use search-options-box otherwise use options box


  const [selectedValue, setSelectedValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [focusedInput, setFocusedInput] = useState(false)

  // useEffects
  useEffect(() => {
    console.log("htmlElementRedux", htmlElementRedux)
  }, [htmlElementRedux])


  // Functions
  const addElement = () => {
    if (selectedValue) {
      dispatch(addRootHtmlElement(selectedValue));
    }
  };

  return (
    <div className='right-sidebar'>
      <div className="searchbar-addicon-container">
        <div className={`search-icon`}>
          <SearchOutlinedIcon />
        </div>
        <div className="search-bar">
          <input type="text" placeholder='Add CSS...' value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} onFocus={() => setFocusedInput(true)} />
        </div>
        {
          focusedInput ? <div className="close-icon-container" onClick={()=>{setFocusedInput(false)}}>
            <Close />
          </div> : <div className="add-html-icon" onClick={addElement}>
            <div className="add-icon-container"><Add /></div>
          </div>
        }
      </div>
      <div className="suggestions-container">
        {
          focusedInput && cssProperties?.map((el) => {
            return <div className="suggestion">{el.property}</div>
          })
        }
      </div>
    </div>
  );
}
