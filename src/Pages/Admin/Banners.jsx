import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  clearBannerError,
  clearBannerSuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import { HiPlus, HiUpload } from 'react-icons/hi';

const Banners = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector((state) => state.banner);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    banner_id: '',
    description: '',
    status: 'active',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearBannerError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearBannerSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload PNG, JPG, GIF, or WebP image.');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('File size exceeds 5MB. Please upload a smaller image.');
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.banner_id) {
      toast.error('Please enter banner ID');
      return;
    }

    // Create FormData for file upload
    const submitFormData = new FormData();
    submitFormData.append('banner_id', formData.banner_id);
    submitFormData.append('description', formData.description);
    submitFormData.append('status', formData.status);
    if (formData.image) {
      submitFormData.append('image', formData.image);
    }

    try {
      if (isEditing) {
        await dispatch(updateBanner({ id: editingId, data: submitFormData })).unwrap();
      } else {
        await dispatch(createBanner(submitFormData)).unwrap();
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error('Banner error:', err);
      const errorMsg = err?.response?.data?.message || err?.message || 'Operation failed';
      toast.error(errorMsg);
    }
  };

  const resetForm = () => {
    setFormData({
      banner_id: '',
      description: '',
      status: 'active',
      image: null,
    });
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const banner = items.find((b) => b.id === id);
    if (banner) {
      setFormData({
        banner_id: banner.banner_id || '',
        description: banner.description || '',
        status: banner.status || 'active',
        image: null,
      });
      setImagePreview(banner.image || null);
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBanner(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'banner_id', label: 'Banner ID' },
    {
      key: 'image',
      label: 'Image',
      render: (image) => (
        image ? (
          <img src={image} alt="banner" className="w-12 h-12 object-cover rounded" />
        ) : (
          <span className="text-gray-400">No image</span>
        )
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Banners</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Banner
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        searchValue={searchValue}
        onSearch={setSearchValue}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={isEditing ? 'Edit Banner' : 'Add New Banner'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Banner ID */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Banner ID *</label>
            <PrimaryInput
              type="text"
              name="banner_id"
              placeholder="Enter banner ID"
              value={formData.banner_id}
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter banner description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Banner Image *</label>
            <div className="border-2 border-dashed border-borderColor rounded-lg p-6 text-center cursor-pointer hover:border-theme transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="banner-image"
              />
              <label htmlFor="banner-image" className="cursor-pointer">
                {imagePreview ? (
                  <div className="space-y-2">
                    <img src={imagePreview} alt="preview" className="w-full h-48 object-cover rounded" />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <HiUpload className="mx-auto text-3xl text-gray-400" />
                    <p className="text-sm font-medium text-primary">Click to upload image</p>
                    <p className="text-xs text-tertiary">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading || !formData.banner_id || (!formData.image && !isEditing)}
              className="flex-1 bg-theme text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Banner' : 'Create Banner'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="flex-1 bg-quaternary text-primary py-2 px-4 rounded-lg hover:bg-borderColor transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Banners;
