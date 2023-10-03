import {
    Box,
    SimpleGrid,
} from '@chakra-ui/react';

import { BsPerson } from 'react-icons/bs';
import { FiServer } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

import { useState } from 'react';
import StatsCard from "../components/StatsCard";

const HomePage = () => {
    const [activeUsers, setActiveUsers] = useState(0);
    const [issues, setIssues] = useState(0);
    const [marketItems, setMarketItems] = useState(0);

    return (
        <div>
            {/* stats section */}
            <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    <StatsCard title={'Active Users'} stat={activeUsers} icon={<BsPerson size={'3em'} />} />
                    <StatsCard title={'Issues'} stat={issues} icon={<FiServer size={'3em'} />} />
                    <StatsCard title={'Market Items'} stat={marketItems} icon={<GoLocation size={'3em'} />} />
                </SimpleGrid>
            </Box>
        </div>
    );
};

export default HomePage;
