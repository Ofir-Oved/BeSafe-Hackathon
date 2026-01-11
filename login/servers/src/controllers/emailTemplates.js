function createVerifyEmailTemplate(name, verifyLink) {
  return `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>אימות כתובת מייל</title>
</head>
<body style="
  margin:0;
  padding:0;
  background:#f2f4f8;
  font-family:Arial, Helvetica, sans-serif;
  color:#333;
  direction:rtl;
  text-align:right;
">

  <div style="max-width:600px;margin:40px auto;padding:16px;">

    <div style="
      background:#ffffff;
      border-radius:14px;
      overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,0.06);
    ">

      
      <div style="
        background:linear-gradient(135deg, #6ec6ff, #ff7eb3);
        padding:32px;
        text-align:center;
        color:#ffffff;
      ">
        <h1 style="margin:0;font-size:24px;font-weight:bold;">
          BeSafe-Hackathon
        </h1>
        <p style="margin-top:8px;font-size:14px;opacity:0.95;">
          מרחב בטוח לשיח, חיבור ותמיכה
        </p>
      </div>

     
      <div style="padding:32px;">

        <p style="font-size:17px;line-height:1.7;margin:0 0 16px 0;">
          שלום ${name || "ושלום"},
        </p>

        <p style="font-size:16px;line-height:1.8;margin:0 0 16px 0;">
          אנחנו שמחים שבחרת BeSafe-Hackathon
        </p>

        <p style="font-size:16px;line-height:1.8;margin:0 0 24px 0;">
          כדי להשלים את ההצטרפות, נדרש רק לאמת את כתובת המייל שלך.
        </p>

        <div style="text-align:center;margin:36px 0;">
          <a href="${verifyLink}"
             style="
               background:linear-gradient(135deg, #6ec6ff, #ff7eb3);
               color:#ffffff;
               text-decoration:none;
               padding:14px 36px;
               border-radius:999px;
               font-size:16px;
               font-weight:bold;
               display:inline-block;
             ">
            אימות כתובת המייל
          </a>
        </div>

        <p style="font-size:14px;color:#666;line-height:1.6;margin:0;">
          אם לא ביקשת להצטרף – אפשר להתעלם מהמייל הזה.
        </p>

        <hr style="border:none;border-top:1px solid #eee;margin:32px 0;" />

        <p style="font-size:12px;color:#999;text-align:center;margin:0;">
          © 2026 BeSafe-Hackathon · נבנה באהבה ובאחריות
        </p>

      </div>
    </div>
  </div>
</body>
</html>
`;
}

module.exports = { createVerifyEmailTemplate };
