# InputValid-dotnet-secure - .NET 8 Secure Build (Insecure Secrets Management)

This repository houses a specific application build that is part of a larger comparative study, "Evaluating the Effectiveness of Secure Coding Practices Across Python, MERN, and .NET 8." The experiment systematically assesses how secure coding techniques mitigate critical web application vulnerabilities—specifically improper input validation, insecure secrets management, and insecure error handling—across these three diverse development stacks. Through the development of paired vulnerable and secure application versions, this study aims to provide empirical evidence on the practical effectiveness of various security controls and the impact of architectural differences on developer effort and overall security posture.

## Purpose
This particular build contains the **Secure Build** of the C# .NET 8 application, specifically designed to demonstrate robust secure coding practices for **Insecure Secrets Management**.

## Vulnerability Focus
This application build specifically addresses the mitigation of:
* **Insecure Secrets Management:** Ensuring sensitive information (secrets) are handled securely without being hardcoded or exposed in the source code.

## Key Secure Coding Practices Implemented
* **Externalized Secrets Configuration:** The OpenAI API key, a sensitive credential, is no longer hardcoded within the source file. Instead, it is retrieved from the application's configuration at runtime using `IConfiguration["OpenAI:ApiKey"]`.
    * In a development environment, this typically involves storing the key in **.NET User Secrets** (a separate file outside the project directory, not checked into source control).
    * In production, this would involve using environment variables, Azure Key Vault, or another secure secrets management service.
* **Runtime Key Verification:** The application explicitly checks if the API key is present and not empty (`string.IsNullOrEmpty(openAIApiKey)`) before attempting to use it. If the key is missing, a generic `500 Internal Server Error` is returned with a non-descriptive message to prevent information leakage, guiding administrators to a configuration issue rather than a code problem.

## Setup and Running the Application

### Prerequisites
* **.NET 8 SDK:** Specifically version `8.0.411` (as enforced by the `global.json` file in this project's root).
* **OpenAI API Key (for testing functionality):** You will need a valid OpenAI API key to make successful API calls.
* **Configure User Secrets:**
    1.  Open your terminal in the backend project directory (e.g., `InputValid-dotnet-secure/dotnet/secure-secrets-management`).
    2.  Run: `dotnet user-secrets init` (if not already initialized).
    3.  Run: `dotnet user-secrets set "OpenAI:ApiKey" "YOUR_OPENAI_API_KEY_HERE"` (Replace `"YOUR_OPENAI_API_KEY_HERE"` with your actual key).
* Node.js and npm/yarn (for the React frontend, if testing full stack).

### Steps
1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    # Navigate to the specific build folder, e.g.:
    cd InputValid-dotnet-secure/dotnet/secure-secrets-management
    ```
2.  **Verify .NET SDK version (optional, but good practice):**
    ```bash
    dotnet --info
    ```
    Ensure it shows `Version: 8.0.411` under ".NET SDKs installed" and "SDK: Version: 8.0.411" for the host. If not, ensure `global.json` is correctly placed in this project's root directory.
3.  **Restore dependencies:**
    ```bash
    dotnet restore
    ```
4.  **Build the application:**
    ```bash
    dotnet build
    ```
5.  **Run the application:**
    ```bash
    dotnet run
    ```
    The application will typically start on `http://localhost:5000`.

## API Endpoints

### `POST /api/generate`
* **Purpose:** Generates a product description by calling an external AI API (OpenAI). This secure build retrieves the API key from configuration, demonstrating secure secrets management.
* **Method:** `POST`
* **Content-Type:** `application/json`
* **Request Body Example (JSON):**
    ```json
    {
      "productName": "Smart Watch",
      "keywords": "fitness tracking, long battery life, stylish"
    }
    ```
* **Expected Behavior:**
    * **With Valid API Key (in User Secrets):** Returns `200 OK` with a generated product description.
    * **Without API Key (missing from User Secrets):** Returns `500 Internal Server Error` with the message "OpenAI API Key is not configured in User Secrets.".
    * **With Invalid API Key (in User Secrets):** Returns `500 Internal Server Error` with a generic "Failed to generate description due to an API error." message, and an internal log of the OpenAI API error.

## Static Analysis Tooling
This specific build is designed to be analyzed by Static Analysis Security Testing (SAST) tools such as Semgrep and .NET Roslyn Analyzers to measure their detection capabilities for **insecure secrets management** (e.g., hardcoded secrets) and to verify compliance with secure coding standards.
