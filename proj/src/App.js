// src/App.js

import React, { useState } from 'react';
import ResearchTab from './components/ResearchTab';
import CitationPopup from './components/CitationPopup';

function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [citations, setCitations] = useState([]);

  const handleCitation = () => {
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const handleCitationStyles = (citations) => {
    setCitations(citations);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Research Tab</h1>
      <ResearchTab handleCitation={handleCitation} />
      <CitationPopup isOpen={popupOpen} handleClose={handleClose} citationStyles={handleCitationStyles} />
      <div className="mt-8">
  <h2 className="text-xl font-semibold mb-4">Generated Citations</h2>
  {citations.length > 0 ? (
    <ul className="list-disc pl-4">
      {citations.map((citation, index) => (
        <li key={index} className="mb-2">{citation}</li>
      ))}
    </ul>
  ) : (
    <p>No citations generated yet.</p>
  )}
</div>
    </div>
  );
}

export default App;

