import "../styles/MessageAdmin.css";
import { useState } from "react";

export default function MessageAdmin() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();

    // כאן בעתיד תשלחי לשרת / Firebase וכו'
    setSubmitted(true);
  };


  return (
    <div className="help-container">
        <div className="headline">
            <h1>צריכ/ה עזרה?</h1>
            <p>נחשפת לתוכן פוגעני? נחסמת? תקלה טכנית?</p>
            <p>לפניה לאדמיניות שלנו ניתן למלא את הטופס</p>
        </div>
        <div className="form-div">
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                <label htmlFor="title">נושא הפניה:</label>
                <input id="title" name="title" />

                <label htmlFor="content">תוכן הפניה:</label>
                <textarea id="content" name="content" rows="6" />

                <button type="submit" className="send-button">
                    שלח
                </button>
                </form>
            ) : (
                <div className="success-message">
                <h2>הטופס נשלח בהצלחה!</h2>
                <p>האדמיניות שלנו יחזרו אליך בהקדם 💗</p>
                </div>
            )}
        </div>
    </div>
  );
}