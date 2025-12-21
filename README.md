Prerequisites:
   Node.js installed
   OpenAI API Key

Backend Setup:
   cd server
   npm install
   add .env file and add OPENAI_API_KEY=your_openai_api_key_here
   node server.js

Chrome Extension Installation:
   Open Google Chrome and navigate to chrome://extensions
   Enable Developer mode (toggle in the top right corner)
   Click Load unpacked and select the extension folder from this project

How To Test:
   Open any website (If the site was already open, refresh the page to inject the scanner)
   To simulate a harmful message:
      Right-click any text on the page and select Inspect
      Change the text to something harmful
      Enter
   Wait 3 seconds
   A red notification alert should appear in the bottom-right corner of your screen
   ![Alert Example](assets/alert.png)
