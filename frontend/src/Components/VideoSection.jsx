import React from 'react';

const VideoSection = ({ videos }) => {
  return (
    <div className="video-section" style={styles.videoSection}>
      <h2>Uploaded Videos</h2>
      <div className="video-list" style={styles.videoList}>
        {videos.map((video, index) => (
          <div key={index} className="video-item" style={styles.videoItem}>
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

const styles = {
  videoSection: {
    marginBottom: '30px',
  },
  videoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  videoItem: {
    marginBottom: '20px',
  },
};

export default VideoSection;
