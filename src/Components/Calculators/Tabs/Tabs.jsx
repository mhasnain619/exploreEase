import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScaleIcon from '@mui/icons-material/Scale';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PercentIcon from '@mui/icons-material/Percent';
import AverageGradeCalculator from '../Tools/FinalExamCalculator';
import PercentageCalculator from '../Tools/PercentageCalculator';
import './Tabs.css'; // Ensure this matches your file structure

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

  const tabs = [
    { label: 'A Note Letter', icon: <EditNoteIcon /> },
    { label: 'Average Grades', icon: <CalculateIcon /> },
    { label: 'Weighted Grades', icon: <ScaleIcon /> },
    { label: 'Final Note', icon: <EmojiEventsIcon /> },
    { label: 'Projection', icon: <TimelineIcon /> },
    { label: 'Conversion', icon: <SyncAltIcon /> },
    { label: 'Percentages', icon: <PercentIcon /> },
  ];

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 9, px: 1 }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="tools tabs"
        variant="scrollable"
        scrollButtons="auto"
        centered
        sx={{
          '& .MuiTabs-indicator': { display: 'none' }, // Remove default indicator
          display: 'flex',
          justifyContent: 'center',
          '& .MuiTab-root': {
            flex: '1 1 auto', // Allow tabs to grow equally
            maxWidth: '160px', // Limit max width for consistency
            margin: '0 4px', // Equal spacing between tabs
          },
          [theme => theme.breakpoints.down('sm')]: {
            flexDirection: 'column', // Stack vertically on small screens
            alignItems: 'center',
            '& .MuiTab-root': {
              maxWidth: '100%', // Full width in vertical mode
              margin: '2px 0', // Vertical spacing
              borderBottom: 'none',
              borderRight: '2px solid #ddd',
              '&.Mui-selected': {
                borderRight: '2px solid #1e40af',
              },
            },
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {tab.icon}
                <span style={{ marginLeft: '4px' }}>{tab.label}</span>
              </Box>
            }
            sx={{
              fontSize: '12px', // Base size
              textTransform:'unset',
              fontWeight: 'bold',
              padding: '6px 8px',
              minWidth: '80px',
              backgroundColor: index === tabs.length - 1 ? '#d1d5db' : '#ffebb3',
              color: index === tabs.length - 1 ? '#6b7280' : '#1e293b',
              borderRadius: '4px 4px 0 0',
              '&:hover': {
                backgroundColor: index === tabs.length - 1 ? '#d1d5db' : '#fed7aa',
              },
              '&.Mui-selected': {
                backgroundColor: '#ffebb3',
                borderBottom: '2px solid #1e40af',
              },
              ...(index === tabs.length - 1 && { pointerEvents: 'none' }), // Disable last tab
              [theme => theme.breakpoints.down('md')]: {
                fontSize: '0.75rem', // Reduce on medium screens (tablets)
                padding: '4px 6px',
                minWidth: '70px',
              },
              [theme => theme.breakpoints.down('sm')]: {
                fontSize: '0.625rem', // Further reduce on small screens (mobile)
                padding: '2px 4px',
                minWidth: '100%', // Full width in vertical mode
              },
            }}
          />
        ))}
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <AverageGradeCalculator />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <PercentageCalculator />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <AverageGradeCalculator />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        {/* Add component for Final Note */}
        <div>Final Note Content</div>
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        {/* Add component for Projection */}
        <div>Projection Content</div>
      </TabPanel>
      <TabPanel value={tabIndex} index={5}>
        {/* Add component for Conversion */}
        <div>Conversion Content</div>
      </TabPanel>
      <TabPanel value={tabIndex} index={6}>
        {/* Add component for Percentages (disabled tab) */}
        <div>Percentages Content</div>
      </TabPanel>
    </Box>
  );
};

export default ToolsPage;