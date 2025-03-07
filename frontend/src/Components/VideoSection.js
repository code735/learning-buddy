import React from 'react';

const VideoSection = ({ videos }) => {
  return (
    <div className="video-section">
      <h2>Uploaded Videos</h2>
      <div className="video-list">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <video width="320" height="240" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;
