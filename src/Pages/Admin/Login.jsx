import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Slice/authSlice';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import PrimaryButton from '../../Layout/Button/PrimaryButton';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Debug: Log auth state changes
  useEffect(() => {
    console.log('Auth State:', { loading, error, token, hasToken: !!token });
  }, [loading, error, token]);

  // SINGLE redirect - watch token and redirect when it changes
  useEffect(() => {
    console.log('useEffect triggered - token:', token);
    if (token) {
      console.log('Token found! Navigating to dashboard...');
      navigate('/admin/dashboard', { replace: true });
    }
  }, [token, navigate]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      // Dispatch login and wait for it to complete
      await dispatch(login(formData)).unwrap();
      
      // Don't navigate here - let useEffect handle it
      // Just show success message
      toast.success('Login successful');
    } catch (err) {
      toast.error(err || error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-theme to-themeDeep">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-tertiary">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <PrimaryInput
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Password</label>
              <PrimaryInput
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-theme hover:bg-buttonHover text-white font-medium py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-tertiary text-sm mt-6">
            <span className="block mb-2 font-semibold">Demo Credentials:</span>
            <span className="block text-xs">Email: admin@example.com</span>
            <span className="block text-xs">Password: 12345678</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
