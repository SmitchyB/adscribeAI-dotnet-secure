// frontend/src/HomePage.js

import axios from 'axios'; // Import axios
import InputForm from '../components/InputForm'; // Import the InputForm component
import DescriptionDisplay from '../components/DescriptionDisplay'; // Import the DescriptionDisplay component
import './HomePage.css'; // Import the CSS for styling
import { useState } from 'react'; // Import useState for managing state

// HomePage component to handle the main functionality
function HomePage() {
  const [description, setDescription] = useState(''); // State to hold the generated description
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(''); // State to hold any error messages

  // Function to handle the generation of the product description
  const handleGenerate = async (productName, keywords) => {
    setIsLoading(true); // Set loading state to true when starting the request
    setDescription(''); // Clear previous description
    setError(''); // Clear previous errors

    try {
      // Make a POST request to our backend API
      const response = await axios.post('http://localhost:5001/api/generate', {
        productName,
        keywords,
      });
      
      // Set the description from the backend's response
      if (response.data.description) {
        setDescription(response.data.description);
      }

    } catch (err) {
      // If there's an error, display a message
      console.error("Error calling backend API:", err);
      setError('Sorry, something went wrong. Please try again.'); 
    } finally {
      // This will run whether the request succeeds or fails
      setIsLoading(false);
    }
  };

  // Render the InputForm and DescriptionDisplay components on the HomePage
  return (
    <div>
      <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
      <DescriptionDisplay description={description} isLoading={isLoading} error={error} />
    </div>
  );
}

export default HomePage;