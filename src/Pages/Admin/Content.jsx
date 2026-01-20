import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContents,
  fetchSections,
  createContent,
  updateContent,
  deleteContent,
  clearContentError,
  clearContentSuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import { HiPlus } from 'react-icons/hi';

const Content = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector((state) => state.content);
  const { items: sections } = useSelector((state) => state.section);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    body: {},
    section_id: '',
    status: 'active',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchContents());
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearContentError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearContentSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBodyChange = (value) => {
    try {
      const parsed = JSON.parse(value);
      setFormData({
        ...formData,
        body: parsed,
      });
    } catch (err) {
      setFormData({
        ...formData,
        body: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.body) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      if (isEditing) {
        await dispatch(updateContent({ id: editingId, data: formData })).unwrap();
      } else {
        await dispatch(createContent(formData)).unwrap();
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      body: {},
      section_id: '',
      status: 'active',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const content = items.find((c) => c.id === id);
    if (content) {
      setFormData({
        name: content.name,
        body: content.body || {},
        section_id: content.section_id || '',
        status: content.status,
      });
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteContent(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Content Name' },
    {
      key: 'section_id',
      label: 'Section',
      render: (sectionId) => sections.find((s) => s.id === sectionId)?.name || 'None',
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
        <h1 className="text-3xl font-bold text-primary">Content</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Content
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
        title={isEditing ? 'Edit Content' : 'Add New Content'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Content Name *</label>
            <PrimaryInput
              type="text"
              name="name"
              placeholder="Enter content name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Section</label>
            <select
              value={formData.section_id}
              onChange={(e) => handleInputChange('section_id', e.target.value)}
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
            >
              <option value="">Select section</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Body (JSON) *</label>
            <textarea
              value={typeof formData.body === 'string' ? formData.body : JSON.stringify(formData.body, null, 2)}
              onChange={(e) => handleBodyChange(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none font-mono text-sm"
              rows="6"
            />
            <p className="text-xs text-tertiary mt-1">Enter valid JSON format</p>
          </div>

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
              disabled={loading}
              className="flex-1 bg-theme text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Content' : 'Create Content'}
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

export default Content;
