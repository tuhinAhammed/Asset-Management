import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings, updateSettings, clearSettingsError, clearSettingsSuccess } from '../../Redux/Slice/settingsSlice';
import { toast } from 'react-toastify';
import PrimaryInput from '../../Layout/Input/PrimaryInput';

const Settings = () => {
  const dispatch = useDispatch();
  const { data: settings, loading, error, successMessage } = useSelector(
    (state) => state.settings
  );
  const [formData, setFormData] = useState({
    company_name: '',
    logo: '',
    company_phone: '',
    company_email: '',
    company_address: {},
  });

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormData({
        company_name: settings.company_name || '',
        logo: settings.logo || '',
        company_phone: settings.company_phone || '',
        company_email: settings.company_email || '',
        company_address: settings.company_address || {},
      });
    }
  }, [settings]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearSettingsError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearSettingsSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      company_address: {
        ...formData.company_address,
        [field]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSettings(formData)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Settings</h1>
        <p className="text-tertiary mt-2">Manage your website settings</p>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Basic Info */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Company Information</h2>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Company Name *</label>
              <PrimaryInput
                type="text"
                name="company_name"
                placeholder="Enter company name"
                value={formData.company_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary mb-2">Logo URL</label>
              <PrimaryInput
                type="url"
                name="logo"
                placeholder="Enter logo URL"
                value={formData.logo}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Contact Information</h2>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Phone</label>
              <PrimaryInput
                type="tel"
                name="company_phone"
                placeholder="Enter company phone"
                value={formData.company_phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <PrimaryInput
                type="email"
                name="company_email"
                placeholder="Enter company email"
                value={formData.company_email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="pb-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Address Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Street</label>
                <PrimaryInput
                  type="text"
                  placeholder="Street address"
                  value={formData.company_address.street || ''}
                  onChange={(name, value) => handleAddressChange('street', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">City</label>
                <PrimaryInput
                  type="text"
                  placeholder="City"
                  value={formData.company_address.city || ''}
                  onChange={(name, value) => handleAddressChange('city', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Country</label>
                <PrimaryInput
                  type="text"
                  placeholder="Country"
                  value={formData.company_address.country || ''}
                  onChange={(name, value) => handleAddressChange('country', value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Postal Code</label>
                <PrimaryInput
                  type="text"
                  placeholder="Postal code"
                  value={formData.company_address.postal_code || ''}
                  onChange={(name, value) => handleAddressChange('postal_code', value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
