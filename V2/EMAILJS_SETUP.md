# EmailJS Configuration Guide

## How to Configure Email Sending to contact@maplesmotorsports.com

The contact form is now set up to send emails using EmailJS. Follow these steps to complete the configuration:

### Step 1: Create a Free EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add an Email Service

1. Go to the [Email Services](https://dashboard.emailjs.com/admin/integration) page
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Important**: Use the email account where you want to SEND emails FROM
6. Note the **Service ID** (e.g., `service_abc123`)

### Step 3: Create an Email Template

1. Go to the [Email Templates](https://dashboard.emailjs.com/admin/templates) page
2. Click "Create New Template"
3. Set up the template like this:

**Template Settings:**
- **To Email**: `contact@maplesmotorsports.com` (or use `{{to_email}}`)
- **From Name**: `{{from_name}}`
- **From Email**: `{{from_email}}`
- **Subject**: `New Contact Form Submission: {{subject}}`

**Email Content (HTML):**
```html
<p>You have received a new message from the Maples Motorsports website contact form.</p>

<h3>Contact Details:</h3>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><small>This email was sent from the Maples Motorsports website contact form.</small></p>
```

4. Click "Save" and note the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to [Account Settings](https://dashboard.emailjs.com/admin/account)
2. Find your **Public Key** in the "API Keys" section
3. Note the **Public Key** (e.g., `YOUR_PUBLIC_KEY_HERE`)

### Step 5: Update the Website Code

Open the file: `V2/js/main.js`

Find line 349 and replace:
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

With your actual public key:
```javascript
emailjs.init('your_actual_public_key_here');
```

Find line 375 and replace:
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

With your actual Service ID and Template ID:
```javascript
emailjs.send('service_abc123', 'template_xyz789', {
```

### Step 6: Test the Contact Form

1. Open your website in a browser
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check the inbox for `contact@maplesmotorsports.com`

### EmailJS Free Plan Limits

- **200 emails per month** (Free plan)
- If you need more, you can upgrade to a paid plan

### Troubleshooting

**Problem: Emails not being received**
- Check your EmailJS dashboard for delivery status
- Make sure you've verified your email service connection
- Check spam/junk folders

**Problem: "Failed to send message" error**
- Verify all IDs are correct (Public Key, Service ID, Template ID)
- Check browser console for detailed error messages
- Make sure you're not exceeding the monthly limit

**Problem: Emails going to spam**
- Add proper SPF/DKIM records to your domain (requires domain access)
- Use a professional email service (Gmail, Office 365, etc.)

### Alternative: Using a Backend Service

If you prefer not to use EmailJS, you can also use:
- **Formspree**: https://formspree.io/
- **Web3Forms**: https://web3forms.com/
- **Your own backend API** with Node.js, PHP, etc.

---

**Need Help?**

Contact: contact@maplesmotorsports.com

---

**Last Updated:** 2025-12-13
