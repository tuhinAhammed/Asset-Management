import React from 'react';
import { toast } from 'react-toastify';
import { HiTrash, HiPencil, HiEye } from 'react-icons/hi';

const DataTable = ({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onView, 
  loading = false,
  searchValue = '',
  onSearch = () => {},
}) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(id);
    }
  };

  const filteredData = data.filter((item) => {
    return Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme"></div>
      </div>
    );
  }

  return (
    <div className="bg-secondary rounded-lg shadow-md overflow-hidden border border-theme border-opacity-10">
      {/* Search Bar */}
      <div className="p-4 border-b border-theme border-opacity-10">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 border border-theme border-opacity-30 rounded-lg focus:outline-none focus:border-theme text-primary placeholder-tertiary font-primary"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-quaternary border-b border-theme border-opacity-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-sm font-semibold text-primary font-primary"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold text-primary font-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-tertiary font-primary">
                  No data found
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={`${row.id}-${idx}`} className="border-b border-theme border-opacity-10 hover:bg-quaternary transition">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-primary font-primary">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(row.id)}
                          className="p-2 hover:bg-lightThemeBg text-theme rounded transition"
                          title="View"
                        >
                          <HiEye size={18} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row.id)}
                          className="p-2 hover:bg-theme hover:bg-opacity-10 text-theme rounded transition"
                          title="Edit"
                        >
                          <HiPencil size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded transition"
                          title="Delete"
                        >
                          <HiTrash size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
