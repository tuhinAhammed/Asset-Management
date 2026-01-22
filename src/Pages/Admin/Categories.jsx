import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  clearProductCategoryError,
  clearProductCategorySuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import { HiPlus } from 'react-icons/hi';

const Categories = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage } = useSelector(
    (state) => state.productCategory
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    status: 'active',
    category_id: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductCategoryError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearProductCategorySuccess());
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
    if (!formData.name) {
      toast.error('Please enter category name');
      return;
    }

    try {
      if (isEditing) {
        await dispatch(updateProductCategory({ id: editingId, data: formData })).unwrap();
      } else {
        await dispatch(createProductCategory(formData)).unwrap();
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error('Category error:', err);
      const errorMsg = err?.response?.data?.message || err?.message || 'Operation failed';
      toast.error(errorMsg);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      status: 'active',
      category_id: '',
      description: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const category = items.find((c) => c.id === id);
    if (category) {
      setFormData({
        name: category.name,
        status: category.status,
        category_id: category.category_id || '',
        description: category.description || '',
      });
      setEditingId(id);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProductCategory(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Category Name' },
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
        <h1 className="text-3xl font-bold text-primary">Product Categories</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Category
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
        title={isEditing ? 'Edit Category' : 'Add New Category'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category Name *</label>
            <PrimaryInput
              type="text"
              name="name"
              placeholder="Enter category name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category ID (optional)</label>
            <PrimaryInput
              type="text"
              name="category_id"
              placeholder="Enter category ID"
              value={formData.category_id}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Description (optional)</label>
            <textarea
              name="description"
              placeholder="Enter category description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
            />
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
              {loading ? 'Saving...' : isEditing ? 'Update Category' : 'Create Category'}
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

export default Categories;
