import { useState } from 'react';
import { toast } from 'react-toastify';
import { Edit, Trash2, Plus } from 'lucide-react';

function AdminMenu({ menuItems, setMenuItems, user }) {
  const [newItem, setNewItem] = useState({ label: '', path: '' });
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ label: '', path: '' });

  if (!user || !user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 text-center">
          <p className="text-xl text-gray-800">Access restricted to admins.</p>
          <a
            href="/login"
            className="mt-4 inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.label || !newItem.path) {
      toast.error('Please enter label and path.');
      return;
    }
    const updatedItems = [...menuItems, { id: Date.now(), ...newItem }];
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    setNewItem({ label: '', path: '' });
    toast.success('Menu item added!');
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditItem({ label: item.label, path: item.path });
  };

  const handleSaveEdit = (id) => {
    if (!editItem.label || !editItem.path) {
      toast.error('Please enter label and path.');
      return;
    }
    const updatedItems = menuItems.map((item) =>
      item.id === id ? { ...item, ...editItem } : item
    );
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    setEditingId(null);
    setEditItem({ label: '', path: '' });
    toast.success('Menu item updated!');
  };

  const handleDelete = (id) => {
    const updatedItems = menuItems.filter((item) => item.id !== id);
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    toast.success('Menu item deleted!');
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Manage Menu
        </h1>
        {/* Add New Item Form */}
        <form onSubmit={handleAdd} className="mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              value={newItem.label}
              onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
              placeholder="Menu Label (e.g., Home)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              value={newItem.path}
              onChange={(e) => setNewItem({ ...newItem, path: e.target.value })}
              placeholder="Path (e.g., /)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Menu Item
          </button>
        </form>
        {/* Menu Items List */}
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
              {editingId === item.id ? (
                <>
                  <input
                    type="text"
                    value={editItem.label}
                    onChange={(e) => setEditItem({ ...editItem, label: e.target.value })}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                  <input
                    type="text"
                    value={editItem.path}
                    onChange={(e) => setEditItem({ ...editItem, path: e.target.value })}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                  <button
                    onClick={() => handleSaveEdit(item.id)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-semibold text-gray-800">{item.label}</span>
                  <span className="flex-1 text-gray-600">{item.path}</span>
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;