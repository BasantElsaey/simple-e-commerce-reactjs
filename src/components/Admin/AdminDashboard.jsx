import { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2 } from 'lucide-react';

function AdminDashboard({ user, products, setProducts }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    rating: 4.0,
    quantity: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [editProduct, setEditProduct] = useState({});

  if (!user || !user.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 text-center">
          <p className="text-xl text-gray-800">Access denied. Admins only.</p>
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

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Please fill in name, price, and category.');
      return;
    }
    const product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      rating: parseFloat(newProduct.rating) || 4.0,
      quantity: parseInt(newProduct.quantity) || 1,
      image: newProduct.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    };
    setProducts((prev) => [...prev, product]);
    setNewProduct({
      name: '',
      price: '',
      category: '',
      image: '',
      description: '',
      rating: 4.0,
      quantity: 1,
    });
    toast.success('Product added!');
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    if (!editProduct.name || !editProduct.price || !editProduct.category) {
      toast.error('Please fill in name, price, and category.');
      return;
    }
    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              ...editProduct,
              price: parseFloat(editProduct.price),
              rating: parseFloat(editProduct.rating) || 4.0,
              quantity: parseInt(editProduct.quantity) || 1,
            }
          : item
      )
    );
    setEditingId(null);
    setEditProduct({});
    toast.success('Product updated!');
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Delete this product?')) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
      toast.success('Product deleted!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Admin Dashboard - Product Management
        </h1>

        {/* Add Product Form */}
        <form onSubmit={handleAddProduct} className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              placeholder="Product Name"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="number"
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              placeholder="Price"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              placeholder="Category"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <input
              type="text"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              placeholder="Image URL (optional)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              placeholder="Description (optional)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 md:col-span-2"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Product
          </button>
        </form>

        {/* Products List */}
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
              {editingId === product.id ? (
                <form onSubmit={handleEditProduct} className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editProduct.name}
                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                      placeholder="Product Name"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                      placeholder="Price"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editProduct.category}
                      onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                      placeholder="Category"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={editProduct.image}
                      onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                      placeholder="Image URL (optional)"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={editProduct.description}
                      onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                      placeholder="Description (optional)"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                    />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                      }}
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-gray-600">${product.price.toFixed(2)} | {product.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(product.id);
                        setEditProduct({ ...product });
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;