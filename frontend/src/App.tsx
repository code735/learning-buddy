import React, { useEffect, useRef, useState,  } from "react";
import "./Styles/App.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AttachFile, SendRounded } from "@mui/icons-material";
import LMSPage from "./Components/LMSPage";

function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const responseContainerRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const markdown = `
  # Hello, Markdown!
  This is **bold**, *italic*, and \`inline code\`.


  \`\`\`js
  console.log("Code block!");
  \`\`\`

  - Item 1
  - Item 2
  `;

  const [ReactMarkdown, setReactMarkdown] = useState<any>(null);
  const [remarkGfm, setRemarkGfm] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const markdownModule = await import("react-markdown");
      const gfmModule = await import("remark-gfm");
      setReactMarkdown(() => markdownModule.default);
      setRemarkGfm(() => gfmModule.default);
    })();
  }, []);

  // states
  const [open, setOpen] = useState(false);

  // functions
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
    handleChangeResponseContainerHeight();
  };

  const handleChangeResponseContainerHeight = () => {
    if (responseContainerRef.current && inputContainerRef.current) {
      responseContainerRef.current.style.height =
        "calc(100vh - " + inputContainerRef.current.scrollHeight + "px)";
    }
  };

  if (!ReactMarkdown || !remarkGfm) return <p>Loading...</p>;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/LMS" element={<LMSPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
