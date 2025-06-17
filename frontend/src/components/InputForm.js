// src/InputForm.js
import { useState } from "react"; // Import React's useState hook for managing component state
import "./InputForm.css"; // Import styles for the InputForm component

// InputForm component to handle user input for product name and keywords
function InputForm({ onGenerate, isLoading }) {

  const [productName, setProductName] = useState(''); // State to hold the product name input
  const [keywords, setKeywords] = useState(''); // State to hold the keywords input

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit
    onGenerate(productName, keywords); // Call the onGenerate function passed as a prop with the current inputs
  };
  // Render the input form for product name and keywords
  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g., Espresso Machine"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="keywords">Keywords</label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., sleek, fast, stainless steel"
            disabled={isLoading}
            required
          />
        </div>
        <button type="submit" className="generate-button" disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Description'}
        </button>
      </form>
    </div>
  );
}

export default InputForm;