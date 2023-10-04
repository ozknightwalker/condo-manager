
import { db } from "../services/firebase";

import { collection, onSnapshot, query, where } from "firebase/firestore";

const IssueDBRef = collection(db, "Issues");

export const newIssueCount = () => {
    const lastWeekTimestamp = new Date();
    lastWeekTimestamp.setDate(lastWeekTimestamp.getDate() - 7);

    return new Promise((resolve, reject) => {
        onSnapshot(query(IssueDBRef, where('created_at', '>=', lastWeekTimestamp)), (snapshot) => {
            resolve(snapshot)
        }, (err) => reject(err));
    })
}

export default IssueDBRef;