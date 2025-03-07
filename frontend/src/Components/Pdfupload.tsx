"use client"

import React from "react"
import { useState, useRef } from "react"
import { Box, Button, Typography, Paper, Alert, CircularProgress, Grid } from "@mui/material"
import { CloudUpload, Chat } from "@mui/icons-material"

interface PdfUploadProps {
  onNavigate: (page: any) => void
}

export default function Pdfupload({ onNavigate }: PdfUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a PDF file")
        setFile(null)
        return
      }

      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      setUploadSuccess(true)
      
      // Reset after showing success message
      setTimeout(() => {
        setFile(null)
        setUploadSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setUploading(false)
    }
  }

  const handleChatWithPdf = () => {
    if (file) {
      onNavigate({ type: "pdfchat", pdfName: file.name })
    } else {
      setError("Please select a file first")
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Upload PDF
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px dashed",
          borderColor: "primary.light",
          backgroundColor: "background.paper",
          mb: 3,
        }}
      >
        <CloudUpload sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Drag & Drop your PDF here
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          or click to browse files
        </Typography>

        <Button component="label" variant="contained" sx={{ mb: 2 }}>
          Select PDF File
          <input type="file" accept=".pdf" hidden onChange={handleFileChange} />
        </Button>

        {file && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Selected file: {file.name}
          </Typography>
        )}
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {uploadSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          PDF uploaded successfully!
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            disabled={!file || uploading} 
            onClick={handleUpload}
          >
            {uploading ? <CircularProgress size={24} color="inherit" /> : "Upload PDF"}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disabled={!file}
            onClick={handleChatWithPdf}
            startIcon={<Chat />}
          >
            Chat with this PDF
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}