import { useState } from "react";
import { createIssueReport } from "../db/issues";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const IssueCard = ({ issue }) => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(issue?.total_counter || 0);

    const handleReportIssue = async () => {
        await createIssueReport(issue.id, counter).then(() => {
            setCounter(counter + 1);
        });
    };

    const routeIssue = () => {
        return navigate(`/issues/${issue.id}`);
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" p="4" m="4">
            <Flex justify="space-between" align="center">
                <Box>
                    <Heading as="h3" size="md" onClick={routeIssue}>
                        {issue.subject}
                    </Heading>
                    <Text>Description: {issue.description}</Text>
                    <Text>
                        Reported Date:{" "}
                        {dayjs(issue.latest_reported.toDate()).format(
                            "MMM DD, YYYY"
                        )}
                    </Text>
                    <Text>Total Report Counter: {counter}</Text>
                </Box>
                <Button colorScheme="primary" onClick={handleReportIssue}>
                    Report Issue
                </Button>
            </Flex>
        </Box>
    );
};

export default IssueCard;
