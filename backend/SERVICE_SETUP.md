# Service Setup Guide for HealthTracker Pro

## 🔐 1. Clerk Authentication Setup

### Step-by-step:
1. **Visit:** https://clerk.com
2. **Sign up** for a free account
3. **Create Application:**
   - Click "Create Application"
   - Name: "HealthTracker Pro"
   - Choose authentication methods: Email (recommended)
4. **Get API Keys:**
   - Go to "API Keys" in sidebar
   - Copy `Publishable Key` (starts with `pk_test_`)
   - Copy `Secret Key` (starts with `sk_test_`)

### Configuration:
- Authentication methods: Email magic links (passwordless)
- Session duration: Default (7 days)
- Multi-factor: Optional for demo

---

## 🔥 2. Firebase Setup

### Step-by-step:
1. **Visit:** https://console.firebase.google.com
2. **Create Project:**
   - Click "Create a project"
   - Name: "healthtracker-pro"
   - Disable Google Analytics (optional for demo)
3. **Enable Firestore:**
   - Go to "Firestore Database"
   - Click "Create database"
   - Start in test mode
   - Choose location (us-central1 recommended)
4. **Get Service Account:**
   - Go to Project Settings (gear icon)
   - Service Accounts tab
   - Click "Generate new private key"
   - Download JSON file

### From the JSON file, you need:
- `project_id` → FIREBASE_PROJECT_ID
- `client_email` → FIREBASE_CLIENT_EMAIL  
- `private_key` → FIREBASE_PRIVATE_KEY

---

## 🤖 3. Google Gemini AI Setup

### Step-by-step:
1. **Visit:** https://aistudio.google.com/app/apikey
2. **Sign in** with Google account
3. **Create API Key:**
   - Click "Create API Key"
   - Choose existing or create new project
   - Copy the generated key

### Models Available:
- `gemini-2.0-flash-lite` (recommended for speed)
- `gemini-1.5-flash` (backup option)

---

## 🔒 4. Security Configuration

### NextAuth Secret:
- Generate random 32-character string
- Or use: `openssl rand -hex 32`
- Keep secure and unique per environment

### URLs:
- Development: `http://localhost:3000`
- Production: Your deployed URL

---

## ✅ Verification Checklist

- [ ] Clerk keys obtained and valid
- [ ] Firebase project created and Firestore enabled
- [ ] Firebase service account JSON downloaded
- [ ] Google Gemini API key generated
- [ ] All environment variables set
- [ ] .env.local file created
- [ ] Services tested and working
