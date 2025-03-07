"use client"

import React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  LinearProgress,
  Chip,
} from "@mui/material"
import { PictureAsPdf, VideoLibrary, AccessTime, Chat } from "@mui/icons-material"

interface LmsPageProps {
  onNavigate: (page: any) => void
}

// Mock data for demonstration
const mockPdfs = [
  { id: 1, title: "Introduction to React", progress: 75, lastAccessed: "2 days ago" },
  { id: 2, title: "TypeScript Fundamentals", progress: 30, lastAccessed: "1 week ago" },
  { id: 3, title: "Material UI Components", progress: 10, lastAccessed: "Just now" },
]

const mockVideos = [
  {
    id: 1,
    title: "React Hooks Tutorial",
    thumbnail: "/placeholder.svg?height=120&width=200",
    progress: 60,
    duration: "15:30",
    lastAccessed: "3 days ago",
  },
  {
    id: 2,
    title: "Building UIs with Material UI",
    thumbnail: "/placeholder.svg?height=120&width=200",
    progress: 100,
    duration: "22:45",
    lastAccessed: "1 month ago",
  },
  {
    id: 3,
    title: "TypeScript for Beginners",
    thumbnail: "/placeholder.svg?height=120&width=200",
    progress: 45,
    duration: "18:20",
    lastAccessed: "Yesterday",
  },
]

export default function Lmspage({ onNavigate }: LmsPageProps) {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleContinuePdf = (pdfTitle: string) => {
    onNavigate({ type: "pdfchat", pdfName: pdfTitle })
  }

  const handleContinueVideo = (videoTitle: string) => {
    onNavigate({ type: "videochat", videoName: videoTitle })
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Learning Management System
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Your Learning Progress
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Chip icon={<PictureAsPdf />} label="3 PDFs" color="primary" variant="outlined" />
          <Chip icon={<VideoLibrary />} label="3 Videos" color="secondary" variant="outlined" />
          <Chip icon={<AccessTime />} label="2.5 hours of content" variant="outlined" />
        </Box>
        <LinearProgress variant="determinate" value={65} sx={{ height: 10, borderRadius: 5 }} />
        <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
          65% Complete
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="learning content tabs">
            <Tab label="PDF Materials" />
            <Tab label="Video Content" />
          </Tabs>
        </Box>

        {/* PDF Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ py: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {mockPdfs.map((pdf) => (
                <Grid item xs={12} key={pdf.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <PictureAsPdf sx={{ fontSize: 40, color: "error.main", mr: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6">{pdf.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last accessed: {pdf.lastAccessed}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <Box sx={{ flexGrow: 1, mr: 2 }}>
                              <LinearProgress variant="determinate" value={pdf.progress} />
                            </Box>
                            <Typography variant="body2">{pdf.progress}%</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                          <Button variant="outlined" size="small" onClick={() => handleContinuePdf(pdf.title)}>
                            Continue
                          </Button>
                          <Button
                            variant="text"
                            size="small"
                            startIcon={<Chat />}
                            onClick={() => handleContinuePdf(pdf.title)}
                          >
                            Chat
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="outlined" startIcon={<PictureAsPdf />} onClick={() => onNavigate("pdf")} fullWidth>
                  Upload New PDF
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Video Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ py: 3 }}>
          {tabValue === 1 && (
            <Grid container spacing={3}>
              {mockVideos.map((video) => (
                <Grid item xs={12} md={6} lg={4} key={video.id}>
                  <Card>
                    <CardMedia component="img" height="140" image={video.thumbnail} alt={video.title} />
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {video.title}
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Duration: {video.duration}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {video.lastAccessed}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1, mr: 1 }}>
                          <LinearProgress variant="determinate" value={video.progress} />
                        </Box>
                        <Typography variant="body2">{video.progress}%</Typography>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                        <Button variant="contained" fullWidth onClick={() => handleContinueVideo(video.title)}>
                          {video.progress === 100 ? "Rewatch" : "Continue"}
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Chat />}
                          onClick={() => handleContinueVideo(video.title)}
                        >
                          Chat
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="outlined" startIcon={<VideoLibrary />} onClick={() => onNavigate("video")} fullWidth>
                  Add New Video
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  )
}

