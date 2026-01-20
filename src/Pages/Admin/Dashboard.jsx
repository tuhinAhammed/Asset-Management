import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  fetchPages,
  fetchCareers,
  fetchMenus,
} from '../../Redux/Slice/crudSlices';
import { MdShoppingCart, MdCategory, MdDescription, MdWork, MdMenu, MdTrendingUp, MdCheckCircle } from 'react-icons/md';

const Dashboard = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.items || []);
  const categories = useSelector((state) => state.category.items || []);
  const pages = useSelector((state) => state.page.items || []);
  const careers = useSelector((state) => state.career.items || []);
  const menus = useSelector((state) => state.menu.items || []);

  const productsLoading = useSelector((state) => state.product.loading);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchPages());
    dispatch(fetchCareers());
    dispatch(fetchMenus());
  }, [dispatch]);

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: MdShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Categories',
      value: categories.length,
      icon: MdCategory,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Total Pages',
      value: pages.length,
      icon: MdDescription,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Total Careers',
      value: careers.length,
      icon: MdWork,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Total Menus',
      value: menus.length,
      icon: MdMenu,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 text-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'Admin'}!</h1>
            <p className="text-blue-100 text-lg">Manage your assets and content efficiently</p>
          </div>
          <MdTrendingUp size={64} className="opacity-20" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bgColor} rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100`}>
              <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 text-white shadow-md`}>
                <Icon size={28} />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">
                {productsLoading ? '...' : stat.value}
              </p>
              <div className="mt-3 flex items-center text-green-600 text-sm font-medium">
                <MdCheckCircle size={16} className="mr-1" />
                Active
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MdShoppingCart className="text-blue-600" size={24} />
              Recent Products
            </h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {products.length} total
            </span>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">ID: {product.id}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-center text-gray-500 py-8">No products yet</p>
            )}
          </div>
        </div>

        {/* Recent Pages */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MdDescription className="text-purple-600" size={24} />
              Recent Pages
            </h3>
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              {pages.length} total
            </span>
          </div>
          <div className="space-y-3">
            {pages.slice(0, 5).map((page) => (
              <div key={page.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{page.name}</p>
                  <p className="text-sm text-gray-500">{page.description?.substring(0, 50) || 'No description'}...</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    page.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {page.status}
                </span>
              </div>
            ))}
            {pages.length === 0 && (
              <p className="text-center text-gray-500 py-8">No pages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
