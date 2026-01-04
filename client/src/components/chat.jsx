import { useState } from "react";
import "../styles/chat.css";

export default function Chat({title}) {
  const [chatTitle, setChatTitle] = useState(title);

  return (
    <main className="chat">
      {/* Header */}
      <header className="chat_header">
        <div className="chat_title">{chatTitle}</div>
      </header>

      {/* Messages */}
      <section className="chat_messages">
        <div className="msg msg--bot">
          היי! ראיתי שגם אתה אוהב פורטנייט
          <div className="msg_meta">12:03</div>
        </div>

        <div className="msg msg--user">
          כן אני תמיד בעשרה הראשונים
          <div className="msg_meta">12:04</div>
        </div>

        <div className="msg msg--bot">
          וואו אתה טוב
          <div className="msg_meta">12:05</div>
        </div>
      </section>

      {/* Input */}
      <footer className="chat_input">
        <input
          className="chat_field"
          placeholder="הקלד הודעה..."
          disabled
        />
        <button className="chat_send" disabled>
          שלח
        </button>
      </footer>
    </main>
  );
}
