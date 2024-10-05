
import './App.css'

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Profile from "./Profile";

import Landing from './Landing';


// import Home from "./components/Home";
import SignIn from "./SignIn";
import PaymentComponent from './PaymentComponent';
import TermsOfUse from './TermsOfUse'
import PrivacyTerms from './PrivacyTerms';
import Gallery from './Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/gallery" element={<Gallery />} />
        
        <Route path="/privacy" element={<PrivacyTerms />} />
        
        <Route path="/login" element={<SignIn />} />
        <Route path="/payment" element={<PaymentComponent />} />
        
      </Routes>
    </Router>
  );
}


export default App;


