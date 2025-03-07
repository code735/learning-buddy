"use client"
import React from "react";
import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { PictureAsPdf, VideoLibrary, School } from "@mui/icons-material"

interface DashboardProps {
  onNavigate: (page: "dashboard" | "pdf" | "video" | "lms") => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Learning Buddy
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Your personalized learning companion - Upload PDFs, watch videos, and track your progress all in one place.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
              <PictureAsPdf sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                PDF Upload
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Upload and interact with your PDF study materials
              </Typography>
              <Button variant="contained" color="primary" onClick={() => onNavigate("pdf")} sx={{ mt: "auto" }}>
                Upload PDF
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
              <VideoLibrary sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Video Learning
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Add YouTube videos to your learning collection
              </Typography>
              <Button variant="contained" color="primary" onClick={() => onNavigate("video")} sx={{ mt: "auto" }}>
                Add Video
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}>
              <School sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Learning Dashboard
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Access your learning materials and track your progress
              </Typography>
              <Button variant="contained" color="primary" onClick={() => onNavigate("lms")} sx={{ mt: "auto" }}>
                Go to LMS
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

