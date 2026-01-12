import "../styles/Welcome.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/chat");
    }

  return (
    <div className="title-div animate-enter" dir="rtl">
        <div className="title-with-logo">
            <h3>ברוכים הבאים לSafePlace</h3>
            <img src={logo} alt="SafePlace logo" className="logo" />
        </div>
      <h1>
        המקום הבטוח שלכם לדבר, לשתף ולהכיר חברים
      </h1>
        <p>
        חשוב לדעת: SafePlace היא סביבה בטוחה ומכבדת. תוכן פוגעני, מעליב או מזלזל אינו מותר,
        ומשתמשים שיפרו את הכללים ייחסמו מהמערכת.
        </p>
      <button onClick={handleClick}>
        לכניסה לצ&#39;אט <span className="arrow">←</span>
      </button>
    </div>
  );
}
