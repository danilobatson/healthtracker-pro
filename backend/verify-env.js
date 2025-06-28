#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function verifyEnvironment() {
  console.log('🔍 Verifying Environment Configuration...\n');
  
  const requiredVars = [
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'GOOGLE_GEMINI_API_KEY',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL'
  ];

  let allValid = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: Set`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      allValid = false;
    }
  });

  console.log('\n' + (allValid ? '✅ All environment variables set!' : '❌ Some variables missing'));
  
  // Save verification results
  const results = {
    timestamp: new Date().toISOString(),
    allValid,
    variables: requiredVars.map(name => ({
      name,
      set: !!process.env[name]
    }))
  };
  
  require('fs').writeFileSync('../verification_env_setup.txt', 
    `Environment Verification: ${new Date().toISOString()}\n` +
    `Status: ${allValid ? 'PASSED' : 'FAILED'}\n\n` +
    requiredVars.map(name => `${name}: ${process.env[name] ? 'SET' : 'MISSING'}`).join('\n')
  );
}

verifyEnvironment().catch(console.error);
