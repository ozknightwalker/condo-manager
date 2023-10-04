import {
    Box,
    SimpleGrid,
} from '@chakra-ui/react';

import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import { useEffect, useState } from 'react';
import StatsCard from "../components/StatsCard";

import { newIssueCount } from '../db/issues';

const HomePage = () => {
    const [activeUsers, setActiveUsers] = useState(0);
    const [issues, setIssues] = useState(0);
    const [marketItems, setMarketItems] = useState(0);

    const randomizeNumber = (maxValue=100) => {
        return Math.floor(Math.random() * maxValue);
    }

    // Fetch new issues count (replace 'issues' with your actual collection name)
    const fetchNewIssuesCount = async () => {
        return await newIssueCount()
            .then(res => setIssues(res.size))
            .catch(err => {
                console.log(err);
                setIssues(0)
            });
    };

    useEffect(() => {
        // randomize the values for now
        fetchNewIssuesCount();

        setActiveUsers(randomizeNumber());
        // setIssues(randomizeNumber(200));
        setMarketItems(randomizeNumber(300));

        return () => {
            setActiveUsers(0);
            setIssues(0);
            setMarketItems(0);
        };  // cleanup function
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    , []);

    return (
        <>
            {/* stats section */}
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    <StatsCard title={'Users'} stat={activeUsers} icon={<BsPerson size={'3em'} />} />
                    <StatsCard title={'Issues'} stat={issues} icon={<FiServer size={'3em'} />} />
                    <StatsCard title={'Market Items'} stat={marketItems} icon={<GoLocation size={'3em'} />} />
                </SimpleGrid>
            </Box>
        </>
    );
};

export default HomePage;
