import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './Redux/store.jsx'
import './index.css'

const stripePromise = loadStripe('pk_test_51PuTr7LOTigiMrGc4kJLk7Qkg7DeJn4I7yopiOdsLpprbiw7QCTKvztnOZrREYH6YQ75ELZz15tblpYpGUvpP3AG00TB1uLG3e');

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Elements stripe={stripePromise}>
    <Provider store={store}>
    <App />
    </Provider>
    </Elements>
  </StrictMode>,
)
