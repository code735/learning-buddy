import React, { useState } from 'react';
import VideoSection from './VideoSection';
import PdfSection from './PdfSection';
import YTSection from './YTSection';
import './styles/LMSPage.css'; 

const LMSPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [ytLinks, setYtLinks] = useState([]);
  const [question, setQuestion] = useState('');

  // Handle file uploads
  const handlePdfUpload = (e) => {
    const uploadedPdf = e.target.files[0];
    setPdfs((prevPdfs) => [...prevPdfs, uploadedPdf]);
  };

  const handleVideoUpload = (e) => {
    const uploadedVideo = e.target.files[0];
    setVideos((prevVideos) => [...prevVideos, uploadedVideo]);
  };

  const handleYtLinkSubmit = (e) => {
    e.preventDefault();
    const newYtLink = e.target.elements.ytLink.value;
    setYtLinks((prevLinks) => [...prevLinks, newYtLink]);
  };

  return (
    <div className="lms-container">
      <h1>Learning Buddy</h1>

      <div className="upload-sections">
        <div>
          <h3>Upload PDF</h3>
          <input type="file" onChange={handlePdfUpload} />
        </div>
        <div>
          <h3>Upload Video</h3>
          <input type="file" onChange={handleVideoUpload} />
        </div>
        <div>
          <h3>Upload YouTube Link</h3>
          <form onSubmit={handleYtLinkSubmit}>
            <input type="text" name="ytLink" placeholder="Paste YouTube link" required />
            <button type="submit">Add Link</button>
          </form>
        </div>
      </div>

      <VideoSection videos={videos} />
      <PdfSection pdfs={pdfs} />
      <YTSection ytLinks={ytLinks} />

      {/* Question Section */}
      <div className="question-section">
        <h2>Ask a Question</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about the uploaded content"
        ></textarea>
        <button>Submit Question</button>
      </div>
    </div>
  );
};

export default LMSPage;
