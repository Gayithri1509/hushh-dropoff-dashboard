const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "drop-of-detection"
});

const db = admin.firestore();
db.settings({ preferRest: true });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hushh Backend is running!' });
});

app.get('/api/funnel', async (req, res) => {
  try {
    const snapshot = await db.collection('events').get();
    const counts = {
      app_launch: 0,
      email_screen_viewed: 0,
      otp_screen_viewed: 0,
      profile_setup_completed: 0,
      home_screen_viewed: 0,
    };
    snapshot.forEach(doc => {
      const event = doc.data().event;
      if (counts.hasOwnProperty(event)) {
        counts[event]++;
      }
    });
    const funnel = [
      { step: 'App Launch', count: counts.app_launch },
      { step: 'Email Entry', count: counts.email_screen_viewed },
      { step: 'OTP Verify', count: counts.otp_screen_viewed },
      { step: 'Profile Setup', count: counts.profile_setup_completed },
      { step: 'Activated', count: counts.home_screen_viewed },
    ];
    res.json({ success: true, funnel });
  } catch (error) {
    console.error('Error fetching funnel:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/track', async (req, res) => {
  console.log('Track request received:', req.body);
  try {
    const { event, platform, ...extraData } = req.body;
    await db.collection('events').add({
      event,
      platform: platform || 'Android',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ...extraData,
    });
    console.log('Event saved:', event);
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Hushh Backend running on port ' + PORT);
});