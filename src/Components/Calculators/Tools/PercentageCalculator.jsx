import * as React from 'react';
import { useState } from 'react';
import { Box, Button, TextField, Typography, Grid, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CalculateIcon from '@mui/icons-material/Calculate';
import ClearIcon from '@mui/icons-material/Clear';
import { FaCalculator } from 'react-icons/fa';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function PercentageCalculator() {
    const [subjects, setSubjects] = useState([{ name: '', marks: '', maxMarks: '' }]);
    const [passPercentage, setPassPercentage] = useState(40);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubjectChange = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
        setResult(null);
        setError('');
    };

    const addSubject = () => {
        setSubjects([...subjects, { name: '', marks: '', maxMarks: '' }]);
        setResult(null);
        setError('');
    };

    const removeSubject = (index) => {
        if (subjects.length > 1) {
            const newSubjects = subjects.filter((_, i) => i !== index);
            setSubjects(newSubjects);
            setResult(null);
            setError('');
        }
    };

    const handlePassPercentageChange = (event) => {
        setPassPercentage(event.target.value);
        setResult(null);
        setError('');
    };

    const calculate = () => {
        for (let subject of subjects) {
            if (!subject.name || !subject.marks || !subject.maxMarks) {
                setError('Please fill in all fields for each subject');
                setResult(null);
                return;
            }
            const marks = parseFloat(subject.marks);
            const maxMarks = parseFloat(subject.maxMarks);
            if (isNaN(marks) || isNaN(maxMarks) || marks < 0 || maxMarks <= 0 || marks > maxMarks) {
                setError('Please enter valid marks (0 to max marks) and max marks (>0)');
                setResult(null);
                return;
            }
        }

        const passPercent = parseFloat(passPercentage);
        if (isNaN(passPercent) || passPercent < 0 || passPercent > 100) {
            setError('Please enter a valid passing percentage (0-100)');
            setResult(null);
            return;
        }

        const totalObtained = subjects.reduce((sum, subject) => sum + parseFloat(subject.marks), 0);
        const totalMax = subjects.reduce((sum, subject) => sum + parseFloat(subject.maxMarks), 0);
        const percentage = (totalObtained / totalMax) * 100;
        const requiredMarks = (passPercent / 100) * totalMax;
        const marksToPass = requiredMarks - totalObtained;

        setResult({
            totalObtained: totalObtained.toFixed(2),
            totalMax: totalMax.toFixed(2),
            percentage: percentage.toFixed(2),
            marksToPass: marksToPass > 0 ? marksToPass.toFixed(2) : 0,
            passed: percentage >= passPercent,
        });
        setError('');
    };

    const clearInputs = () => {
        setSubjects([{ name: '', marks: '', maxMarks: '' }]);
        setPassPercentage(40);
        setResult(null);
        setError('');
    };

    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 1000,
                mx: 'auto',
                mt: 10, // Offset for AppBar
                bgcolor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <FaCalculator size={24} color="#567ad3" />
                <Typography variant="h5" sx={{ color: '#567ad3', fontWeight: 600 }}>
                    Subject Percentage Calculator
                </Typography>
            </Box>
            <Grid container spacing={3}>
                {/* Left Side: Calculator Inputs */}
                <Grid item xs={12} md={6}>
                    <TransitionGroup>
                        {subjects.map((subject, index) => (
                            <CSSTransition key={index} timeout={300} classNames="subject">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        mb: 2,
                                        opacity: 1,
                                        transform: 'translateY(0)',
                                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                                        '&.subject-enter': {
                                            opacity: 0,
                                            transform: 'translateY(-20px)',
                                        },
                                        '&.subject-enter-active': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        },
                                        '&.subject-exit': {
                                            opacity: 1,
                                            transform: 'translateY(0)',
                                        },
                                        '&.subject-exit-active': {
                                            opacity: 0,
                                            transform: 'translateY(-20px)',
                                        },
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        label="Subject Name"
                                        value={subject.name}
                                        onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                        error={!!error}
                                        sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                                    />
                                    <TextField
                                        label="Marks Obtained"
                                        value={subject.marks}
                                        onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                                        type="number"
                                        error={!!error}
                                        sx={{ width: 150, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                                    />
                                    <TextField
                                        label="Max Marks"
                                        value={subject.maxMarks}
                                        onChange={(e) => handleSubjectChange(index, 'maxMarks', e.target.value)}
                                        type="number"
                                        error={!!error}
                                        sx={{ width: 150, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                                    />
                                    <IconButton
                                        onClick={() => removeSubject(index)}
                                        disabled={subjects.length === 1}
                                        sx={{
                                            color: '#567ad3',
                                            '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease' },
                                        }}
                                    >
                                        <RemoveCircleIcon />
                                    </IconButton>
                                </Box>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            onClick={addSubject}
                            startIcon={<AddCircleIcon />}
                            sx={{
                                bgcolor: '#567ad3',
                                color: 'white',
                                borderRadius: '8px',
                                '&:hover': {
                                    bgcolor: '#4567b7',
                                    transform: 'scale(1.05)',
                                    transition: 'background 0.3s ease, transform 0.3s ease',
                                },
                            }}
                        >
                            Add Subject
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2, maxWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel>Passing Percentage</InputLabel>
                            <Select
                                value={passPercentage}
                                onChange={handlePassPercentageChange}
                                label="Passing Percentage"
                                sx={{ borderRadius: '8px' }}
                            >
                                <MenuItem value={40}>40%</MenuItem>
                                <MenuItem value={50}>50%</MenuItem>
                                <MenuItem value={60}>60%</MenuItem>
                                <MenuItem value={70}>70%</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {error && (
                        <Box sx={{ mt: 2 }}>
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={calculate}
                            startIcon={<CalculateIcon />}
                            disabled={subjects.some((s) => !s.name || !s.marks || !s.maxMarks)}
                            sx={{
                                bgcolor: '#567ad3',
                                borderRadius: '8px',
                                '&:hover': {
                                    bgcolor: '#4567b7',
                                    transform: 'scale(1.05)',
                                    transition: 'background 0.3s ease, transform 0.3s ease',
                                },
                            }}
                        >
                            Calculate
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={clearInputs}
                            startIcon={<ClearIcon />}
                            sx={{
                                borderColor: '#567ad3',
                                color: '#567ad3',
                                borderRadius: '8px',
                                '&:hover': {
                                    borderColor: '#4567b7',
                                    color: '#4567b7',
                                    transform: 'scale(1.05)',
                                    transition: 'background 0.3s ease, transform 0.3s ease',
                                },
                            }}
                        >
                            Clear
                        </Button>
                    </Box>
                </Grid>
                {/* Right Side: Results */}
                <Grid item xs={12} md={6}>
                    {result && (
                        <Box
                            sx={{
                                p: 3,
                                bgcolor: '#e8eefe',
                                borderRadius: '8px',
                                height: '100%',
                                opacity: 0,
                                transform: 'translateX(20px)',
                                animation: 'fadeIn 0.5s ease forwards',
                                '@keyframes fadeIn': {
                                    to: { opacity: 1, transform: 'translateX(0)' },
                                },
                            }}
                        >
                            <Typography variant="h6" sx={{ color: '#567ad3', fontWeight: 600, mb: 2 }}>
                                Results
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#567ad3', mb: 1 }}>
                                Total Marks: <Typography component="span" sx={{ fontWeight: 600 }}>{result.totalObtained}</Typography> / {result.totalMax}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#567ad3', mb: 1 }}>
                                Percentage: <Typography component="span" sx={{ fontWeight: 600, color: '#567ad3' }}>{result.percentage}%</Typography>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#567ad3' }}>
                                Status: <Typography component="span" sx={{ fontWeight: 600, color: result.passed ? 'green' : 'red' }}>
                                    {result.passed ? 'Passed' : `Need ${result.marksToPass} more marks to pass`}
                                </Typography>
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}

export default PercentageCalculator;