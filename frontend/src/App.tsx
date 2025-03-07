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
import PdfChat from "./Components/PdfChat"
import VideoChat from "./Components/VideoChat"


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

type RouteType =
  | "dashboard"
  | "pdf"
  | "video"
  | "lms"
  | { type: "pdfchat"; pdfName: string }
  | { type: "videochat"; videoName: string }




function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteType>("dashboard")

  // Function to handle navigation
  const navigate = (route: RouteType) => {
    setCurrentRoute(route)
  }

  // Determine which page to show based on the current route
  const renderPage = () => {
    if (typeof currentRoute === "string") {
      switch (currentRoute) {
        case "dashboard":
          return <Dashboard onNavigate={navigate} />
        case "pdf":
          return <Pdfupload onNavigate={navigate} />
        case "video":
          return <Videoupload onNavigate={navigate} />
        case "lms":
          return <Lmspage onNavigate={navigate} />
        default:
          return <Dashboard onNavigate={navigate} />
      }
    } else {
      // Handle object-type routes
      if (currentRoute.type === "pdfchat") {
        return <PdfChat pdfName={currentRoute.pdfName} onNavigate={navigate} />
      } else if (currentRoute.type === "videochat") {
        return <VideoChat videoName={currentRoute.videoName} onNavigate={navigate} />
      }
    }
  }

  const getCurrentPageName = (): string => {
    if (typeof currentRoute === "string") {
      return currentRoute
    } else {
      return currentRoute.type
    }
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
      <Navbar currentPage={getCurrentPageName()} onNavigate={navigate} />
      <Container maxWidth="lg">
        <Box sx={{ my: 4, pt: 2 }}>{renderPage()}</Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
