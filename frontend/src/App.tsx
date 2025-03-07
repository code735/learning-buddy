import React, { useEffect, useRef, useState } from "react";
import "./Styles/App.scss";

import { AttachFile, SendRounded } from "@mui/icons-material";

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
      <div className="main-container">
        <div className="sidebar-container"></div>
        <div className="chat-container">
          <div ref={responseContainerRef} className="response-container">
            <div className="response-block">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
          <div ref={inputContainerRef} className="input-container">
            <div className="input-block">
              <textarea
                ref={textareaRef}
                onInput={handleInput}
                placeholder="Ask PDF..."
              />
              <div className="input-tool-container">
                <div className="tool-button">
                  <AttachFile className="tool-icon" />
                </div>
                <div
                  className="tool-button"
                  style={{ background: "white", borderRadius: "50%" }}
                >
                  <SendRounded
                    className="tool-icon"
                    style={{
                      transform: "rotate(-45deg)",
                      color: "#323232",
                      paddingLeft: "4px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
