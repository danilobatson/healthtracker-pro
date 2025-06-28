#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnvironment() {
  console.log('🚀 HealthTracker Pro - Environment Setup');
  console.log('=====================================\n');
  
  console.log('We need to set up several services for the app to work:');
  console.log('1. 🔐 Clerk (Authentication)');
  console.log('2. 🔥 Firebase (Database)');
  console.log('3. 🤖 Google Gemini (AI)');
  console.log('4. 🔒 NextAuth (Security)\n');
  
  const proceed = await question('Ready to start? (y/n): ');
  if (proceed.toLowerCase() !== 'y') {
    console.log('Setup cancelled.');
    rl.close();
    return;
  }

  const envVars = {};
  
  console.log('\n📋 Let\'s collect your API keys and configuration...\n');
  
  // Clerk setup
  console.log('🔐 CLERK AUTHENTICATION');
  console.log('1. Go to https://clerk.com and create a free account');
  console.log('2. Create a new application');
  console.log('3. Go to API Keys in your dashboard\n');
  
  envVars.CLERK_SECRET_KEY = await question('Enter your Clerk Secret Key (sk_test_...): ');
  envVars.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = await question('Enter your Clerk Publishable Key (pk_test_...): ');
  
  // Firebase setup
  console.log('\n🔥 FIREBASE DATABASE');
  console.log('1. Go to https://console.firebase.google.com');
  console.log('2. Create a new project or use existing');
  console.log('3. Enable Firestore Database');
  console.log('4. Go to Project Settings > Service Accounts');
  console.log('5. Generate new private key (downloads JSON file)\n');
  
  envVars.FIREBASE_PROJECT_ID = await question('Enter your Firebase Project ID: ');
  envVars.FIREBASE_CLIENT_EMAIL = await question('Enter your Firebase Client Email: ');
  console.log('📝 For the private key, paste the ENTIRE private key including BEGIN/END lines:');
  envVars.FIREBASE_PRIVATE_KEY = await question('Firebase Private Key: ');
  
  // Google Gemini setup
  console.log('\n🤖 GOOGLE GEMINI AI');
  console.log('1. Go to https://aistudio.google.com/app/apikey');
  console.log('2. Sign in with your Google account');
  console.log('3. Click "Create API Key"');
  console.log('4. Copy the generated API key\n');
  
  envVars.GOOGLE_GEMINI_API_KEY = await question('Enter your Google Gemini API Key: ');
  
  // NextAuth setup
  console.log('\n🔒 SECURITY CONFIGURATION');
  const randomSecret = require('crypto').randomBytes(32).toString('hex');
  console.log(`Generated random secret: ${randomSecret}`);
  envVars.NEXTAUTH_SECRET = await question(`NextAuth Secret (press Enter to use generated): `) || randomSecret;
  envVars.NEXTAUTH_URL = await question('NextAuth URL (press Enter for http://localhost:3000): ') || 'http://localhost:3000';
  envVars.NODE_ENV = 'development';
  
  // Create .env.local file
  console.log('\n📄 Creating .env.local file...');
  
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
    
  fs.writeFileSync('.env.local', envContent);
  
  console.log('✅ Environment file created successfully!');
  console.log('\n📁 File location: backend/.env.local');
  console.log('\n🔐 Keep this file secure and never commit it to git!');
  
  rl.close();
}

setupEnvironment().catch(console.error);
