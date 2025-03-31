# EezyLiving

**EezyLiving** is a modern hotel booking application where users can explore, book, and manage accommodations. Built using ReactJS, Firebase Authentication, Firebase Firestore, and Redux, it offers both guest and admin functionalities, including booking management, payment processing, and accommodation listings.

Click link to view and use the app: **https://eezyliving.onrender.com**

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [State Management](#state-management)
- [Data Storage](#data-storage)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Screenshot
![hotel](https://github.com/user-attachments/assets/034ec7d2-a1c3-4b00-9f13-b2fe986ef561)
![Image](https://github.com/user-attachments/assets/c118df76-690f-48dc-a46f-e3ad971be4e8)
![Image](https://github.com/user-attachments/assets/ddcafe3e-4a87-42a5-a557-6330caa1bd2d)

## Features

### User Features

1. **User Authentication**
   - Users can sign up, log in, and log out securely via Firebase Authentication.
   
2. **Accommodation Listings**
   - Users can view a list of available accommodations with the following details:
     - **Photo Gallery**: Images of the accommodation.
     - **Map**: The location of the accommodation.
     - **Price Details**: Pricing per night.
     - **Basic Information**: Address, star rating, and other details.
     - **Hotel Facilities & Policies**: Amenities and policies.
     - **Call-to-Action Button**: Users can book or view more details.
     - **Sharing Button**: Share accommodation details via social media or email.
     - **Favorites Button**: Save accommodation listings to the user's favorites.
   
3. **Booking Functionality**
   - Users can select check-in and check-out dates, the number of rooms, guests, etc.
   - Secure payment integration using Stripe (or preferred payment gateway).
   
4. **User Profile**
   - Users can edit their profile, view booking history, and manage favorites.
   
5. **Search & Filters**
   - Users can search for accommodations by location, price range, rating, and amenities.
   
6. **Reviews & Ratings**
   - Users can leave reviews and ratings for the accommodations they booked.

### Admin Features

1. **Admin Authentication**
   - Admins can securely log in via Firebase Authentication.

2. **Admin Dashboard**
   - Admins can manage accommodations and view/manage user bookings.
   
3. **Accommodation Management**
   - Admins can add, update, or delete accommodations.
   - Admins can manage room types, pricing, descriptions, and availability.
   
4. **Booking Management**
   - Admins can approve, modify, or cancel reservations.
   - Admins can view guest details, check-in/check-out dates, and reservation status.

### Additional Features

- **Notifications**
  - Users receive real-time notifications about bookings and promotions.
  
- **Responsive Design**
  - EezyLiving is designed to work seamlessly on all devices, from desktops to mobile phones.

---

## Technologies

- **Frontend**: ReactJS, Material-UI for UI/UX
- **Backend**: Firebase Firestore (for data storage), Firebase Authentication
- **State Management**: Redux Toolkit
- **Payments**: Stripe API (or alternative payment gateway)
- **Maps**: Google Maps API (or alternative)
- **Hosting**: Firebase Hosting or Netlify

---

## Installation

### Prerequisites

- Node.js
- Firebase account (for Authentication and Firestore)
- Stripe account (for payment integration)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/sphllzulu/eazyLiving.git
   cd eezyliving

2. Install Dependancies:

   ```bash
   npm install
  

3. Start the application:

   ```bash
   npm run dev
    
