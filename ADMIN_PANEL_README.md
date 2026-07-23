# Easy Life Electrician Consult - Admin Control Panel

## Access the Admin Panel

**URL:** `http://localhost:8000/admin.html`

**Default Password:** `admin123`

⚠️ **IMPORTANT:** Change the default password immediately! See "Security" section below.

---

## Features

### 📊 Dashboard
- View quick statistics (service and testimonial counts)
- Check last update time
- Quick action buttons to navigate sections

### 🏢 Company Information
- Update company name
- Manage tagline
- Edit hero section headline and subtitle
- Update about us description

### 📞 Contact Details
- Manage phone numbers
- Update WhatsApp contact
- Edit email address
- Set office location
- Define service areas

### 🎨 Branding & Colors
- Upload company logo
- Customize brand colors:
  - Primary Blue
  - Electric Yellow (accent)
  - Dark Gray
  - Light Gray
- Colors update in real-time on the website

### ⚡ Services Management
- Add unlimited services
- Edit existing services
- Delete services
- Organize by category (Electrical or Solar)
- Add custom icons/emojis

### ⭐ Testimonials Management
- Add customer testimonials
- Edit testimonial details
- Delete testimonials
- Set star ratings
- Manage customer information

### 🎯 Hero Section
- Update hero section text
- Customize CTA button labels
- Upload hero background image

### ⚙️ Settings
- Change admin password
- Enable maintenance mode
- Export/import all data

---

## How to Use

### 1. Access Admin Panel
1. Open your browser
2. Go to `http://localhost:8000/admin.html`
3. Enter the password: `admin123`

### 2. Edit Company Information
1. Click "🏢 Company Info" in the sidebar
2. Fill in the form fields
3. Click "Save Company Info"
4. Changes appear on the website automatically

### 3. Manage Services
1. Click "⚡ Services" in the sidebar
2. Click "+ Add New Service"
3. Fill in the service details:
   - Icon (emoji): ⚡, ☀️, 🔧, etc.
   - Service Name: "House Wiring"
   - Description: "Professional residential wiring installations..."
   - Category: Electrical or Solar
4. Click "Save Service"
5. Services appear on the website immediately

### 4. Add Testimonials
1. Click "⭐ Testimonials" in the sidebar
2. Click "+ Add New Testimonial"
3. Fill in:
   - Customer Name
   - Customer Title (e.g., "Homeowner")
   - Testimonial Text
   - Star Rating
4. Click "Save Testimonial"

### 5. Update Colors & Branding
1. Click "🎨 Branding" in the sidebar
2. Click color picker to change colors
3. Upload logo image
4. Click "Save Branding"
5. Colors instantly update on the website

### 6. Backup Your Data
1. Click "⚙️ Settings" in the sidebar
2. Click "📥 Export Data"
3. File downloads as JSON
4. Keep this file safe for backup

### 7. Restore Data
1. Click "📤 Import Data"
2. Select previously exported JSON file
3. All data is restored

---

## Security

### Change Default Password
1. Open `admin-script.js`
2. Find line: `const ADMIN_PASSWORD = 'admin123';`
3. Change to: `const ADMIN_PASSWORD = 'YOUR_NEW_PASSWORD';`
4. Save the file

**IMPORTANT:** 
- Use a strong password
- Don't share the password
- Change it regularly
- This is client-side, so for production use a backend authentication system

### Protect Admin Panel (Production)
For live websites, implement:
1. Server-side authentication
2. HTTPS only
3. Rate limiting
4. Access logs
5. Two-factor authentication

---

## Data Storage

All data is stored in browser's **localStorage**:
- Services
- Testimonials
- Company info
- Contact details
- Brand colors
- Logo (as Base64)

**Note:** Data is specific to each browser. Exporting data is recommended.

---

## Syncing with Website

### Automatic Updates
The main website (index.html) can read and use admin data:

1. **Company Info** - Updates all company information
2. **Services** - Dynamically displays managed services
3. **Testimonials** - Shows managed testimonials
4. **Colors** - Applies custom brand colors
5. **Logo** - Displays custom logo in navigation

### Manual Sync
- Click "💾 Save All Changes" to ensure all updates are saved
- Click "👁️ Preview Site" to open the website in new tab

---

## Troubleshooting

### Data Not Showing on Website
1. Make sure you clicked "Save All Changes"
2. Refresh the website page (Ctrl+F5)
3. Check browser localStorage is enabled

### Can't Login
1. Verify password is correct
2. Check browser console for errors
3. Try a different browser
4. Clear browser cache

### Password Forgotten
1. Edit `admin-script.js`
2. Change the ADMIN_PASSWORD
3. Refresh admin panel
4. Use new password

### Lost All Data
1. If you exported before: Click "📤 Import Data" and select backup file
2. Otherwise: Data is in browser localStorage - check browser settings

---

## Tips & Best Practices

### ✅ DO:
- Export data regularly as backup
- Change password regularly
- Update information with latest details
- Test changes on preview
- Use meaningful service descriptions

### ❌ DON'T:
- Share admin password
- Use simple passwords like "123456"
- Delete important testimonials without backup
- Change colors frequently (confuses visitors)
- Store sensitive business data

---

## Advanced Features

### Add Custom Services
Services are stored as JSON in localStorage with structure:
```json
{
  "icon": "⚡",
  "name": "House Wiring",
  "description": "Professional residential wiring...",
  "category": "electrical"
}
```

### Export/Import Format
Exported files include:
- Company information
- Contact details
- Brand colors
- All services
- All testimonials
- Export timestamp

### Maintenance Mode
Enable to show "Under Maintenance" message:
1. Go to Settings
2. Check "Enable Maintenance Mode"
3. Save Settings
4. Visitors see maintenance notice

---

## Next Steps

1. ✅ Change the default password
2. ✅ Add your company's real information
3. ✅ Upload your logo
4. ✅ Set brand colors
5. ✅ Add your services
6. ✅ Add customer testimonials
7. ✅ Export data as backup
8. ✅ Deploy to hosting provider

---

## Support

For issues or questions:
1. Check browser console (F12)
2. Verify all required files are in place
3. Clear browser cache and localStorage
4. Try in different browser
5. Refer to troubleshooting section

---

**Version:** 1.0  
**Last Updated:** June 2026  
**Status:** Fully Functional
