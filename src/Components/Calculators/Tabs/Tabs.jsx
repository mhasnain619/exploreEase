import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import AverageGradeCalculator from '../Tools/FinalExamCalculator';
import PercentageCalculator from '../Tools/PercentageCalculator';

// Simple TabPanel component for MUI Tabs content display
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tool-tabpanel-${index}`}
      aria-labelledby={`tool-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ToolsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 10, px: 1 }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="tools tabs"
        variant="fullWidth"
        centered
      >
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Final Exam Calculator" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="A Note Letter" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Average Grades" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Weighted Grades" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Final Note" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Projection" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Conversion" />
        <Tab sx={{fontSize:'10px', fontWeight:"bold", padding:"0px"}} label="Percentages" />
        {/* Add more tabs here */}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <AverageGradeCalculator />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {/* Replace this with your Average Grade Calculator component */}
         <PercentageCalculator />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        {/* Replace this with your Final Note Calculator component */}
         <AverageGradeCalculator />
      </TabPanel>
    </Box>
  );
};

export default ToolsPage;
