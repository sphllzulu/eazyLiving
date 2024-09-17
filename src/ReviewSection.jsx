// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid, Card, CardContent, TextField, Button, Rating } from '@mui/material';
// import { collection, addDoc, getDocs } from 'firebase/firestore'; // Firestore functions
// import { db } from './firebase'; // Your Firestore config

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [reviews, setReviews] = useState([]); // State to store reviews
//   const [reviewText, setReviewText] = useState(''); // Input field for the review text
//   const [rating, setRating] = useState(0); // Rating state
//   const [currentUser, setCurrentUser] = useState(null); // Mock user for demonstration

//   // Fetch users data (including bookings and favorites)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersCollection = collection(db, 'users');
//         const userSnapshot = await getDocs(usersCollection);

//         const userData = userSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setUsers(userData);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Fetch existing reviews from Firestore
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const reviewsCollection = collection(db, 'reviews'); // New reviews collection
//         const reviewSnapshot = await getDocs(reviewsCollection);

//         const reviewData = reviewSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setReviews(reviewData);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // Handle submitting the review and rating
//   const handleSubmitReview = async () => {
//     if (!reviewText || rating === 0) {
//       alert('Please fill out the review and rating before submitting.');
//       return;
//     }

//     try {
//       const newReview = {
//         userId: currentUser?.email || 'Anonymous', // Assuming you have a logged-in user, or use 'Anonymous'
//         reviewText,
//         rating,
//         timestamp: new Date().toISOString(), // Adding a timestamp
//       };

//       // Save the new review to Firestore
//       await addDoc(collection(db, 'reviews'), newReview);

//       // Update local state with the new review
//       setReviews(prevReviews => [...prevReviews, newReview]);

//       // Clear form after submission
//       setReviewText('');
//       setRating(0);
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };

//   return (
//     <Box p={3}>
      

//       {/* Review Section */}
//       <Box mt={5}>
//         <Typography variant="h5">Leave a Review</Typography>

//         {/* Review Input */}
//         <TextField
//           label="Your Review"
//           fullWidth
//           multiline
//           rows={4}
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           sx={{ mt: 2 }}
//         />

//         {/* Rating Input */}
//         <Box mt={2}>
//           <Typography component="legend">Rate the Hotel</Typography>
//           <Rating
//             name="hotel-rating"
//             value={rating}
//             onChange={(event, newValue) => setRating(newValue)}
//           />
//         </Box>

//         {/* Submit Button */}
//         <Button
//           variant="contained"
//           color="primary"
          
//           sx={{ mt: 2, background:'purple' }}
//           onClick={handleSubmitReview}
//         >
//           Submit Review
//         </Button>
//       </Box>

//       {/* Display Reviews */}
//       <Box mt={5}>
//         <Typography variant="h5">Reviews</Typography>
//         <Grid container spacing={2}>
//           {reviews.map((review) => (
//             <Grid item xs={12} key={review.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="body2">
//                     <strong>User:</strong> {review.userId}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Rating:</strong> {review.rating}/5
//                   </Typography>
//                   <Typography variant="body2">{review.reviewText}</Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {new Date(review.timestamp).toLocaleString()}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default UsersList;


// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid, Card, CardContent, TextField, Button, Rating } from '@mui/material';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { db, auth } from './firebase'; // Import auth from Firebase config
// import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth function

// const UsersList = () => {
//   const [users, setUsers] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [currentUser, setCurrentUser] = useState(null); // Tracks the current logged-in user

//   // Monitor the authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is logged in
//         setCurrentUser(user);
//       } else {
//         // User is not logged in
//         setCurrentUser(null);
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   // Fetch users data (including bookings and favorites)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersCollection = collection(db, 'users');
//         const userSnapshot = await getDocs(usersCollection);

//         const userData = userSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setUsers(userData);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Fetch existing reviews from Firestore
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const reviewsCollection = collection(db, 'reviews'); // New reviews collection
//         const reviewSnapshot = await getDocs(reviewsCollection);

//         const reviewData = reviewSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setReviews(reviewData);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   // Handle submitting the review and rating
//   const handleSubmitReview = async () => {
//     if (!reviewText || rating === 0) {
//       alert('Please fill out the review and rating before submitting.');
//       return;
//     }

//     try {
//       const newReview = {
//         userId: currentUser?.email || 'Anonymous', // Use logged-in user's email or "Anonymous"
//         reviewText,
//         rating,
//         timestamp: new Date().toISOString(),
//       };

//       // Save the new review to Firestore
//       await addDoc(collection(db, 'reviews'), newReview);

//       // Update local state with the new review
//       setReviews(prevReviews => [...prevReviews, newReview]);

//       // Clear form after submission
//       setReviewText('');
//       setRating(0);
//     } catch (error) {
//       console.error('Error submitting review:', error);
//     }
//   };

//   return (
//     <Box p={5}>
//       {/* Review Section */}
//       <Box mt={5} sx={{width:"90%"}}>
//         <Typography variant="h5">Leave a Review</Typography>

//         {/* Review Input */}
//         <TextField
//           label="Your Review"
//           fullWidth
//           multiline
//           rows={4}
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//           sx={{ mt: 2 }}
//         />

//         {/* Rating Input */}
//         <Box mt={2}>
//           <Typography component="legend">Rate the Hotel</Typography>
//           <Rating
//             name="hotel-rating"
//             value={rating}
//             onChange={(event, newValue) => setRating(newValue)}
//           />
//         </Box>

//         {/* Submit Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2, background: 'purple' }}
//           onClick={handleSubmitReview}
//         >
//           Submit Review
//         </Button>
//       </Box>

//       {/* Display Reviews */}
//       <Box mt={5}>
//         <Typography variant="h5">Reviews</Typography>
//         <Grid container spacing={2}>
//           {reviews.map((review) => (
//             <Grid item xs={12} key={review.id}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="body2">
//                     <strong>User:</strong> {review.userId}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>Rating:</strong> {review.rating}/5
//                   </Typography>
//                   <Typography variant="body2">{review.reviewText}</Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {new Date(review.timestamp).toLocaleString()}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default UsersList;



import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, TextField, Button, Rating, IconButton } from '@mui/material';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase'; // Import Firebase authentication and Firestore
import { onAuthStateChanged } from 'firebase/auth'; // Firebase auth function
import EditIcon from '@mui/icons-material/Edit';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null); // Track logged-in user
  const [editReviewId, setEditReviewId] = useState(null); // Track the ID of the review being edited

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch reviews data from Firestore
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, 'reviews');
        const reviewSnapshot = await getDocs(reviewsCollection);

        const reviewData = reviewSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Handle review submission (new or editing existing)
  const handleSubmitReview = async () => {
    if (!reviewText || rating === 0) {
      alert('Please fill out the review and rating before submitting.');
      return;
    }
  
    try {
      if (editReviewId) {
        // Edit an existing review
        const reviewDocRef = doc(db, 'reviews', editReviewId);
        await updateDoc(reviewDocRef, {
          reviewText,
          rating,
          timestamp: new Date().toISOString(),
        });
  
        // Update the review in the local state
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editReviewId
              ? { ...review, reviewText, rating, timestamp: new Date().toISOString() }
              : review
          )
        );
  
        setEditReviewId(null); // Clear the edit state
      } else {
        // Submit a new review
        const newReview = {
          userId: currentUser?.email || 'Anonymous',
          reviewText,
          rating,
          timestamp: new Date().toISOString(),
        };
  
        // Firestore call to add a new review
        const docRef = await addDoc(collection(db, 'reviews'), newReview);
  
        // Update local state with the new review
        setReviews((prevReviews) => [
          ...prevReviews,
          { ...newReview, id: docRef.id },
        ]);
      }
  
      // Clear the form after submission
      setReviewText('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`Failed to submit review: ${error.message}`); // Handle error by alerting the user
    }
  };
  

  // Handle editing a review (populate the form)
  const handleEditReview = (reviewId, reviewText, rating) => {
    setEditReviewId(reviewId);
    setReviewText(reviewText);
    setRating(rating);
  };

  return (
    <Box p={3}>
      {/* Review Form */}
      <Box mt={5}>
        <Typography variant="h5">
          {editReviewId ? 'Edit Your Review' : 'Leave a Review'}
        </Typography>

        {/* Review Text Input */}
        <TextField
          label="Your Review"
          fullWidth
          multiline
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ mt: 2 }}
        />

        {/* Rating Input */}
        <Box mt={2}>
          <Typography component="legend">Rate the Hotel</Typography>
          <Rating
            name="hotel-rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, background: 'purple' }}
          onClick={handleSubmitReview}
        >
          {editReviewId ? 'Update Review' : 'Submit Review'}
        </Button>
      </Box>

      {/* Display Reviews */}
      <Box mt={5}>
        <Typography variant="h5">Reviews</Typography>
        <Grid container spacing={2}>
          {reviews.map((review) => (
            <Grid item xs={12} key={review.id}>
              <Card>
                <CardContent>
                  <Typography variant="body2">
                    <strong>User:</strong> {review.userId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rating:</strong> {review.rating}/5
                  </Typography>
                  <Typography variant="body2">{review.reviewText}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(review.timestamp).toLocaleString()}
                  </Typography>

                  {/* Show edit button if the current user is the review author */}
                  {currentUser?.email === review.userId && (
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditReview(review.id, review.reviewText, review.rating)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default UsersList;
