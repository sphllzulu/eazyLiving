import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const PrivacyTerms = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
      <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our hotel booking platform.
        </Typography>

        {/* Data Collection */}
        <Typography variant="h5" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect the following types of personal information:
        </Typography>
        <ul>
          <li>Name, email address, and phone number when you register an account.</li>
          <li>Payment information when you make a booking (processed securely via third-party gateways like Stripe).</li>
          <li>Accommodation preferences, booking history, and interactions with the app.</li>
          <li>Technical information such as IP address, device information, and usage data to improve the app's performance.</li>
        </ul>

        {/* How We Use Your Information */}
        <Typography variant="h5" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your personal information for the following purposes:
        </Typography>
        <ul>
          <li>To provide hotel booking services and manage your reservations.</li>
          <li>To process payments securely via third-party gateways.</li>
          <li>To send you booking confirmations, updates, and other related notifications.</li>
          <li>To improve and customize your experience on the app based on your preferences.</li>
          <li>To communicate promotional offers, discounts, and other relevant updates (you can opt out of promotional communications).</li>
        </ul>

        {/* Data Sharing */}
        <Typography variant="h5" gutterBottom>
          3. How We Share Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or rent your personal information to third parties. We may share your information under the following circumstances:
        </Typography>
        <ul>
          <li>With accommodation providers to process your booking and ensure a smooth check-in process.</li>
          <li>With payment processors (e.g., Stripe, PayPal) to securely handle transactions.</li>
          <li>With legal authorities if required by law or to protect our rights.</li>
        </ul>

        {/* Data Security */}
        <Typography variant="h5" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes:
        </Typography>
        <ul>
          <li>Encryption of sensitive data such as payment information.</li>
          <li>Strict access controls to personal data within our organization.</li>
          <li>Regular security audits and updates to ensure data protection.</li>
        </ul>

        {/* User Rights */}
        <Typography variant="h5" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body1" paragraph>
          You have the following rights regarding your personal data:
        </Typography>
        <ul>
          <li>Access to your personal information stored on our platform.</li>
          <li>The ability to update or correct any inaccurate information.</li>
          <li>The right to request deletion of your account and associated data.</li>
          <li>The ability to opt-out of marketing communications at any time.</li>
        </ul>

        {/* Cookies */}
        <Typography variant="h5" gutterBottom>
          6. Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to collect usage data, enhance your experience, and improve our services. You can control the use of cookies through your browser settings, but disabling them may affect the functionality of the app.
        </Typography>

        {/* Data Retention */}
        <Typography variant="h5" gutterBottom>
          7. Data Retention
        </Typography>
        <Typography variant="body1" paragraph>
          We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
        </Typography>

        {/* Changes to Privacy Policy */}
        <Typography variant="h5" gutterBottom>
          8. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes to how we handle your personal data.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyTerms;
