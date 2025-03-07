import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import videoimg from "./assests/videoimg.png";
import pdfimg from "./assests/pdf.jpg"

// Sample data (arg)
const arg = [
  {
    name: "JavaScript Basics",
    file: "javascript_basics.pdf",
    extractedtext: "JavaScript is a versatile programming language used for web development.",
  },
  {
    name: "React Guide",
    file: "react_guide.pdf",
    extractedtext: "React is a JavaScript library for building user interfaces.",
  },
  {
    name: "MongoDB Fundamentals",
    file: "mongodb_fundamentals.pdf",
    extractedtext: "MongoDB is a NoSQL database used for handling large sets of distributed data.",
  },
  {
    name: "Node.js Backend Development",
    file: "nodejs_backend.pdf",
    extractedtext: "Node.js allows building scalable network applications using JavaScript.",
  },
  {
    name: "CSS Flexbox & Grid",
    file: "css_layouts.pdf",
    extractedtext: "Learn how to use Flexbox and Grid for modern web layouts.",
  },
  {
    name: "Intro to JavaScript",
    file: "intro_to_js.mp4",
    extractedtext: "This video explains the fundamentals of JavaScript, including variables and functions.",
  },
  {
    name: "React Components",
    file: "react_components.mp4",
    extractedtext: "Learn about React components, props, and state management in this tutorial.",
  },
  {
    name: "Understanding MongoDB",
    file: "mongodb_tutorial.mp4",
    extractedtext: "An in-depth explanation of MongoDB collections, documents, and queries.",
  },
  {
    name: "Building REST APIs with Node.js",
    file: "nodejs_rest_api.mp4",
    extractedtext: "A tutorial on creating RESTful APIs using Express.js and Node.js.",
  },
  {
    name: "Mastering CSS Grid",
    file: "css_grid_tutorial.mp4",
    extractedtext: "This video covers CSS Grid layout techniques for responsive web design.",
  },
];

// Function to sort files into PDFs and videos
function sortFiles(arg) {
  let pdfs = [];
  let videos = [];

  arg.forEach((file) => {
    if (file.file.endsWith(".mp4")) {
      videos.push({ ...file, id: videos.length + 1, thumbnail: videoimg });
    } else if (file.file.endsWith(".pdf")) {
      pdfs.push({ ...file, id: pdfs.length + 1, thumbnail: pdfimg });
    }
  });

  return { pdfs, videos };
}

const ResourceCard = ({ title, type, link, thumbnail, extractedtext }) => (
  <Link to={link} className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-4">
    <img src={thumbnail} alt={title} className="w-full h-40 object-cover rounded" />
    <h3 className="text-lg font-semibold mt-2">{title}</h3>
    <p className="text-gray-400">{type}</p>
    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{extractedtext}</p>
  </Link>
);

function App() {
  const [activeContent, setActiveContent] = useState(null);
  const [resources, setResources] = useState({ videos: [], pdfs: [] });

  // Sort files on component mount
  useEffect(() => {
    const sortedFiles = sortFiles(arg);
    setResources({
      videos: sortedFiles.videos,
      pdfs: sortedFiles.pdfs,
    });
  }, []);

  const showContent = (type) => {
    setActiveContent(type === activeContent ? null : type);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Learning Resources</h1>
      </header>
      <div className="cards-container">
        <div
          className={`card ${activeContent === "video" ? "active" : ""}`}
          onClick={() => showContent("video") }
        >
          <h2>Video</h2>
          <span role="img" aria-label="play button">
            🎥
          </span>
        </div>
        <div
          className={`card ${activeContent === "pdf" ? "active" : ""}`}
          onClick={() => showContent("pdf")}
        >
          <h2>PDF</h2>
          <span role="img" aria-label="document">
            📄
          </span>
        </div>
      </div>
      <div className="content-section">
        {/* Video Content */}
        <div
          id="video-content"
          className={`content ${activeContent === "video" ? "active" : ""}`}
        >
          {resources.videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((video, idx) => (
                <ResourceCard
                  key={idx}
                  title={video.name}
                  type="Video"
                  link={`/resource/video/${video.id}`}
                  thumbnail={video.thumbnail}
                  extractedtext={video.extractedtext}
                />
              ))}
            </div>
          ) : (
            <p>No videos available.</p>
          )}
        </div>
        {/* PDF Content */}
        <div
          id="pdf-content"
          className={`content ${activeContent === "pdf" ? "active" : ""}`}
        >
          {resources.pdfs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.pdfs.map((pdf, idx) => (
                <ResourceCard
                  key={idx}
                  title={pdf.name}
                  type="PDF"
                  link={`/resource/pdf/${pdf.id}`}
                  thumbnail={pdf.thumbnail}
                  extractedtext={pdf.extractedtext}
                />
              ))}
            </div>
          ) : (
            <p>No PDFs available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;