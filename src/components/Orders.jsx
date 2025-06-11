import { useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { PackagePlus, Edit, Trash2 } from 'lucide-react';

function Orders({ orders = [], cart = [], addOrder, user, updateOrder }) {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editItems, setEditItems] = useState([]);

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to create an order.');
      return;
    }
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item.');
      return;
    }

    const items = selectedItems.map((id) => {
      const item = cart.find((item) => item.id === id);
      return { ...item, quantity: quantities[id] || 1 };
    });
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
      id: uuidv4(),
      date: new Date().toISOString(),
      items,
      total,
      userEmail: user.email,
    };

    addOrder(newOrder);
    setSelectedItems([]);
    setQuantities({});
    setIsCreating(false);
    toast.success('Order created successfully!');
  };

  const handleEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditItems(order.items.map((item) => ({ ...item, quantity: item.quantity })));
  };

  const handleUpdateItemQuantity = (id, value) => {
    setEditItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, parseInt(value) || 1) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setEditItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editItems.length === 0) {
      toast.error('Order must have at least one item.');
      return;
    }
    const updatedOrder = {
      ...orders.find((order) => order.id === editingOrderId),
      items: editItems,
      total: editItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    updateOrder(updatedOrder);
    setEditingOrderId(null);
    setEditItems([]);
    toast.success('Order updated successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
        Your Orders
      </h1>

      {/* Create Order Button */}
      {user && (
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => {
              setIsCreating(!isCreating);
              setEditingOrderId(null); // Ensure edit mode is off
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <PackagePlus className="w-4 h-4 inline mr-2" />
            {isCreating ? 'Cancel' : 'Create New Order'}
          </button>
        </div>
      )}

      {/* Create Order Form */}
      {isCreating && user && (
        <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 mb-8 animate-pulse">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Custom Order</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600 text-center">No items in cart to order.</p>
          ) : (
            <form onSubmit={handleCreateOrder} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="checkbox checkbox-primary"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                      }}
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                    {selectedItems.includes(item.id) && (
                      <input
                        type="number"
                        min="1"
                        value={quantities[item.id] || 1}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        className="w-16 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-center"
                        placeholder="Qty"
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Place Custom Order
              </button>
            </form>
          )}
        </div>
      )}

      {/* Orders List */}
      {(!orders || orders.length === 0) ? (
        <div className="card bg-base-100 shadow-2xl p-10 rounded-2xl text-center w-full max-w-lg mx-auto animate-pulse">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-800">No orders placed yet.</p>
          <p className="text-gray-500">Start shopping to place your first order!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="card bg-base-100 shadow-xl p-8 rounded-2xl animate-pulse">
              {editingOrderId === order.id && user && user.email === order.userEmail ? (
                <form onSubmit={handleSaveEdit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-primary mb-4">Edit Order #{order.id.slice(0, 8)}</h3>
                  {editItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-100 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                        }}
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItemQuantity(item.id, e.target.value)}
                        className="w-16 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-xl transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingOrderId(null)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-primary">Order #{order.id.slice(0, 8)}</h3>
                    <span className="badge bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3">{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-lg text-gray-800">Total: <span className="font-semibold">${order.total.toFixed(2)}</span></p>
                  {order.userEmail && (
                    <p className="text-lg text-gray-800">Placed by: <span className="font-semibold">{order.userEmail}</span></p>
                  )}
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-primary mb-4">Items</h4>
                    <ul className="space-y-4">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
                            }}
                          />
                          <div>
                            <span className="font-medium text-gray-800">{item.name}</span> (x{item.quantity}) - <span className="font-semibold">${item.price.toFixed(2)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {user && user.email === order.userEmail && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Edit className="w-4 h-4 inline mr-2" />
                        Edit Order
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;