import { createSlice } from "@reduxjs/toolkit"
import { htmlTagObj, initialStateType } from "../../types/htmlElementTypes"

const initialState:initialStateType = {
  allHtmlTags:  [],
  switchControl: "add-html",
  currentSelectedTag: null
}

export const htmlElementSlice = createSlice({
  name: "htmlElement",
  initialState,
  reducers: {
    addRootHtmlElement: (state,{payload}) => {
      console.log("payload",payload)

      const htmlTagObjPayload:htmlTagObj = {
        "id": state.allHtmlTags?.length + 1,
        "rootElement":payload.rootElement,
        "styles": payload.styles,
        "childElements": []
      }
      
      state.allHtmlTags = [
        ...state.allHtmlTags,
        htmlTagObjPayload
      ];
    },
    deleteElement: (state,{payload}) => {
      const filteredArray = state.allHtmlTags?.filter( item => item.id !== payload.id )
      state.allHtmlTags = state.allHtmlTags?.filter( item => item.id !== payload.id )
    },
    addCurrentSelectedTag: (state, {payload}) => {
      state.currentSelectedTag = payload
    },
    handleSwitchController: (state, {payload}) => {
      state.switchControl = payload
    }
  } 
})

export const { addRootHtmlElement, addCurrentSelectedTag, handleSwitchController, deleteElement } = htmlElementSlice.actions

export default htmlElementSlice.reducer