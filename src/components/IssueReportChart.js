import {
    CategoryScale,
    Chart as ChartJS,
    LineElement,
    LinearScale,
    PointElement,
    Title,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import dayjs from "dayjs";
import { issueReportGraphData } from "../db/issues";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const IssueReportsChart = ({ issue_id }) => {
    const [reportData, setReportData] = useState({ labels: [], datasets: [] });
    const [maxCounter, setMaxCounter] = useState(0);

    const fetchReportsData = async () => {
        const labels = [];
        const data = [];

        await issueReportGraphData(issue_id).then((datas) => {
            datas
                .sort((a, b) => a.reported_date - b.reported_date)
                .forEach((item) => {
                    labels.push(dayjs(item.reported_date.toDate()));
                    data.push(item.counter);

                    setMaxCounter(Math.max(item.counter + 2, maxCounter));
                });
        });

        // if labels only contain less than 5 items then fill with the prev days
        const label_length = labels.length;
        if (label_length < 7) {
            // acquire the first element and start from there
            const first = labels[0] || dayjs();

            // lacking days
            for (let i = 0; i <= Math.abs(label_length - 7); i++) {
                // Your code to be executed 7 times goes here
                labels.unshift(first.subtract(i + 1, "day"));
                data.unshift(0);
            }
        }

        if (maxCounter === 0) {
            setMaxCounter(2);
        }

        setReportData({
            labels: labels.map((item) => item.format("DD/MM/YYYY")),
            datasets: [
                {
                    label: "Reported Counts",
                    data: data,
                    fill: false,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                    borderWidth: 2,
                },
            ],
        });
    };

    useEffect(() => {
        fetchReportsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issue_id]);

    return (
        <div>
            <Line
                data={reportData}
                id={`issue-${issue_id}-chart`}
                options={{
                    scales: {
                        y: {
                            ticks: {
                                precision: 0,
                            },
                            beginAtZero: true,
                            max: maxCounter,
                            stepSize: 1, // Set step size to 1 to show only whole numbers
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "Issue Report History",
                        },
                    },
                }}
            />
        </div>
    );
};

export default IssueReportsChart;
