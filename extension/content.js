async function scanText(text) {
  console.log("Sending to Backend:", text.slice(0, 200));

  try {
    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    console.error("Scanner error:", err);
    return null;
  }
}

console.log("🟢 Safety Scanner content script loaded");

// simple check
setTimeout(async () => {
  const text = document.body.innerText.slice(0, 3000);
  console.log("Collected text:", text.slice(0, 200));

  const result = await scanText(text);
  console.log("Scan result:", result);

  if (result?.is_harmful) {
    showOverlay();
  }
}, 2000);

function showOverlay() {
  console.log("🚨 Showing overlay");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("overlay.css");

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("overlay.js");

  document.documentElement.appendChild(link);
  document.documentElement.appendChild(script);
}

