"use client"

import React from "react"

import { useState } from "react"
import { Box, Button, TextField, Typography, Paper, Alert, CircularProgress, Grid } from "@mui/material"
import { VideoLibrary, Chat } from "@mui/icons-material"

interface VideoUploadProps {
  onNavigate: (page: any) => void
}

export default function VideoUpload({ onNavigate }: VideoUploadProps) {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoTitle, setVideoTitle] = useState("")
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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(event.target.value)
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

    if (!videoTitle.trim()) {
      setError("Please enter a title for the video")
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
        setVideoTitle("")
        setUploadSuccess(false)
      }, 3000)
    }, 2000)
  }

  const handleChatWithVideo = () => {
    if (videoUrl && videoTitle) {
      onNavigate({ type: "videochat", videoName: videoTitle })
    } else {
      setError("Please enter both a YouTube URL and a title")
    }
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

        <TextField
          label="Video Title"
          variant="outlined"
          fullWidth
          value={videoTitle}
          onChange={handleTitleChange}
          placeholder="Enter a title for this video"
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

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!videoUrl || !videoTitle || uploading}
            onClick={handleUpload}
          >
            {uploading ? <CircularProgress size={24} color="inherit" /> : "Add Video"}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            disabled={!videoUrl || !videoTitle}
            onClick={handleChatWithVideo}
            startIcon={<Chat />}
          >
            Chat with this Video
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

