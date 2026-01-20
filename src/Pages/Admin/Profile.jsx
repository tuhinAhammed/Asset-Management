import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, fetchUserProfile, clearUserProfileError, clearUserProfileSuccess } from '../../Redux/Slice/settingsSlice';
import { toast } from 'react-toastify';
import PrimaryInput from '../../Layout/Input/PrimaryInput';

const Profile = () => {
  const dispatch = useDispatch();
  const { data: profile, loading, error, successMessage } = useSelector(
    (state) => state.userProfile
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserProfileError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearUserProfileSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">My Profile</h1>
        <p className="text-tertiary mt-2">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Full Name *</label>
            <PrimaryInput
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Email *</label>
            <PrimaryInput
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Phone</label>
            <PrimaryInput
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
