import { useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase'; // Adjust the import path as necessary

const useUpdateReadStatus = (chatId) => {
  useEffect(() => {
    const updateReadStatus = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "messages", chatId, "members", auth.currentUser.uid);
        await setDoc(userRef, { lastRead: serverTimestamp() }, { merge: true });
      }
    };

    updateReadStatus();
  }, [chatId]);
};

export default useUpdateReadStatus;
