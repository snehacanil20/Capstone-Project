import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import CatalogList from './pages/CatalogList';
import CatalogDetail from './pages/CatalogDetail';
import GoalWizard from './pages/GoalWizard';
import MyGoals from './pages/MyGoals';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/catalog" element={
            <ProtectedRoute roles={['EMPLOYEE', 'MANAGER', 'APPROVER', 'ADMIN']}>
              <CatalogList />
            </ProtectedRoute>
          } />
          <Route path="/catalog/:id" element={
            <ProtectedRoute roles={['EMPLOYEE', 'MANAGER', 'APPROVER', 'ADMIN']}>
              <CatalogDetail />
            </ProtectedRoute>
          } />

          {/* Week 2 */}
          <Route path="/goals/new" element={
            <ProtectedRoute roles={['EMPLOYEE']}>
              <GoalWizard />
            </ProtectedRoute>
          } />
          <Route path="/my-goals" element={
            <ProtectedRoute roles={['EMPLOYEE']}>
              <MyGoals />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
}
export default App;
