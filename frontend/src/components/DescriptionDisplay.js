// frontend/src/DescriptionDisplay.js
import './DescriptionDisplay.css';

// Added 'error' as a prop
function DescriptionDisplay({ description, isLoading, error }) {

  // Function to handle copying the description to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(description); // Use the Clipboard API to copy text
    alert('Description copied to clipboard!'); // Notify the user that the text has been copied
  };

  // Render the component
  return (
    <div className="card result-card">
      {isLoading && (
        <div className="loading-spinner"><div></div><div></div><div></div></div>
      )}
      {/* Display the error message if it exists */}
      {!isLoading && error && (
        <p className="error-text">{error}</p>
      )}
      {!isLoading && !error && !description && (
        <p className="placeholder-text">Your AI-generated description will appear here...</p>
      )}
      {!isLoading && !error && description && (
        <div className="result-textarea-wrapper">
          <textarea
            className="result-textarea"
            value={description}
            readOnly
          />
          <button onClick={handleCopy} className="copy-button">
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}

export default DescriptionDisplay;