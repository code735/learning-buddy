import React from 'react';

const PdfSection = ({ pdfs }) => {
  return (
    <div className="pdf-section">
      <h2>Uploaded PDFs</h2>
      <ul className="pdf-list">
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <a href={URL.createObjectURL(pdf)} target="_blank" rel="noopener noreferrer">
              {pdf.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PdfSection;
