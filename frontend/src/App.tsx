"use client"
import React, { useEffect, useRef, useState} from "react";
import "./Styles/App.scss";
// import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Box, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Dashboard from "./Components/Dashboard"
import Pdfupload from "./Components/Pdfupload"
import Videoupload from "./Components/Videoupload"
import Lmspage from "./Components/Lmspage"
import Navbar from "./Components/Navbar"


// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
})




function App() {
  const [currentPage, setCurrentPage] = useState<"dashboard" | "pdf" | "video" | "lms">("dashboard")
  const navigate = (page: "dashboard" | "pdf" | "video" | "lms") => {
    setCurrentPage(page)
  }

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, pt: 2 }}>
          {currentPage === "dashboard" && <Dashboard onNavigate={navigate} />}
          {currentPage === "pdf" && <Pdfupload onNavigate={navigate} />}
          {currentPage === "video" && <Videoupload onNavigate={navigate} />}
          {currentPage === "lms" && <Lmspage onNavigate={navigate} />}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
