# SMTP Relay (Gmail App Password)

The website runs on Cloudflare Workers, which cannot open SMTP ports.
This tiny service is the bridge: the site calls it over HTTPS, it sends
the mail through smtp.gmail.com:587 with your App Password.

## Deploy (free, ~5 minutes)

1. Push the `smtp-relay` folder to a GitHub repo (or upload it).
2. Go to https://render.com → New → Web Service → point it at that repo.
   - Root directory: `smtp-relay`
   - Build command: `npm install`
   - Start command: `npm start`
3. Add Environment Variables in Render:
   - `GMAIL_USER` = burlingtonvttaxiride@gmail.com
   - `GMAIL_APP_PASSWORD` = your 16-character app password (no spaces)
   - `RELAY_SECRET` = any long random string you invent
4. Deploy. Copy the public URL, e.g. `https://burlington-relay.onrender.com`

## Connect it to the website

Save these two secrets in Lovable:

- `SMTP_RELAY_URL` = `https://your-relay-url.onrender.com/send`
- `SMTP_RELAY_SECRET` = the same `RELAY_SECRET` value

Once both exist, every booking automatically sends through your Gmail
app password instead of the Gmail connector.
