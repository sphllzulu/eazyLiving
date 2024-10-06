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


// import React, { useState, useEffect } from 'react';
// import { Box, Typography, Grid, Card, CardContent, TextField, Button, Rating, IconButton } from '@mui/material';
// import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Import deleteDoc
// import { db, auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon

// const UsersList = () => {
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [editReviewId, setEditReviewId] = useState(null);

//   // Monitor authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setCurrentUser(user);
//       } else {
//         setCurrentUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Fetch reviews from Firestore
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const reviewsCollection = collection(db, 'reviews');
//         const reviewSnapshot = await getDocs(reviewsCollection);
//         const reviewData = reviewSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setReviews(reviewData);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       }
//     };
//     fetchReviews();
//   }, []);

//   // Handle review submission (new or editing existing)
//   const handleSubmitReview = async () => {
//     if (!reviewText || rating === 0) {
//       alert('Please fill out the review and rating before submitting.');
//       return;
//     }

//     try {
//       if (editReviewId) {
//         // Edit an existing review
//         const reviewDocRef = doc(db, 'reviews', editReviewId);
//         await updateDoc(reviewDocRef, {
//           reviewText,
//           rating,
//           timestamp: new Date().toISOString(),
//         });

//         setReviews((prevReviews) =>
//           prevReviews.map((review) =>
//             review.id === editReviewId
//               ? { ...review, reviewText, rating, timestamp: new Date().toISOString() }
//               : review
//           )
//         );
//         setEditReviewId(null);
//       } else {
//         // Submit a new review
//         const newReview = {
//           userId: currentUser?.email || 'Anonymous',
//           reviewText,
//           rating,
//           timestamp: new Date().toISOString(),
//         };

//         const docRef = await addDoc(collection(db, 'reviews'), newReview);
//         setReviews((prevReviews) => [
//           ...prevReviews,
//           { ...newReview, id: docRef.id },
//         ]);
//       }

//       setReviewText('');
//       setRating(0);
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert(`Failed to submit review: ${error.message}`);
//     }
//   };

//   // Handle editing a review (populate the form)
//   const handleEditReview = (reviewId, reviewText, rating) => {
//     setEditReviewId(reviewId);
//     setReviewText(reviewText);
//     setRating(rating);
//   };

//   // Handle deleting a review
//   const handleDeleteReview = async (reviewId) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this review?');
//     if (!confirmDelete) return;

//     try {
//       const reviewDocRef = doc(db, 'reviews', reviewId);
//       await deleteDoc(reviewDocRef);

//       // Remove the deleted review from the local state
//       setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       alert(`Failed to delete review: ${error.message}`);
//     }
//   };

//   return (
//     <Box
//       p={3}
//       sx={{
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         animation: 'fadeIn 1.5s ease-out',
//         '@keyframes fadeIn': {
//           from: { opacity: 0 },
//           to: { opacity: 1 },
//         },
        
        
//       }}
//     >
//       {/* Review Form */}
//       <Box mt={5}>
//         <Typography variant="h5" sx={{ color: '#333' }}>
//           {editReviewId ? 'Edit Your Review' : 'Leave a Review'}
//         </Typography>

//         <TextField
//           label="Your Review"
//           fullWidth
//           multiline
//           rows={4}
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
          
//           sx={{
//             mt: 2,
//             backgroundColor: 'rgba(255, 255, 255, 0.8)',
//             borderRadius: '4px',
//           }}
//         />

//         <Box mt={2}>
//           <Typography component="legend" sx={{ color: '#333' }}>
//             Rate the Hotel
//           </Typography>
//           <Rating
//             name="hotel-rating"
//             value={rating}
//             onChange={(event, newValue) => setRating(newValue)}
//           />
//         </Box>

//         <Button
//           variant="contained"
//           sx={{
//             mt: 2,
//             backgroundColor: '#6A0DAD',
//             color: '#fff',
//             '&:hover': {
//               backgroundColor: '#4B0082',
//             },
//           }}
//           onClick={handleSubmitReview}
//         >
//           {editReviewId ? 'Update Review' : 'Submit Review'}
//         </Button>
//       </Box>

//       {/* Display Reviews */}
//       <Box mt={5}>
//         <Typography variant="h5" sx={{ color: '#333' }}>
//           Reviews
//         </Typography>
//         <Grid container spacing={2}>
//           {reviews.map((review) => (
//             <Grid item xs={12} key={review.id}>
//               <Card
//                 sx={{
//                   backgroundColor: '#FFF',
//                   border: '1px solid purple',
//                   borderRadius: '12px',
                  
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="body2" sx={{ color: '#333' }}>
//                     <strong>User:</strong> {review.userId}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#333' }}>
//                     <strong>Rating:</strong> {review.rating}/5
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#333' }}>
//                     {review.reviewText}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     {new Date(review.timestamp).toLocaleString()}
//                   </Typography>

//                   {/* Show edit and delete buttons if the current user is the review author */}
//                   {currentUser?.email === review.userId && (
//                     <Box display="flex" justifyContent="flex-end" mt={2}>
//                       <IconButton
//                         aria-label="edit"
//                         onClick={() => handleEditReview(review.id, review.reviewText, review.rating)}
//                         sx={{ marginRight: 1 }}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         aria-label="delete"
//                         onClick={() => handleDeleteReview(review.id)}
//                         sx={{ color: 'black' }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   )}
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
import { Box, Typography, Grid, Card, CardContent, TextField, Button, Rating, IconButton, Divider } from '@mui/material';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import ReplyIcon from '@mui/icons-material/Reply';

const UsersList = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [userReplyText, setUserReplyText] = useState(''); // Manage user reply text
  const [editUserReplyId, setEditUserReplyId] = useState(null); // Track edit user reply state

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });
    return () => unsubscribe();
  }, []);

  // Fetch reviews from Firestore
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
      const newReview = {
        userId: currentUser?.email || 'Anonymous',
        reviewText,
        rating,
        timestamp: new Date().toISOString(),
      };

      if (editReviewId) {
        // Edit an existing review
        const reviewDocRef = doc(db, 'reviews', editReviewId);
        await updateDoc(reviewDocRef, newReview);
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review.id === editReviewId ? { ...review, ...newReview } : review
          )
        );
        setEditReviewId(null);
      } else {
        // Add a new review
        const docRef = await addDoc(collection(db, 'reviews'), newReview);
        setReviews((prevReviews) => [...prevReviews, { ...newReview, id: docRef.id }]);
      }

      setReviewText('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`Failed to submit review: ${error.message}`);
    }
  };

  // Handle deleting a review
  const deleteReview = async (reviewId) => {
    try {
      const reviewDocRef = doc(db, 'reviews', reviewId);
      await deleteDoc(reviewDocRef);
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert(`Failed to delete review: ${error.message}`);
    }
  };

  // Handle admin reply submission
  const handleAdminReply = async (reviewId) => {
    if (!adminReplyText) {
      alert('Please enter a reply before submitting.');
      return;
    }

    try {
      const reviewDocRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewDocRef, {
        adminReply: adminReplyText,
        adminReplyTimestamp: new Date().toISOString(),
      });

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, adminReply: adminReplyText } : review
        )
      );

      setAdminReplyText('');
    } catch (error) {
      console.error('Error submitting admin reply:', error);
      alert(`Failed to submit admin reply: ${error.message}`);
    }
  };

  // Handle user reply submission
  const handleUserReply = async (reviewId) => {
    if (!userReplyText) {
      alert('Please enter a reply before submitting.');
      return;
    }

    try {
      const reviewDocRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewDocRef, {
        userReply: userReplyText,
        userReplyTimestamp: new Date().toISOString(),
      });

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, userReply: userReplyText } : review
        )
      );

      setUserReplyText('');
      setEditUserReplyId(null); 
    } catch (error) {
      console.error('Error submitting user reply:', error);
      alert(`Failed to submit user reply: ${error.message}`);
    }
  };

  // Handles deleting a user reply
  const deleteUserReply = async (reviewId) => {
    try {
      const reviewDocRef = doc(db, 'reviews', reviewId);
      await updateDoc(reviewDocRef, { userReply: '', userReplyTimestamp: null });

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, userReply: '' } : review
        )
      );
    } catch (error) {
      console.error('Error deleting user reply:', error);
      alert(`Failed to delete reply: ${error.message}`);
    }
  };

  return (
    <Box p={3} sx={{ backgroundColor: 'white', borderRadius: '8px', animation: 'fadeIn 1.5s ease-out' }}>
      {/* Review Form */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ color: '#333' }}>
          {editReviewId ? 'Edit Your Review' : 'Leave a Review'}
        </Typography>
        <TextField
          label="Your Review"
          fullWidth
          multiline
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{ mt: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
        />
        <Box mt={2}>
          <Typography component="legend" sx={{ color: '#333' }}>Rate the Hotel</Typography>
          <Rating name="hotel-rating" value={rating} onChange={(event, newValue) => setRating(newValue)} />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#6A0DAD', color: '#fff', '&:hover': { backgroundColor: '#4B0082' } }}
          onClick={handleSubmitReview}
        >
          {editReviewId ? 'Update Review' : 'Submit Review'}
        </Button>
      </Box>

      {/* Display Reviews */}
      <Box mt={5}>
        <Typography variant="h5" sx={{ color: '#333' }}>Reviews</Typography>
        <Grid container spacing={2}>
  {reviews.map((review) => (
    <Grid item xs={12} key={review.id}>
      <Card sx={{ backgroundColor: '#FFF', border: '1px solid purple', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="body2" sx={{ color: '#333' }}>
            <strong>User:</strong> {review.userId}
          </Typography>
          <Typography variant="body2" sx={{ color: '#333' }}>
            <strong>Rating:</strong> {review.rating}/5
          </Typography>
          <Typography variant="body2" sx={{ color: '#333' }}>{review.reviewText}</Typography>
          <Typography variant="caption" color="textSecondary">
            {new Date(review.timestamp).toLocaleString()}
          </Typography>

          {/* Admin Reply Section */}
          <Box mt={2} p={2} sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <Typography variant="body2" sx={{ color: '#333', fontWeight: 'bold' }}>Eezy Living Hotel:</Typography>
            {review.adminReply ? (
              <Box>
                <Typography variant="body2" sx={{ color: '#333' }}>{review.adminReply}</Typography>
                <Typography variant="caption" color="textSecondary">{new Date(review.adminReplyTimestamp).toLocaleString()}</Typography>
              </Box>
            ) : (
              <Typography variant="caption" color="textSecondary">No reply from admin yet</Typography>
            )}
          </Box>

          {/* User Reply Section */}
          {review.adminReply && (
            <Box mt={2} p={2} sx={{ backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
              {editUserReplyId === review.id ? (
                // If this specific reply is being edited
                <>
                  <TextField
                    label="Your Reply"
                    fullWidth
                    multiline
                    rows={2}
                    value={userReplyText}
                    onChange={(e) => setUserReplyText(e.target.value)}
                    sx={{ mt: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
                  />
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: '#6A0DAD', color: '#fff', '&:hover': { backgroundColor: '#4B0082' } }}
                    onClick={() => handleUserReply(review.id)}
                  >
                    Update Reply
                  </Button>
                </>
              ) : (
                // If this reply is not in edit mode
                <>
                  <Typography variant="body2" sx={{ color: '#333', fontStyle: 'italic' }}>
                    "{review.userReply || 'No reply from user yet.'}"
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {review.userReplyTimestamp ? new Date(review.userReplyTimestamp).toLocaleString() : ''}
                  </Typography>
                  {currentUser?.email === review.userId &&  (
                    < div style={{display:'flex', justifyContent:'space-between'}}>
                      <IconButton
                        onClick={() => {
                          setEditUserReplyId(review.id);
                          setUserReplyText(review.userReply);
                        }}
                      >
                        <EditIcon color="default" />
                      </IconButton>
                      <IconButton onClick={() => deleteUserReply(review.id)}>
                        <DeleteIcon color="default" />
                      </IconButton>
                    </div>
                  )}
                </>
              )}
            </Box>
          )}

          {/* Action Buttons for Editing and Deleting Reviews */}
          <Box mt={2}>
            {currentUser?.email === review.userId && (
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <IconButton
                  onClick={() => {
                    setEditReviewId(review.id);
                    setReviewText(review.reviewText);
                    setRating(review.rating);
                  }}
                >
                  <EditIcon color="default" />
                </IconButton>
                <IconButton onClick={() => deleteReview(review.id)}>
                  <DeleteIcon color="default" />
                </IconButton>
              </div>
            )}

            {/* Admin reply section */}
            {currentUser?.email === 'admin@example.com.com' && !review.adminReply && (
              <>
                <TextField
                  label="Admin Reply"
                  fullWidth
                  multiline
                  rows={2}
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  sx={{ mt: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '4px' }}
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: '#6A0DAD', color: '#fff', '&:hover': { backgroundColor: '#4B0082' } }}
                  onClick={() => handleAdminReply(review.id)}
                >
                  Submit Admin Reply
                </Button>
              </>
            )}
          </Box>
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
