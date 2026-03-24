const BACKEND_URL = 'http://172.18.38.176:5000';

export const trackEvent = async (eventName, extraData = {}) => {
  console.log('🔵 trackEvent called:', eventName);
  try {
    const response = await fetch(`${BACKEND_URL}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: eventName,
        platform: extraData.platform || 'Android',
        ...extraData,
      }),
    });

    const data = await response.json();
    if (data.success) {
      console.log('✅ Event saved to Firestore:', eventName);
    } else {
      console.log('❌ Backend rejected event:', eventName, data);
    }

  } catch (error) {
    console.log('❌ Tracking FAILED:', eventName, error.message);
  }
};