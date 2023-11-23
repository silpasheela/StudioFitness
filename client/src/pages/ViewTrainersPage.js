import React, { useEffect, useState } from 'react';
import TrainerView from '../components/TrainerView/TrainerView';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { userViewAllTrainers } from '../app/features/User/userSlice';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, } from '@mui/material';
import NavBar from '../components/NavBar/NavBar';
import NoTrainerAvailable from '../components/Shared/NoTrainerAvailable';
import Loading from '../components/Shared/Loading';

function ViewTrainersPage() {
    const dispatch = useDispatch();

    //
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const [genderFilter, setGenderFilter] = useState([]);
    
    const handleFilterChange = (gender) => {
        // Clone the current genderFilter array
        const updatedFilter = [...genderFilter];
        
        if (updatedFilter.includes(gender)) {
        // If the gender is already in the filter, remove it
        updatedFilter.splice(updatedFilter.indexOf(gender), 1);
        } else {
        // If the gender is not in the filter, add it
        updatedFilter.push(gender);
        }
        
        setGenderFilter(updatedFilter);
    };

    useEffect(() => {
        dispatch(userViewAllTrainers());
    }, [dispatch]);

    const trainers = useSelector((state) => state.user?.user?.trainers);

    console.log(trainers)

    if (!trainers) {
        // return <p>Loading...</p>;
        return <Loading/>
    }


    const cardStyle = {
        flex: '0 0 calc(33.333% - 20px)',
        maxWidth: 'calc(33.333% - 20px)',
        aspectRatio: '1/1',
        minWidth: '315px',

    };

    const filteredTrainers = trainers.filter((trainer) => {
        const matchesGender = genderFilter.length === 0 || genderFilter.includes(trainer.gender);
        const matchesSearchTerm = trainer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || trainer.service.service.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGender && matchesSearchTerm;
    });

    return (

        <>
            <TextField
                sx={{ 
                    marginTop: '20vh',
                    marginLeft: '-162vh',
                    minWidth: '260px',
                    borderRadius: '50px',
                    fontWeight:'bolder',
                    backgroundColor: '#fff',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#6EC72D',
                            color:'#000',
                            fontWeight:'bolder',
                            borderRadius: '50px',
                        },
                        '&:hover fieldset': {
                            borderColor: '#6EC72D',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#6EC72D',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        '&.Mui-focused': {
                            color: '#6EC72D',
                        },
                    },
                }}
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{color:'#6EC72D'}} />
                        </InputAdornment>
                    ),
                }}
            />

        <div style={{ display: 'flex' , marginTop:'6vh'}}> 

        <div style={{marginLeft:30, backgroundColor: '#000', padding: '20px', borderRadius: '20px', height:'250px',minWidth:'225px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
        
            <h3 style={{ color: '#6EC72D', marginBottom: '20px', fontWeight: 'bolder' }}>GENDER FILTER</h3>
            <FormGroup>
            <FormControlLabel
                control={
                <Checkbox
                    checked={genderFilter.includes('male')}
                    onChange={() => handleFilterChange('male')}
                    sx={{
                        color: '#6EC72D', 
                        '&.Mui-checked': {
                            color: '#6EC72D',
                        },
                    }}
                />
                }
                label="Male"
                style={{ marginBottom: '10px', color:'#fff' }}

            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={genderFilter.includes('female')}
                    onChange={() => handleFilterChange('female')}
                    sx={{
                        color: '#6EC72D', 
                        '&.Mui-checked': {
                            color: '#6EC72D',
                        },
                    }}
                />
                }
                label="Female"
                style={{ marginBottom: '10px', color:'#fff' }}

            />
            <FormControlLabel
                control={
                <Checkbox
                    checked={genderFilter.includes('other')}
                    onChange={() => handleFilterChange('other')}
                    sx={{
                        color: '#6EC72D', 
                        '&.Mui-checked': {
                            color: '#6EC72D',
                        },
                    }}
                />
                }
                label="Other"
                style={{ marginBottom: '10px', color:'#fff' }}

            />
            </FormGroup>
        </div>
        <NavBar/>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', maxWidth: '1070px', margin: 'auto' }}>
            {filteredTrainers.length > 0 ? (
            filteredTrainers.map((trainer) => (
                <div key={trainer._id} style={cardStyle}>
                <TrainerView key={trainer._id} trainer={trainer} />
                </div>
            ))
            ) : (
            <>
            <NoTrainerAvailable/>
            </>
            )}
        </div>
        </div>
        </>

    );
}

export default ViewTrainersPage;

