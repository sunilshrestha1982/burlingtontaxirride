// Tiny SMTP relay — deploy this on Render / Railway / Fly (NOT part of the website build).
// It receives HTTPS requests from the site and forwards them to Gmail SMTP
// using your burlingtonvttaxiride@gmail.com App Password.

import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json({ limit: "1mb" }));

const {
  GMAIL_USER,       // burlingtonvttaxiride@gmail.com
  GMAIL_APP_PASSWORD, // 16-character app password (no spaces)
  RELAY_SECRET,     // any long random string, must match the site
  PORT = 3000,
} = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
});

app.get("/", (_req, res) => res.send("ok"));

app.post("/send", async (req, res) => {
  if (RELAY_SECRET && req.get("X-Relay-Secret") !== RELAY_SECRET) {
    return res.status(401).json({ error: "unauthorized" });
  }
  const { to, subject, html, replyTo, fromName } = req.body || {};
  if (!to || !subject || !html) {
    return res.status(400).json({ error: "missing to/subject/html" });
  }
  try {
    const info = await transporter.sendMail({
      from: `"${fromName || "Burlington VT Taxi Ride"}" <${GMAIL_USER}>`,
      to,
      subject,
      html,
      replyTo,
    });
    res.json({ ok: true, id: info.messageId });
  } catch (e) {
    res.status(502).json({ error: String(e?.message || e) });
  }
});

app.listen(PORT, () => console.log("relay listening on " + PORT));
