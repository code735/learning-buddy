import React from 'react';

const YTSection = ({ ytLinks }) => {
  return (
    <div className="yt-section">
      <h2>Uploaded YouTube Links</h2>
      <div className="yt-list">
        {ytLinks.map((link, index) => (
          <div key={index}>
            <iframe
              width="560"
              height="315"
              src={link.replace('watch?v=', 'embed/')}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YTSection;
