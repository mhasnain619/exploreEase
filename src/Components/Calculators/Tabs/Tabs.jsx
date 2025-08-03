import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import AverageGradeCalculator from '../Tools/FinalExamCalculator';

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
        <Tab label="Final Exam Calculator" />
        <Tab label="Average Grade Calculator" />
        <Tab label="Final Note Calculator" />
        <Tab label="Final Note Calculator" />
        <Tab label="Final Note Calculator" />
        <Tab label="Final Note Calculator" />
        {/* Add more tabs here */}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <AverageGradeCalculator />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        {/* Replace this with your Average Grade Calculator component */}
         <AverageGradeCalculator />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        {/* Replace this with your Final Note Calculator component */}
         <AverageGradeCalculator />
      </TabPanel>
    </Box>
  );
};

export default ToolsPage;
