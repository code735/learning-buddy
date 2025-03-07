import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Drawer } from '@mui/material';
import { useSelector } from 'react-redux';
import { CurrentRootState } from '../../store/store';

export default function FloatingIsland() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { allHtmlTags } = useSelector((state:CurrentRootState) => state.htmlElement);
  const [htmlElements, setHtmlElements] = useState(allHtmlTags)

  return (
    <div className='island-drawer'>
      <Button onClick={() => {
        setIsDrawerOpen(true)
      }}>
        <KeyboardArrowUpIcon />
      </Button>
      <Drawer anchor={"bottom"} open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false)
        }}
      >
        <div className="html-tags-container">
          {
            allHtmlTags?.length > 0 ? allHtmlTags?.map((el) => {
              return <div className="html-tag">
                <div className="tag-name">
                  {el.rootElement}
                </div>
              </div>
            }) : <>Elements not added yet</>
          }
        </div>
      </Drawer>
    </div>
  )
}
