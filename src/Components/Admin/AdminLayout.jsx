import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Slice/authSlice';
import { toast } from 'react-toastify';
import { HiMenu, HiX, HiLogout } from 'react-icons/hi';
import { MdDashboard, MdArticle, MdBuild, MdDescription, MdShoppingCart, MdCategory, MdImage, MdMenu as MdMenuIcon, MdWork, MdSettings } from 'react-icons/md';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logout successful');
      navigate('/admin/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: MdDashboard },
    { label: 'Pages', path: '/admin/pages', icon: MdArticle },
    { label: 'Components', path: '/admin/components', icon: MdBuild },
    { label: 'Content', path: '/admin/content', icon: MdDescription },
    { label: 'Products', path: '/admin/products', icon: MdShoppingCart },
    { label: 'Categories', path: '/admin/categories', icon: MdCategory },
    { label: 'Banners', path: '/admin/banners', icon: MdImage },
    { label: 'Menu', path: '/admin/menu', icon: MdMenuIcon },
    { label: 'Careers', path: '/admin/careers', icon: MdWork },
    { label: 'Settings', path: '/admin/settings', icon: MdSettings },
  ];

  return (
    <div className="flex h-screen bg-quaternary">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-static text-secondary transition-all duration-300 overflow-y-auto fixed h-full z-40 shadow-lg border-r border-theme border-opacity-20`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-theme border-opacity-20 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="bg-theme p-2 rounded-lg text-secondary">
              <MdDashboard size={24} />
            </div>
            {sidebarOpen && <h1 className="text-xl font-bold text-secondary font-primary">Asset Admin</h1>}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-theme hover:text-secondary text-tertiary group ${
                  sidebarOpen ? '' : 'justify-center'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <IconComponent size={22} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                {sidebarOpen && <span className="text-sm font-medium font-primary">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-secondary shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-30 border-b border-theme border-opacity-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-quaternary rounded-lg transition text-primary font-primary"
            >
              {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
            <h2 className="text-2xl font-bold text-theme font-primary">Admin Dashboard</h2>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-quaternary transition border border-theme border-opacity-20 text-primary font-primary"
            >
              <div className="w-10 h-10 bg-theme rounded-full flex items-center justify-center text-secondary font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-primary font-primary">{user?.name || 'Admin'}</p>
                <p className="text-xs text-tertiary">{user?.email || 'admin@example.com'}</p>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-secondary rounded-lg shadow-lg overflow-hidden z-50 border border-theme border-opacity-10">
                <div className="px-4 py-3 bg-quaternary border-b border-theme border-opacity-10">
                  <p className="text-sm font-semibold text-primary font-primary">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-tertiary">{user?.email || 'admin@example.com'}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/admin/profile');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-quaternary transition flex items-center gap-3 text-primary font-medium font-primary border-b border-theme border-opacity-5"
                >
                  <MdSettings size={18} /> Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/admin/change-password');
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-quaternary transition flex items-center gap-3 text-primary font-medium font-primary border-b border-theme border-opacity-5"
                >
                  <MdSettings size={18} /> Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-quaternary text-theme transition flex items-center gap-3 font-medium font-primary"
                >
                  <HiLogout size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
