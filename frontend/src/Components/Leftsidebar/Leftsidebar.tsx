import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { addCurrentSelectedTag, addRootHtmlElement, deleteElement, handleSwitchController } from '../../store/features/htmlElementSlice';
import { Add, Close, Delete } from '@mui/icons-material';
import { CurrentRootState } from '../../store/store';
import { htmlElementsListObj } from './LeftsidebarTypes';

export default function Leftsidebar() {
  const dispatch = useDispatch();
  const htmlElementRedux = useSelector((state: CurrentRootState) => state.htmlElement.allHtmlTags);
  const switchControlRedux = useSelector((state: CurrentRootState) => state.htmlElement.switchControl);
  const currentSelectedTag = useSelector((state: CurrentRootState) => state.htmlElement.currentSelectedTag);

  // HTML Elements List with both tagName and tag JSX elements
  const htmlElementsList: htmlElementsListObj[] = [
    { tagName: 'div', fullName: 'division', tag: "</div>" },
    { tagName: 'span', fullName: 'span', tag: "</span>" },
    { tagName: 'p', fullName: 'paragraph', tag: "</p>" },
    { tagName: 'a', fullName: 'anchor', tag: `</a>` },
    { tagName: 'img', fullName: 'image', tag: `<img/>` },
    { tagName: 'ul', fullName: 'unordered list', tag: `</ul>` },
    { tagName: 'ol', fullName: 'ordered list', tag: `</ol>` },
    { tagName: 'li', fullName: 'list item', tag: "</li>" },
    { tagName: 'h1', fullName: 'heading 1', tag: "</h1>" },
    { tagName: 'h2', fullName: 'heading 2', tag: "</h2>" },
    { tagName: 'h3', fullName: 'heading 3', tag: "</h3>" },
    { tagName: 'button', fullName: 'button', tag: "</button>" },
    { tagName: 'input', fullName: 'input field', tag: `<input/>` },
    { tagName: 'form', fullName: 'form', tag: "</form>" },
    { tagName: 'label', fullName: 'label', tag: "</label>" },
    { tagName: 'table', fullName: 'table', tag: "</table>" },
    { tagName: 'nav', fullName: 'navigation', tag: "</nav>" },
    { tagName: 'header', fullName: 'header', tag: "</header>" },
    { tagName: 'footer', fullName: 'footer', tag: "</footer>" },
    { tagName: 'section', fullName: 'section', tag: "</section>" },
    { tagName: 'article', fullName: 'article', tag: "</article>" },
    { tagName: 'aside', fullName: 'aside', tag: "</aside>" },
    { tagName: 'main', fullName: 'main content area', tag: "</main>" },
    { tagName: 'figure', fullName: 'figure', tag: "</figure>" },
    { tagName: 'figcaption', fullName: 'figure caption', tag: "</figcaption>" },
    { tagName: 'video', fullName: 'video', tag: "</video>" },
    { tagName: 'audio', fullName: 'audio', tag: "</audio>" },
    { tagName: 'canvas', fullName: 'canvas', tag: "</canvas>" },
    { tagName: 'iframe', fullName: 'inline frame', tag: "</iframe>" },
    { tagName: 'blockquote', fullName: 'blockquote', tag: "</blockquote>" },
    { tagName: 'code', fullName: 'code', tag: "</code>" },
    { tagName: 'pre', fullName: 'preformatted text', tag: "</pre>" },
  ];


  // State for storing the input value and the filtered suggestions
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<htmlElementsListObj[]>([]);

  // Useeffects
  useEffect(() => {
    console.log("htmlElementRedux", htmlElementRedux)
  }, [htmlElementRedux])

  useEffect(() => {
    const filteredSuggestions = htmlElementsList.map((element) => {
      if ( element.tagName.toLowerCase().startsWith(inputValue.toLowerCase()) ) {
        return element.tagName;
      }
    });
    
    let topSuggestions = htmlElementsList?.filter( element => filteredSuggestions.includes(element.tagName) )
    let removedSuggestions = htmlElementsList?.filter( element => !filteredSuggestions.includes(element.tagName) )
    
    setSuggestions([...topSuggestions,...removedSuggestions]);
  }, [inputValue]);

  // Functions 

  const switchLeftSidebarFunctionalities = (functionality) => {
    switch (functionality) {
      case "search-dom":
        return <></>
        break;
      case "add-html":
        return <></>
        break;
      default: return <></>
    }
  }

  const addElement = () => {
    const selectedElement = suggestions.find(el => el?.tagName === inputValue);
    if (selectedElement) {
      const element = React.createElement(selectedElement?.tagName)
      dispatch(addRootHtmlElement({
        "rootElement": selectedElement?.tagName,
        "styles": [
          {
            "temp": "temp"
          }
        ]
      }));
    }
  };

  const deleteHtmlTag = (element) => {
    dispatch(deleteElement(element));
  }

  const selectTag = (element) => {
    dispatch(addCurrentSelectedTag(element))
  }

  return (
    <div className='left-sidebar'>
      <div className="left-sidebar-navigation">
        <div className="nav-options">
          <div className="search-option">
            <div className={`search-icon ${switchControlRedux == "search-dom" && "selected"}`}>
              <SearchOutlinedIcon />
            </div>
            {
              switchControlRedux === 'add-html' ? (
                <div className="searchbar-addicon-container">
                  <div className="search-bar">
                    <input type="text" placeholder='Add HTML...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                  </div>
                  {
                    inputValue && <div className="close-icon" onClick={() => { setInputValue("") }}>
                      <Close />
                    </div>
                  }

                  <div className="add-html-icon" onClick={addElement}>
                    <Add />
                  </div>
                </div>
              ) : (
                <div className="search-option-text">
                  <p>DOM</p>
                </div>
              )
            }
          </div>
          {
            switchControlRedux === "search-dom" && <div className="close-option" onClick={() => dispatch(handleSwitchController("off"))}>
              <Close />
            </div>
          }
        </div>
      </div>
      <div className="left-sidebar-container">
        {
          switchControlRedux === "add-html" && (
            <div className="suggestions-container">
              {
                suggestions?.map((el, index) => (
                  <div
                    className='html-element'
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => setInputValue(el.tagName)}
                  >
                    <span className='tag'>{el?.tag}</span>
                  </div>
                ))
              }
            </div>
          )
        }
        <div className="dom-container">
          {
            htmlElementRedux?.length > 0 && htmlElementRedux?.map((el) => {
              return <div className={`html-tag ${currentSelectedTag?.id == el.id && "selected"}`} onClick={() => { selectTag(el) }}>
                <div className="tag-name">
                  <span>{el.rootElement}</span>
                </div>
                <div className="delete-btn" onClick={() => { deleteHtmlTag(el) }}>
                  <Delete />
                </div>
              </div>
            })
          }
        </div>
        {switchLeftSidebarFunctionalities(switchControlRedux)}
      </div>
    </div>
  )
}
