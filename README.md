AdScribe.AI - .NET 8/C# (Secure Version)
This repository contains the .NET 8/C# stack version of the AdScribe.AI application. This version has been remediated to securely handle API keys and serves as a best-practice example for a university research project.

Application Purpose
AdScribe.AI is a simple marketing tool that uses the OpenAI API to generate compelling product descriptions based on a product name and user-provided keywords.

Security Context: The Fix
The primary purpose of this repository is to demonstrate a secure coding practice for managing secrets in a .NET application.

The hardcoded OPENAI_API_KEY vulnerability has been resolved by externalizing the secret using the .NET Secret Manager. The key is no longer stored in the source code. Instead, it is read from a secure local storage location at runtime via .NET's configuration system. This prevents the secret from being exposed in the codebase or committed to version control.

How to Run This Application
This is a standard full-stack application with a React frontend and a .NET 8 backend.

Prerequisites
.NET 8 SDK installed.

Node.js and npm installed.

An active OpenAI API key.

Instructions
1. Clone the Repository
git clone <your-repo-url>

2. Set the API Key (The Secure Step)
We will use the .NET Secret Manager to store your key safely.

Open a terminal and navigate into the backend/ directory.

Initialize the Secret Manager for the project:

dotnet user-secrets init

Set your OpenAI API key as a user secret. Replace the placeholder with your actual key.

dotnet user-secrets set "OpenAI:ApiKey" "your-actual-openai-api-key-goes-here"

Your key is now securely stored for local development.

3. Set up the Frontend (React)
In a separate terminal, navigate to the frontend/ folder.

Install the Node.js dependencies:

npm install

4. Run the Application
You will need two separate terminals to run the application.

Start the Backend:

In your first terminal (navigated to the backend/ directory), run the .NET server:

dotnet run

The backend will start on http://localhost:5001. It will automatically read the secret you set in Step 2.

Start the Frontend:

In your second terminal (navigated to the frontend/ directory), run the React development server:

npm start

The application will open in your browser, usually at http://localhost:3000.
