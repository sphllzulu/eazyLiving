import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const TermsOfUse = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
      <Typography variant="h4" gutterBottom>
          Terms of Use
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our hotel booking platform. By accessing or using the app, you agree to be bound by these terms and conditions.
        </Typography>

        {/* User Accounts */}
        <Typography variant="h5" gutterBottom>
          1. User Accounts
        </Typography>
        <Typography variant="body1" paragraph>
          Users must create an account to access features such as booking accommodations, managing profiles, and saving favorites. You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately of any unauthorized use of your account.
        </Typography>

        {/* Accommodation Listings */}
        <Typography variant="h5" gutterBottom>
          2. Accommodation Listings
        </Typography>
        <Typography variant="body1" paragraph>
          The accommodations listed are subject to availability and may be changed without prior notice. Prices, descriptions, amenities, and other details are updated periodically but may not always reflect real-time information.
        </Typography>

        {/* Booking Policies */}
        <Typography variant="h5" gutterBottom>
          3. Booking Policies
        </Typography>
        <Typography variant="body1" paragraph>
          By booking through our app, you agree to the terms of the reservation, including check-in and check-out times, the number of guests, and any other accommodation-specific policies. Failure to comply with these terms may result in penalties, including the cancellation of your booking.
        </Typography>

        {/* Payment Terms */}
        <Typography variant="h5" gutterBottom>
          4. Payment Terms
        </Typography>
        <Typography variant="body1" paragraph>
          All bookings require full or partial payment at the time of booking, as specified. Accepted payment methods include credit cards, debit cards, and other payment gateways such as Stripe. We do not store credit card information, and all payments are processed securely through third-party payment processors.
        </Typography>

        {/* Cancellation and Refund Policy */}
        <Typography variant="h5" gutterBottom>
          5. Cancellation and Refund Policy
        </Typography>
        <Typography variant="body1" paragraph>
          Cancellations must be made within the cancellation period specified at the time of booking. If you cancel after this period, you may not be entitled to a refund. Refund policies vary based on accommodation and booking conditions. Please review the cancellation policy before confirming your booking.
        </Typography>

        {/* User Responsibilities */}
        <Typography variant="h5" gutterBottom>
          6. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          You are responsible for providing accurate and up-to-date information during the booking process. Any fraudulent or false information may result in the cancellation of your booking and suspension of your account.
        </Typography>

        {/* Limitation of Liability */}
        <Typography variant="h5" gutterBottom>
          7. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          We do not guarantee the accuracy or completeness of the information provided by accommodation providers. We are not liable for any damages or losses arising from your use of the app or your stay at any listed accommodation. Your use of the app is at your own risk.
        </Typography>

        {/* Amendments */}
        <Typography variant="h5" gutterBottom>
          8. Amendments to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these terms of use at any time without prior notice. Your continued use of the app after changes to the terms will constitute acceptance of the new terms.
        </Typography>
        
      </Box>
    </Container>
  );
};

export default TermsOfUse;
