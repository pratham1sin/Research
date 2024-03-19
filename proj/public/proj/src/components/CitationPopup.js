import React, { useState } from 'react';
import * as CSL from 'citeproc';

const CitationPopup = ({ isOpen, handleClose, citationStyles }) => {
  const [citationText, setCitationText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const generateCitations = () => {
    try {
      if (!citationText.trim()) {
        setErrorMessage('Please enter citation information.');
        return;
      }

      const sys = {
        retrieveItem: function(id) {
          return {
            id,
            title: citationText,
            itemType: 'book',
          };
        },
        retrieveLocale: function(lang) {
          return {
            lang,
          };
        },
      };

      const engine = new CSL.Engine(sys, {});
      const formatter = new CSL.getProcessor();

      const styles = ['html', 'rtf', 'text', 'markdown', 'asciidoc'];
      const citations = styles.map(style =>
        formatter.processCitationCluster(engine, [[citationText]], [citationText], style)
      );

      if (citations && citations.length > 0) {
        citationStyles(citations);
        setErrorMessage('');
      } else {
        setErrorMessage('No citations generated.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while generating citations.');
      console.error(error);
    }
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Generate Citation</h2>
        <textarea
          placeholder="Enter citation information..."
          value={citationText}
          onChange={(e) => setCitationText(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full resize-none focus:outline-none focus:ring focus:border-blue-300"
          rows="4"
        ></textarea>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="flex justify-end">
          <button
            onClick={generateCitations}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none mr-2"
          >
            Generate
          </button>
          <button
            onClick={handleClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitationPopup;
