import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchPosts } from './features/posts/postSlice';
import { fetchUsers } from './features/users/userSlice';

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes> 
      </Router>       
    </Provider>
  </React.StrictMode>
);
