import { useState, useEffect } from 'react';
import { db } from '../connectFirebase/config';
import { onSnapshot } from 'firebase/firestore';
const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        let collectionRef = db.collection(collection);
        //collectionRef = collectionRef.where("name","==","test");

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                // reset documents data
                setDocuments([]);
                return;
            }

            collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(documents);
        });

        return unsubscribe;
    }, []);

    return documents;
};

export default useFirestore;
