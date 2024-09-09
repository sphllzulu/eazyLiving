import React from 'react';
import { Box, Typography, Grid, IconButton, Link } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#000000', // Black background
  color: '#ffffff',
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#9b59b6', // Purple accent color
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#9b59b6', // Purple accent color
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Grid container spacing={4}>
        {/* Contact Information Section */}
        <Grid item xs={12} md={4}>
          <FooterText variant="h6">Contact Us</FooterText>
          <FooterText variant="body1">
            EezyLiving, 123 Luxury Ave, City, Country
          </FooterText>
          <FooterText variant="body1">Phone: +123 456 7890</FooterText>
          <FooterText variant="body1">Email: info@eezyLiving.com</FooterText>
        </Grid>

        {/* Social Media Icons Section */}
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <FooterText variant="h6">Follow Us</FooterText>
          <Box>
            <SocialIcon component="a" href="https://www.facebook.com">
              <Facebook />
            </SocialIcon>
            <SocialIcon component="a" href="https://www.instagram.com">
              <Instagram />
            </SocialIcon>
            <SocialIcon component="a" href="https://www.twitter.com">
              <Twitter />
            </SocialIcon>
          </Box>
        </Grid>

        {/* Embedded Map Section */}
        <Grid item xs={12} md={4}>
          <FooterText variant="h6">Our Location</FooterText>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509181!2d144.95592581530863!3d-37.817209979751854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43b2c19e2d%3A0x953baf20b8c2c4c3!2sThe%20Hotel%20Windsor!5e0!3m2!1sen!2sus!4v1694141471623!5m2!1sen!2sus"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Hotel Location"
          ></iframe>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <FooterText variant="body2">
          &copy; {new Date().getFullYear()}EezyLiving . All rights reserved.
        </FooterText>
        <FooterText variant="body2">
          <FooterLink href="/terms">Terms of Service</FooterLink> |{' '}
          <FooterLink href="/privacy">Privacy Policy</FooterLink>
        </FooterText>
      </Box>
    </FooterContainer>
  );
};

export default Footer;

