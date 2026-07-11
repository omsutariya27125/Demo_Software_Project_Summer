import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import HomePage from './Pages/Home_Page';
import WelcomePage from "./Pages/WelcomePage";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import Question from "./Pages/Question";
import Chapter from "./Components/Chapter";

function App() {


return (
    
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/question/:TopicName/:ChapterName" element={<Question />} />
        <Route path="/chapter" element={<Chapter />} />
        <Route path="/chapter/:topicSlug" element={<Chapter />} />
        <Route path="*" element={<div>Fuck SAURABH Hard</div>} />
      </Routes>
    
  );
}
export default App;