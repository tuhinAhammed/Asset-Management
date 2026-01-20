import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  clearCareerError,
  clearCareerSuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import { HiPlus } from 'react-icons/hi';

const Careers = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector((state) => state.career);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    job_type: 'full_time',
    date_start: '',
    date_end: '',
    job_description: {},
    job_requirements: {},
    benefits: {},
    employment_status: 'permanent',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchCareers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearCareerError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearCareerSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleJsonInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: { content: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date_end) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      if (isEditing) {
        await dispatch(updateCareer({ id: editingId, data: formData })).unwrap();
      } else {
        await dispatch(createCareer(formData)).unwrap();
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      job_type: 'full_time',
      date_start: '',
      date_end: '',
      job_description: {},
      job_requirements: {},
      benefits: {},
      employment_status: 'permanent',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const career = items.find((c) => c.id === id);
    if (career) {
      setFormData({
        title: career.title,
        location: career.location || '',
        job_type: career.job_type || 'full_time',
        date_start: career.date_start || '',
        date_end: career.date_end || '',
        job_description: career.job_description || {},
        job_requirements: career.job_requirements || {},
        benefits: career.benefits || {},
        employment_status: career.employment_status || 'permanent',
      });
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCareer(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Job Title' },
    { key: 'location', label: 'Location' },
    {
      key: 'job_type',
      label: 'Job Type',
      render: (type) => (type === 'full_time' ? 'Full Time' : 'Part Time'),
    },
    {
      key: 'employment_status',
      label: 'Status',
      render: (status) => status === 'permanent' ? 'Permanent' : 'Contractual',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Careers</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Career
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
        title={isEditing ? 'Edit Career' : 'Add New Career'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Job Title *</label>
              <PrimaryInput
                type="text"
                name="title"
                placeholder="Enter job title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Location</label>
              <PrimaryInput
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Job Type</label>
              <select
                value={formData.job_type}
                onChange={(e) => handleInputChange('job_type', e.target.value)}
                className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
              >
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">Employment Status</label>
              <select
                value={formData.employment_status}
                onChange={(e) => handleInputChange('employment_status', e.target.value)}
                className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
              >
                <option value="permanent">Permanent</option>
                <option value="contractual">Contractual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Start Date</label>
              <PrimaryInput
                type="date"
                name="date_start"
                value={formData.date_start}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">End Date *</label>
              <PrimaryInput
                type="date"
                name="date_end"
                value={formData.date_end}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Job Description</label>
            <textarea
              value={formData.job_description.content || ''}
              onChange={(e) => handleJsonInputChange('job_description', e.target.value)}
              placeholder="Enter job description"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Job Requirements</label>
            <textarea
              value={formData.job_requirements.content || ''}
              onChange={(e) => handleJsonInputChange('job_requirements', e.target.value)}
              placeholder="Enter job requirements"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Benefits</label>
            <textarea
              value={formData.benefits.content || ''}
              onChange={(e) => handleJsonInputChange('benefits', e.target.value)}
              placeholder="Enter benefits"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-theme text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Career' : 'Create Career'}
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

export default Careers;
