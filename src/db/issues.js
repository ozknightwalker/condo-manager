import { db } from "../services/firebase";

import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

const IssueDBRef = collection(db, "Issues");
const IssueReportDBRef = collection(db, "IssueReport");

export const newIssueCount = () => {
    const lastWeekTimestamp = new Date();
    lastWeekTimestamp.setDate(lastWeekTimestamp.getDate() - 7);

    return new Promise((resolve, reject) => {
        onSnapshot(
            query(IssueDBRef, where("created_at", ">=", lastWeekTimestamp)),
            (snapshot) => {
                resolve(snapshot);
            },
            (err) => reject(err)
        );
    });
};

export const issuesList = (issue_id) => {
    return new Promise((resolve, reject) => {
        onSnapshot(
            query(
                IssueDBRef,
                orderBy("created_at", "desc"),
                orderBy("latest_reported", "desc")
            ),
            (snapshot) => {
                resolve(
                    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
            },
            (err) => reject(err)
        );
    });
};

export const createIssueReport = async (issue_id, total_counter) => {
    const issueRef = doc(IssueDBRef, issue_id);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const reportsQuery = query(
        IssueReportDBRef,
        where("issue", "==", issueRef.path),
        where("reported_date", "==", currentDate)
    );
    const reportsSnapshot = await getDocs(reportsQuery);

    let response = null;

    if (reportsSnapshot.size > 0) {
        // If there is already a report for the same date, update the counter
        const existingReport = reportsSnapshot.docs[0];
        response = await updateDoc(doc(db, "IssueReport", existingReport.id), {
            counter: existingReport.data().counter + 1,
        });
    } else {
        // If no report exists for the date, create a new report
        const newReport = {
            issue: issueRef.path,
            reported_date: currentDate,
            counter: 1,
        };
        response = await addDoc(IssueReportDBRef, newReport);
    }

    if (response !== null) {
        // update issue latest reported date
        await updateDoc(issueRef, {
            latest_reported: new Date(),
            total_counter: total_counter + 1,
        });
    }
    return response;
};

export const issueReportGraphData = async (issue_id) => {
    const issueRef = doc(IssueDBRef, issue_id);

    const reportsQuery = query(
        IssueReportDBRef,
        where("issue", "==", issueRef.path)
        // orderBy('reported_date', "desc")
    );
    return await getDocs(reportsQuery).then((snapshot) => {
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });
};

export default IssueDBRef;
