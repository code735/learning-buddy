"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  Avatar,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material"
import { Send, ArrowBack, PictureAsPdf, Person } from "@mui/icons-material"

interface PdfChatProps {
  pdfName: string
  onNavigate: (page: any) => void
}

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function PdfChat({ pdfName, onNavigate }: PdfChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello! I'm your AI assistant. I've analyzed "${pdfName}". What would you like to know about it?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        `Based on "${pdfName}", I can tell you that this concept is explained in detail on page 24.`,
        `The document "${pdfName}" discusses this topic in the context of modern frameworks.`,
        `According to "${pdfName}", there are three main approaches to solving this problem.`,
        `"${pdfName}" provides several examples of this pattern in the implementation section.`,
        `The author of "${pdfName}" specifically mentions that this technique improves performance by 40%.`,
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Box sx={{ height: "calc(100vh - 150px)", display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => onNavigate("lms")} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <PictureAsPdf sx={{ color: "error.main", mr: 1 }} />
        <Typography variant="h5" component="h1">
          Chat with PDF: {pdfName}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Messages container */}
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          mb: 2,
          p: 2,
          overflow: "auto",
          backgroundColor: "grey.50",
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: message.sender === "user" ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", maxWidth: "80%" }}>
                {message.sender === "ai" && (
                  <Avatar
                    sx={{
                      mr: 1,
                      bgcolor: "primary.main",
                      width: 32,
                      height: 32,
                    }}
                  >
                    AI
                  </Avatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: message.sender === "user" ? "primary.main" : "background.paper",
                    color: message.sender === "user" ? "white" : "text.primary",
                    borderRadius: 2,
                    maxWidth: "100%",
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 1,
                      textAlign: message.sender === "user" ? "right" : "left",
                      color: message.sender === "user" ? "rgba(255,255,255,0.7)" : "text.secondary",
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </Typography>
                </Paper>
                {message.sender === "user" && (
                  <Avatar
                    sx={{
                      ml: 1,
                      bgcolor: "secondary.main",
                      width: 32,
                      height: 32,
                    }}
                  >
                    <Person />
                  </Avatar>
                )}
              </Box>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    mr: 1,
                    bgcolor: "primary.main",
                    width: 32,
                    height: 32,
                  }}
                >
                  AI
                </Avatar>
                <CircularProgress size={20} />
              </Box>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      {/* Input area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          backgroundColor: "background.paper",
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Ask a question about this PDF..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<Send />}
          onClick={handleSendMessage}
          disabled={input.trim() === "" || isLoading}
        >
          Send
        </Button>
      </Paper>
    </Box>
  )
}

