import { useState } from 'react';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Appointments from './page/Appointment';
import Blogs from './page/Blogs';
import Users from './page/Users';
import NotificationsPage from './page/Notifications';
import BlogForm from './page/BlogForm';
import NotificationFormPage from './page/NotificationForm';
import Home from './page/Home';
import Feedback from './page/Feedback';
import Categories from './page/Categories';
import MedicinePage from './page/Medicine';
import GallaryPage from './page/Gallary';
import CommentsPage from './page/Comments';
import GallaryFormPage from './page/GallaryForm';
import CategoryFormPage from './page/CategoryForm';
import AppForm from './page/AppForm';
import Login from './page/Login';
import ProtectedRoute from './ProtectedRoute';
function App() {
  return (
    <>
      <Router>

        <Analytics />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={
            <Login />
          } />
          <Route path="/appointment" element={<ProtectedRoute>
            <Appointments />
          </ProtectedRoute>} />

          <Route path="/blogs" element={<ProtectedRoute>
            <Blogs />
          </ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute>
            <Users />
          </ProtectedRoute>} />

          <Route path="/addBlog/:id" element={<ProtectedRoute>
            <BlogForm />
          </ProtectedRoute>} />
          <Route path="addNotification/:id" element={<ProtectedRoute>
            <NotificationFormPage />
          </ProtectedRoute>} />
          <Route path="/Gallary" element={<ProtectedRoute>
            <GallaryPage />
          </ProtectedRoute>} />
          <Route path="/Feedback" element={<ProtectedRoute>
            <Feedback />
          </ProtectedRoute>} />
          <Route path="/Categories" element={<ProtectedRoute>
            <Categories />
          </ProtectedRoute>} />
          <Route path='/medicines' element={<ProtectedRoute>
            <MedicinePage />
          </ProtectedRoute>} />
          <Route path='/Comments' element={<ProtectedRoute>
            <CommentsPage />
          </ProtectedRoute>} />
          <Route path='/addImage/:id' element={<ProtectedRoute>
            <GallaryFormPage />
          </ProtectedRoute>} />
          <Route path='/addCategory/:id' element={<ProtectedRoute>
            <CategoryFormPage />
          </ProtectedRoute>} />
          <Route path='/appointment/:id' element={<ProtectedRoute>
            <AppForm />
          </ProtectedRoute>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
