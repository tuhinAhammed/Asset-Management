import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPages,
  fetchPageLayouts,
  createPage,
  updatePage,
  deletePage,
  clearPageError,
  clearPageSuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import { HiPlus } from 'react-icons/hi';

const Pages = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector((state) => state.page);
  const { items: layouts } = useSelector((state) => state.pageLayout);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    banner: '',
    page_layout_id: '',
    status: 'active',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchPageLayouts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearPageError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearPageSuccess());
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
    if (!formData.name || !formData.description) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      if (isEditing) {
        await dispatch(updatePage({ id: editingId, data: formData })).unwrap();
      } else {
        await dispatch(createPage(formData)).unwrap();
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
      description: '',
      banner: '',
      page_layout_id: '',
      status: 'active',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const page = items.find((p) => p.id === id);
    if (page) {
      setFormData({
        name: page.name,
        description: page.description || '',
        banner: page.banner || '',
        page_layout_id: page.page_layout_id || '',
        status: page.status,
      });
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePage(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Page Name' },
    { key: 'description', label: 'Description', render: (desc) => desc?.substring(0, 50) + '...' },
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
        <h1 className="text-3xl font-bold text-primary">Pages</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Page
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
        title={isEditing ? 'Edit Page' : 'Add New Page'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Page Name *</label>
            <PrimaryInput
              type="text"
              name="name"
              placeholder="Enter page name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter page description"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Banner</label>
            <PrimaryInput
              type="text"
              name="banner"
              placeholder="Enter banner URL"
              value={formData.banner}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Page Layout</label>
            <select
              value={formData.page_layout_id}
              onChange={(e) => handleInputChange('page_layout_id', e.target.value)}
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
            >
              <option value="">Select layout</option>
              {layouts.map((layout) => (
                <option key={layout.id} value={layout.id}>
                  {layout.name}
                </option>
              ))}
            </select>
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
              {loading ? 'Saving...' : isEditing ? 'Update Page' : 'Create Page'}
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

export default Pages;
