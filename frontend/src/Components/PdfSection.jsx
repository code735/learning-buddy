import React from 'react';

const PdfSection = ({ pdfs }) => {
  return (
    <div className="pdf-section" style={styles.pdfSection}>
      <h2>Uploaded PDFs</h2>
      <ul className="pdf-list" style={styles.pdfList}>
        {pdfs.map((pdf, index) => (
          <li key={index} style={styles.pdfListItem}>
            <a href={URL.createObjectURL(pdf)} target="_blank" rel="noopener noreferrer" style={styles.pdfLink}>
              {pdf.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  pdfSection: {
    marginBottom: '30px',
  },
  pdfList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  pdfListItem: {
    margin: '10px 0',
  },
  pdfLink: {
    textDecoration: 'none',
    color: 'blue',
  },
};

export default PdfSection;
