import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const trackEvent = async (eventName, extraData = {}) => {
  console.log('🔵 trackEvent called:', eventName);
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 5000)
    );

    const write = addDoc(collection(db, 'events'), {
      event: eventName,
      platform: extraData.platform || 'Android',
      timestamp: serverTimestamp(),
      ...extraData,
    });

    const result = await Promise.race([write, timeout]);
    console.log('✅ Event written to Firestore:', eventName, result?.id);

  } catch (error) {
    console.log('❌ Tracking FAILED:', eventName, error.message);
  }
};