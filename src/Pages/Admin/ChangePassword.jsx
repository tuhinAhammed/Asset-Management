import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, clearError, clearSuccess } from '../../Redux/Slice/authSlice';
import { toast } from 'react-toastify';
import PrimaryInput from '../../Layout/Input/PrimaryInput';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSuccess());
      setFormData({
        oldPassword: '',
        newPassword: '',
        passwordConfirmation: '',
      });
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

    if (!formData.oldPassword || !formData.newPassword || !formData.passwordConfirmation) {
      toast.error('Please fill all fields');
      return;
    }

    if (formData.newPassword !== formData.passwordConfirmation) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await dispatch(
        changePassword({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          passwordConfirmation: formData.passwordConfirmation,
        })
      ).unwrap();
    } catch (err) {
      toast.error(err.message || 'Failed to change password');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Change Password</h1>
        <p className="text-tertiary mt-2">Update your account password</p>
      </div>

      {/* Password Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Current Password *</label>
            <PrimaryInput
              type="password"
              name="oldPassword"
              placeholder="Enter your current password"
              value={formData.oldPassword}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">New Password *</label>
            <PrimaryInput
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <p className="text-xs text-tertiary mt-1">Minimum 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Confirm New Password *</label>
            <PrimaryInput
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm your new password"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-3">Password Security Tips</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>✓ Use at least 6 characters</li>
          <li>✓ Mix uppercase, lowercase, numbers, and symbols</li>
          <li>✓ Avoid using personal information</li>
          <li>✓ Use unique passwords for different accounts</li>
        </ul>
      </div>
    </div>
  );
};

export default ChangePassword;
