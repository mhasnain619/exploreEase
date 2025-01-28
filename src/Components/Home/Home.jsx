import { Box } from '@mui/material'
import React from 'react'

const Home = () => {
    return (
        <Box sx={{ py: 5 }}>
            <h3> Welcome to the Dashboard :</h3>
            <p>

                This is the central hub where you can access
                and manage all key aspects of your application.
                Navigate through different sections such as Users, Products, Profile, and Contact using the sidebar menu. The dashboard provides a user-friendly interface for quick access to essential data, analytics, and management tools. Get real-time insights and efficiently handle tasks with just a few clicks.
            </p>
            <h3>Purpose of This Website</h3>
            <p>
                The primary purpose of this website is to enhance my skills in React Nested Routing while utilizing Material-UI (MUI) for UI components.
                This project serves as a hands-on practice to efficiently structure a dashboard with multiple pages, implementing a responsive sidebar navigation and seamless transitions between different sections. Through this, I am improving my understanding of React Router, component-based development, and UI/UX design with MUI.
            </p>
        </Box>
    )
}

export default Home
