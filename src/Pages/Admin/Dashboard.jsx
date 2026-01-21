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
      color: 'text-theme',
      bgColor: 'bg-lightThemeBg',
    },
    {
      label: 'Total Categories',
      value: categories.length,
      icon: MdCategory,
      color: 'text-theme',
      bgColor: 'bg-lightThemeBg',
    },
    {
      label: 'Total Pages',
      value: pages.length,
      icon: MdDescription,
      color: 'text-theme',
      bgColor: 'bg-lightThemeBg',
    },
    {
      label: 'Total Careers',
      value: careers.length,
      icon: MdWork,
      color: 'text-theme',
      bgColor: 'bg-lightThemeBg',
    },
    {
      label: 'Total Menus',
      value: menus.length,
      icon: MdMenu,
      color: 'text-theme',
      bgColor: 'bg-lightThemeBg',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-static text-secondary p-8 rounded-lg shadow-md border border-theme border-opacity-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 font-primary">Welcome back, {user?.name || 'Admin'}!</h1>
            <p className="text-tertiary text-lg">Manage your assets and content efficiently</p>
          </div>
          <MdTrendingUp size={64} className="opacity-20 text-theme" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bgColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-theme border-opacity-20 bg-secondary`}>
              <div className={`${stat.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4 bg-theme bg-opacity-10`}>
                <Icon size={28} />
              </div>
              <p className="text-tertiary text-sm font-medium mb-2 font-primary">{stat.label}</p>
              <p className="text-3xl font-bold text-primary font-primary">
                {productsLoading ? '...' : stat.value}
              </p>
              <div className="mt-3 flex items-center text-theme text-sm font-medium font-primary">
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
        <div className="bg-secondary rounded-lg shadow-md p-6 border border-theme border-opacity-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2 font-primary">
              <MdShoppingCart className="text-theme" size={24} />
              Recent Products
            </h3>
            <span className="text-xs bg-lightThemeBg text-theme px-3 py-1 rounded-full font-medium font-primary">
              {products.length} total
            </span>
          </div>
          <div className="space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex justify-between items-center p-4 bg-quaternary rounded-lg hover:bg-theme hover:bg-opacity-5 transition border border-theme border-opacity-10">
                <div className="flex-1">
                  <p className="font-semibold text-primary font-primary">{product.name}</p>
                  <p className="text-sm text-tertiary">ID: {product.id}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold font-primary ${
                    product.status === 'active'
                      ? 'bg-theme bg-opacity-20 text-theme'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            ))}
            {products.length === 0 && (
              <p className="text-center text-tertiary py-8">No products yet</p>
            )}
          </div>
        </div>

        {/* Recent Pages */}
        <div className="bg-secondary rounded-lg shadow-md p-6 border border-theme border-opacity-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2 font-primary">
              <MdDescription className="text-theme" size={24} />
              Recent Pages
            </h3>
            <span className="text-xs bg-lightThemeBg text-theme px-3 py-1 rounded-full font-medium font-primary">
              {pages.length} total
            </span>
          </div>
          <div className="space-y-3">
            {pages.slice(0, 5).map((page) => (
              <div key={page.id} className="flex justify-between items-center p-4 bg-quaternary rounded-lg hover:bg-theme hover:bg-opacity-5 transition border border-theme border-opacity-10">
                <div className="flex-1">
                  <p className="font-semibold text-primary font-primary">{page.name}</p>
                  <p className="text-sm text-tertiary">{page.description?.substring(0, 50) || 'No description'}...</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold font-primary ${
                    page.status === 'active'
                      ? 'bg-theme bg-opacity-20 text-theme'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {page.status}
                </span>
              </div>
            ))}
            {pages.length === 0 && (
              <p className="text-center text-tertiary py-8">No pages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
