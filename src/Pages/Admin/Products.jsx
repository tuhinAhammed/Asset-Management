import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProduct,
  clearProductError,
  clearProductSuccess,
} from '../../Redux/Slice/crudSlices';
import { toast } from 'react-toastify';
import DataTable from '../../Components/Admin/DataTable';
import Modal from '../../Components/Admin/Modal';
import PrimaryInput from '../../Layout/Input/PrimaryInput';
import PrimaryButton from '../../Layout/Button/PrimaryButton';
import { HiPlus } from 'react-icons/hi';

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error, successMessage, currentItem } = useSelector(
    (state) => state.product
  );
  const { items: categories } = useSelector((state) => state.productCategory);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: {},
    product_category_id: '',
    status: 'active',
  });
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductError());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearProductSuccess());
    }
  }, [error, successMessage, dispatch]);

  const handleInputChange = (name, value) => {
    if (name === 'description') {
      setFormData({
        ...formData,
        [name]: { content: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.product_category_id) {
      toast.error('Please fill required fields');
      return;
    }

    const submitFormData = new FormData();
    submitFormData.append('name', formData.name);
    submitFormData.append('description', JSON.stringify(formData.description));
    submitFormData.append('product_category_id', formData.product_category_id);
    submitFormData.append('status', formData.status);
    if (thumbnail) {
      submitFormData.append('thumbnail', thumbnail);
    }

    try {
      if (isEditing) {
        await dispatch(updateProduct({ id: currentItem.id, data: submitFormData })).unwrap();
      } else {
        await dispatch(createProduct(submitFormData)).unwrap();
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
      description: {},
      product_category_id: '',
      status: 'active',
    });
    setThumbnail(null);
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    dispatch(fetchProduct(id));
    const product = items.find((p) => p.id === id);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || {},
        product_category_id: product.product_category_id,
        status: product.status,
      });
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (err) {
      toast.error(err.message || 'Delete failed');
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Product Name' },
    {
      key: 'product_category_id',
      label: 'Category',
      render: (catId) => categories.find((c) => c.id === catId)?.name || 'Unknown',
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
        <h1 className="text-3xl font-bold text-primary">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-theme text-white rounded-lg hover:bg-buttonHover transition"
        >
          <HiPlus size={20} /> Add Product
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
        title={isEditing ? 'Edit Product' : 'Add New Product'}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Product Name *</label>
            <PrimaryInput
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Category *</label>
            <select
              value={formData.product_category_id}
              onChange={(e) => handleInputChange('product_category_id', e.target.value)}
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Description</label>
            <textarea
              value={formData.description.content || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-borderColor rounded-lg focus:outline-none focus:border-theme resize-none"
              rows="4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
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
              {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
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

export default Products;
