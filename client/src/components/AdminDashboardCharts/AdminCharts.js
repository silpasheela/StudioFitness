import React, { useEffect, useState } from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement   } from 'chart.js';
import { instance } from '../../api/axiosInstance';
import { Typography } from '@mui/material';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement  );

function AdminCharts() {

    const [appointmentsChartData, setAppointmentsChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
            },
        ],
    });

    const [revenueByPlanChartData, setRevenueByPlanChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Revenue',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
            },
        ],
    });

    const [trainersChartData, setTrainersChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: [],
            },
        ],
    });

    useEffect(() => {

        const fetchData = async () => {

            try {
                // Fetch data for appointments chart
                const appointmentsResponse = await instance.get('admin/appointment-status-chart');
                const appointmentsData = appointmentsResponse?.data?.appointmentStatusCounts;

                if (appointmentsData && Array.isArray(appointmentsData)) {
                    const cancelledCount = appointmentsData.find(item => item?.status === true)?.count || 0;
                    const nonCancelledCount = appointmentsData.find(item => item?.status === false)?.count || 0;

                    setAppointmentsChartData({
                        labels: [`Cancelled (${cancelledCount})`, `Not Cancelled (${nonCancelledCount})`],
                        datasets: [
                            {
                                data: [cancelledCount, nonCancelledCount],
                                backgroundColor: ['#FF6384', '#36A2EB'], 
                                hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                            },
                        ],
                    });
                } else {
                    console.error('Invalid data structure:', appointmentsData);
                }

                // Fetch data for revenue by plan chart
                const revenueByPlanResponse = await instance.get('admin/revenue-by-plan');
                const revenueByPlanData = revenueByPlanResponse?.data?.revenueByPlan;
    
                if (revenueByPlanData && Array.isArray(revenueByPlanData)) {
                    const labels = revenueByPlanData.map(item => {
                        if (item.plan === 999) {
                            return 'Standard Plan';
                        } else if (item.plan === 1999) {
                            return 'Premium Plan';
                        } else {
                            return `Plan ${item.plan}`;
                        }
                    });
                    const revenues = revenueByPlanData.map(item => item.totalRevenue);
    
                    setRevenueByPlanChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Revenue',
                                data: revenues,
                                backgroundColor: ['#FFD700', '#00FF00'], 
                                hoverBackgroundColor: ['#FFD700', '#00FF00'],
                            },
                        ],
                    });
                } else {
                    console.error('Invalid data structure:', revenueByPlanData);
                }

                // Fetch data for trainers by service
                const trainersResponse = await instance.get('admin/trainers-by-service');
                console.log(trainersResponse);
                const trainersData = trainersResponse?.data?.groupedTrainers;

                if (trainersData && Array.isArray(trainersData)) {
                    const labels = trainersData.map(item => item.service.name);
                    const totalTrainers = trainersData.map(item => item.totalTrainers);
                    const backgroundColors = generateRandomColors(trainersData.length);

                    setTrainersChartData({
                        labels: labels,
                        datasets: [
                            {
                                data: totalTrainers,
                                backgroundColor: backgroundColors,
                                hoverBackgroundColor: backgroundColors,
                            },
                        ],
                    });
                } else {
                    console.error('Invalid data structure:', trainersData);
                }

            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const generateRandomColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(getRandomColor());
        }
        return colors;
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Typography variant='h5' style={{ textDecoration: 'underline' }}>Appointment Status Distribution</Typography>
            <div style={{ width: '30%', height: '30%' }}>
                <Doughnut data={appointmentsChartData} />
            </div>

            <Typography variant='h5' style={{ textDecoration: 'underline' }}>Revenue by Plan</Typography>
            <div style={{ width: '30%', height: '30%' }}>
                <Bar data={revenueByPlanChartData} />
            </div>

            <Typography variant='h5' style={{ textDecoration: 'underline' }}>Trainers Distribution by Service</Typography>
            <div style={{ width: '30%', height: '30%' }}>
                <Pie data={trainersChartData} />
            </div>
        </div>
    );
}

export default AdminCharts;
