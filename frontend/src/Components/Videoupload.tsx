"use client"
import React from "react";

import { useState } from "react"
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress } from "@mui/material"
import { VideoLibrary } from "@mui/icons-material"

interface VideoUploadProps {
  onNavigate: (page: "dashboard" | "pdf" | "video" | "lms") => void
}

export default function Videoupload({ onNavigate }: VideoUploadProps) {
  const [videoUrl, setVideoUrl] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isYoutubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    return youtubeRegex.test(url)
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value)
    setError(null)
  }

  const handleUpload = () => {
    if (!videoUrl.trim()) {
      setError("Please enter a YouTube URL")
      return
    }

    if (!isYoutubeUrl(videoUrl)) {
      setError("Please enter a valid YouTube URL")
      return
    }

    setUploading(true)
    setError(null)

    // Simulate upload process
    setTimeout(() => {
      setUploading(false)
      setUploadSuccess(true)

      // Reset after showing success message
      setTimeout(() => {
        setVideoUrl("")
        setUploadSuccess(false)
      }, 3000)
    }, 2000)
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Add YouTube Video
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
          mb: 3,
        }}
      >
        <VideoLibrary sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Enter YouTube Video URL
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Paste the URL of the YouTube video you want to add to your learning materials
        </Typography>

        <TextField
          label="YouTube URL"
          variant="outlined"
          fullWidth
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="https://www.youtube.com/watch?v=..."
          sx={{ mb: 2 }}
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {uploadSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Video added successfully!
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={!videoUrl || uploading}
        onClick={handleUpload}
        sx={{ mt: 2 }}
      >
        {uploading ? <CircularProgress size={24} color="inherit" /> : "Add Video"}
      </Button>
    </Box>
  )
}

