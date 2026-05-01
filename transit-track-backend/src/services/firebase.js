const admin = require('firebase-admin');

function buildCredentialConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, '\n'),
  };
}

function initFirebaseAdmin() {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const credentialConfig = buildCredentialConfig();
  if (!credentialConfig) {
    return null;
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert(credentialConfig),
    });
  } catch {
    return null;
  }
}

module.exports = {
  initFirebaseAdmin,
};
