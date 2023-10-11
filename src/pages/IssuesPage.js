import { useEffect, useState } from "react";

import { issuesList } from "../db/issues";

import { SimpleGrid } from "@chakra-ui/react";
import IssueCard from "../components/IssueCard";

const IssuesPage = () => {
    const [issues, setIssues] = useState([]);

    const fetchData = async () => {
        await issuesList()
            .then((issuesData) => {
                setIssues(issuesData);
                console.log(issuesData);
            })
            .catch((e) => {
                console.error(e);
                // no issues found
            });
    };

    // fetch issues data
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1>Issues Page</h1>

            <SimpleGrid columns={2} spacing={4}>
                {issues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default IssuesPage;
