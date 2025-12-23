console.log("🟢 Overlay loaded");

const box = document.createElement("div");
box.innerText = "⚠️ זוהה תוכן שעלול להיות פוגעני. האם את צריכה תמיכה?";
Object.assign(box.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: "999999",
  background: "red",
  color: "white",
  padding: "16px",
  borderRadius: "8px",
  fontSize: "16px"
});

document.body.appendChild(box);
