import { useParams } from "react-router-dom";

import IssueReportsChart from "../components/IssueReportChart";

const IssueDetailsPage = () => {
    const { issueID } = useParams();

    return (
        <div>
            <h2>Issue Details</h2>
            {/* Display other issue details as needed */}
            <IssueReportsChart issue_id={issueID} />
        </div>
    );
};

export default IssueDetailsPage;
