export const emailTemplate = (name, message) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Thank You Email</title>

<style>
  body { margin:0; padding:0; background:#f3f3f3; font-family:Inter,Arial; color:#1f1f1f; }
  .container { max-width:600px; margin:40px auto; padding:20px; }
  .glass-card {
    padding:32px; border-radius:22px;
    border:1px solid rgba(255,255,255,0.45);
    background:rgba(255,255,255,0.25);
    box-shadow:0 10px 30px rgba(0,0,0,0.12);
    -webkit-backdrop-filter:blur(25px);
    backdrop-filter:blur(25px);
  }
  .message-box {
    margin-top:12px; padding:15px; border-radius:14px;
    background:rgba(255,255,255,0.35);
    border:1px solid rgba(255,255,255,0.35);
    -webkit-backdrop-filter:blur(15px);
    backdrop-filter:blur(15px);
    font-style:italic;
  }
  @media (prefers-color-scheme: dark) {
    body { background:#0e0e0e; color:#ffffff; }
    .glass-card { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.18); }
    .message-box { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.18); color:#fff; }
  }
</style>
</head>

<body>

<div class="container">
  <div class="glass-card">

    <h2>Thank You for Reaching Out!</h2>

    <p>Hello ${name},</p>

    <p>
      Thank you for contacting us! We've received your message and will
      get back to you shortly.
    </p>

    <p>Your Message:</p>
    <div class="message-box">
      ${message}
    </div>

    <p style="margin-top:30px;">
      Warm regards,<br>
      <strong>Krunal Baldha</strong><br>
      Product Manager
    </p>

  </div>
</div>

</body>
</html>
`;
