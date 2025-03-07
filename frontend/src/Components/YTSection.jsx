import React from 'react';

const YTSection = ({ ytLinks }) => {
  return (
    <div className="yt-section" style={styles.ytSection}>
      <h2>Uploaded YouTube Links</h2>
      <div className="yt-list" style={styles.ytList}>
        {ytLinks.map((link, index) => (
          <div key={index} style={styles.ytItem}>
            <iframe
              width="560"
              height="315"
              src={link.replace('watch?v=', 'embed/')}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={styles.iframe}
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  ytSection: {
    marginBottom: '30px',
  },
  ytList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  ytItem: {
    marginBottom: '20px',
  },
  iframe: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default YTSection;
