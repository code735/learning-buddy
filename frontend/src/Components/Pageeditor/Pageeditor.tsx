import React, { useEffect, useRef } from 'react';
import FloatingIsland from '../FloatingIsland/FloatingIsland';
import { useDispatch, useSelector } from 'react-redux';
import { addCurrentSelectedTag } from '../../store/features/htmlElementSlice';
import { CurrentRootState } from '../../store/store';

export default function PageEditor() {
  // useSelector and useDispatch
  const { allHtmlTags, currentSelectedTag } = useSelector((state: CurrentRootState) => state.htmlElement);
  const dispatch = useDispatch();
  
  // useRefs
  const elementRefs = useRef({});

  // useEffects
  useEffect(() => {
    // console.log("currentSelectedTag-allHtmlTags", currentSelectedTag, allHtmlTags);
  }, [currentSelectedTag, allHtmlTags]);

  // Functions
  const addComputedStyles = (currentRef) => {
    if (currentRef) {
      const computedStyles = window.getComputedStyle(currentRef);
      console.log("Computed Styles:", computedStyles);
    }
  };

  // console.log("elementRefs",elementRefs)

  return (
    <div className='page-editor'>
      <div className="main-page-playarea">
        {
          allHtmlTags?.map((el) => {
            const elementId = el.id; 

            return React.createElement(
              el.rootElement,
              {
                key: elementId,
                ref: (ref) => {
                  if (ref) {
                    elementRefs.current[elementId] = ref;
                  }
                },
                className: `root-element ${currentSelectedTag?.id === elementId ? 'selected-element' : ''}`,
                onClick: () => {
                  addComputedStyles(elementRefs.current[elementId]);
                  if (currentSelectedTag?.id === elementId) {
                    dispatch(addCurrentSelectedTag({}));
                  } else {
                    dispatch(addCurrentSelectedTag(el));
                  }
                }
              }
            );
          })
        }
      </div>
      <div className="island-container">
        <FloatingIsland />
      </div>
    </div>
  );
}
