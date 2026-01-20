import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchComponents,
  createComponent,
  updateComponent,
  deleteComponent,
  clearComponentError,
  clearComponentSuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import { HiPlus } from 'react-icons/hi';

const Components = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector(
    (state) => state.component
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    body: {},
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchComponents());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearComponentError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearComponentSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleJsonChange = (value) => {
    try {
      const parsed = JSON.parse(value);
      setFormData({
        ...formData,
        body: parsed,
      });
    } catch (err) {
      // Invalid JSON, but allow user to continue typing
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
        await dispatch(updateComponent({ id: editingId, data: formData })).unwrap();
      } else {
        await dispatch(createComponent(formData)).unwrap();
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
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const component = items.find((c) => c.id === id);
    if (component) {
      setFormData({
        name: component.name,
        body: component.body || {},
      });
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteComponent(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Component Name' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Components</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Component
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
        title={isEditing ? 'Edit Component' : 'Add New Component'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Component Name *</label>
            <PrimaryInput
              type="text"
              name="name"
              placeholder="Enter component name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Body (JSON) *</label>
            <textarea
              value={typeof formData.body === 'string' ? formData.body : JSON.stringify(formData.body, null, 2)}
              onChange={(e) => handleJsonChange(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none font-mono text-sm"
              rows="6"
            />
            <p className="text-xs text-tertiary mt-1">Enter valid JSON format</p>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-theme text-white py-2 px-4 rounded-lg hover:bg-buttonHover transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Component' : 'Create Component'}
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

export default Components;
