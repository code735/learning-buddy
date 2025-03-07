"use client"

import React from "react"
import { useState, useRef } from "react"
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  Stack,
  LinearProgress,
} from "@mui/material"
import { CloudUpload as CloudUploadIcon, PictureAsPdf as PdfIcon, Close as CloseIcon } from "@mui/icons-material"

type FileType = "pdf" | "video" | null
type UploadStatus = "idle" | "uploading" | "success" | "error"

interface FilePreviewProps {
  file: File
  onRemove: () => void
}

const PdfPreview = ({ file, onRemove }: FilePreviewProps) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <PdfIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
      <Box>
        <Typography variant="subtitle1" noWrap sx={{ maxWidth: 200 }}>
          {file.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </Typography>
      </Box>
    </Box>
    <IconButton onClick={onRemove} size="small">
      <CloseIcon />
    </IconButton>
  </Paper>
)

const VideoPreview = ({ file, onRemove }: FilePreviewProps) => {
  const videoUrl = URL.createObjectURL(file)

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="subtitle1">{file.name}</Typography>
        <IconButton onClick={onRemove} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      <video controls width="100%" height="auto" style={{ maxHeight: "200px" }}>
        <source src={videoUrl} type={file.type} />
        Your browser does not support the video tag.
      </video>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {(file.size / 1024 / 1024).toFixed(2)} MB
      </Typography>
    </Paper>
  )
}

export default function FileUpload() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const fileType = getFileType(file)

    if (fileType === "pdf") {
      setPdfFile(file)
    } else if (fileType === "video") {
      setVideoFile(file)
    } else {
      setError("Unsupported file type. Please upload PDF or video files only.")
    }

    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileType = (file: File): FileType => {
    if (file.type === "application/pdf") {
      return "pdf"
    } else if (file.type.startsWith("video/")) {
      return "video"
    }
    return null
  }

  const handleUpload = async () => {
    if (!pdfFile && !videoFile) {
      setError("Please select at least one file to upload")
      return
    }

    setUploadStatus("uploading")
    setError(null)

    try {
      // Simulate upload with progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      // Here you would normally send the files to your server
      // const formData = new FormData()
      // if (pdfFile) formData.append('pdf', pdfFile)
      // if (videoFile) formData.append('video', videoFile)
      // const response = await fetch('/api/upload', { method: 'POST', body: formData })

      setUploadStatus("success")
    } catch (err) {
      setUploadStatus("error")
      setError("An error occurred during upload. Please try again.")
    }
  }

  const handleReset = () => {
    setPdfFile(null)
    setVideoFile(null)
    setUploadStatus("idle")
    setUploadProgress(0)
    setError(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const files = e.dataTransfer.files
    if (!files || files.length === 0) return

    const file = files[0]
    const fileType = getFileType(file)

    if (fileType === "pdf") {
      setPdfFile(file)
    } else if (fileType === "video") {
      setVideoFile(file)
    } else {
      setError("Unsupported file type. Please upload PDF or video files only.")
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Upload Files
      </Typography>

      <Typography variant="body1" gutterBottom align="center" color="text.secondary" sx={{ mb: 3 }}>
        Upload PDF documents and video files
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {uploadStatus === "success" && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={handleReset}>
          Files uploaded successfully!
        </Alert>
      )}

      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 3,
          border: "2px dashed",
          borderColor: "primary.main",
          backgroundColor: "background.paper",
          textAlign: "center",
          cursor: "pointer",
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept=".pdf,video/*"
        />
        <CloudUploadIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Drag & Drop or Click to Upload
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supported formats: PDF, MP4, MOV, AVI, etc.
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            PDF Document
          </Typography>
          {pdfFile ? (
            <PdfPreview file={pdfFile} onRemove={() => setPdfFile(null)} />
          ) : (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "action.hover",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">No PDF selected</Typography>
            </Paper>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Video
          </Typography>
          {videoFile ? (
            <VideoPreview file={videoFile} onRemove={() => setVideoFile(null)} />
          ) : (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "action.hover",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">No video selected</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {uploadStatus === "uploading" && (
        <Box sx={{ mt: 3 }}>
          <LinearProgress variant="determinate" value={uploadProgress} sx={{ mb: 1 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={uploadStatus === "uploading" ? <CircularProgress size={20} color="inherit" /> : null}
          disabled={uploadStatus === "uploading" || (!pdfFile && !videoFile)}
          onClick={handleUpload}
          fullWidth
        >
          {uploadStatus === "uploading" ? "Uploading..." : "Upload Files"}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          disabled={uploadStatus === "uploading"}
          fullWidth
        >
          Reset
        </Button>
      </Stack>
    </Box>
  )
}

