/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { instance } from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';
import { Box } from '@mui/material';

function formatDate(date) {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    return formattedDate;
}

function TrainerSlotView({handleBookSlot}) {

    const [slotData, setSlotData] = useState([]);
    const [expandedDate, setExpandedDate] = useState(null);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [selectedDateId, setSelectedDateId] = useState(null);


    const { id } = useParams();

    useEffect(() => {
        fetchSlot();
    }, []);

    const fetchSlot = async () => {
        const response = await instance.get(`user/view-slots/${id}`);
        console.log(response?.data?.slot?._id);
        setSlotData(response.data);
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const toggleDateExpansion = (date) => {
        if (expandedDate === date) {
            setExpandedDate(null);
        } else {
            setExpandedDate(date);
        }
    };


    const handleSlotClick = (slotId,dateId) => {

        setSelectedSlotId(slotId);
        setSelectedDateId(dateId)
        handleBookSlot(slotId,dateId);
    };

    console.log("setSelectedSlotId",selectedSlotId);
    console.log("setSelectedDateId",selectedDateId);

    return (
        <div>
            <Slider {...settings}>
                {slotData?.slots?.map((dateSlot, index) => (
                    <div key={index}>
                        <button
                            style={{
                                border: '1px gray dotted',
                                fontWeight:'bolder',
                                color: expandedDate === dateSlot.date ? '#000' : '#878180',
                                width: 'calc(50% - 8px)',
                                marginRight: '1.2rem',
                                padding: '.5rem 1.5rem',
                                borderRadius:'5px',
                                backgroundColor: expandedDate === dateSlot?.date ? '#6EC72D' : 'initial',
                            }}
                            onClick={() => toggleDateExpansion(dateSlot?.date)}
                        >
                            {formatDate(dateSlot?.date)}
                        </button>
                        {expandedDate === dateSlot?.date &&
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', }}>
                                {dateSlot?.slots?.map((slot, index) => (
                                    <Button
                                        variant="outlined"
                                        startIcon={slot?.status ? <LockIcon /> : selectedSlotId === slot?._id ? <LockIcon /> : <AccessTimeIcon />}
                                        onClick={slot?.status ? null : () => handleSlotClick(slot?._id,dateSlot?._id)}
                                        disabled={slot?.status}
                                        sx={{ 
                                            width: 'calc(50% - 8px)', // Set a fixed width
                                            backgroundColor: slot?.status ? '#ebe8e8' : selectedSlotId === slot?._id ? '#6EC72D' : 'initial',
                                            color: slot?.status ? '#000' : selectedSlotId === slot?._id ? '#000' : '#fff',
                                            marginBottom: '1rem',
                                            marginTop:'1rem',
                                            borderColor:'#6EC72D',
                                            '&:hover': {borderColor:'#fff',color:'#fff'}
                                        }}
                                    >
                                        {`${slot?.startTime} - ${slot?.endTime}`}
                                    </Button>
                                ))}
                            </Box>
                        }
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default TrainerSlotView;
