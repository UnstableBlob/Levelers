# Gmail Setup for Email Notifications

## Step 1: Install Nodemailer
```bash
npm install nodemailer
```

## Step 2: Get Gmail App Password

Since Gmail has 2-factor authentication, you need to create an "App Password" (not your regular Gmail password):

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Click "Security"** on the left sidebar
3. **Enable 2-Step Verification** if you haven't already:
   - Click "2-Step Verification"
   - Follow the setup process
4. **Create an App Password**:
   - Go back to Security
   - Click "2-Step Verification"
   - Scroll down to "App passwords"
   - Click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Type "Levelers Website" or any name you want
   - Click "Generate"
   - **Copy the 16-character password** (you won't be able to see it again!)

## Step 3: Add to Environment Variables

Create or update your `.env.local` file in the root of your project:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `your-16-character-app-password` with the password from Step 2

## Step 4: Restart Your Development Server

After adding the environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test It!

1. Make sure you're logged in to your app
2. Go to the commission page
3. Fill out and submit a request
4. Check your Gmail inbox for the confirmation email!

## Troubleshooting

### "Invalid login" error
- Make sure you're using an **App Password**, not your regular Gmail password
- Check that 2-Step Verification is enabled
- Verify the email and password in `.env.local` are correct

### Email not receiving
- Check your spam folder
- Make sure the `.env.local` file is in the project root
- Restart the dev server after adding environment variables
- Check the console for any error messages

### "Less secure app" message
- You don't need to enable "less secure apps" if using App Passwords
- App Passwords are the secure way to do this

## Notes

- The `.env.local` file should be in your `.gitignore` (it is by default in Next.js)
- Never commit your App Password to git
- Emails will be sent from your Gmail address
- Gmail has a daily sending limit (~500 emails/day for free accounts)
