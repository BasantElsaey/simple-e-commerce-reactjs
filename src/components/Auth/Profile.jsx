import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Edit, Trash2, LogOut } from 'lucide-react';

function Profile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedUser = { name, email, password: password || user.password };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    setPassword('');
    toast.success('Profile updated successfully!');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      localStorage.removeItem('user');
      setUser(null);
      toast.success('Account deleted.');
      navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 text-center">
          <p className="text-xl text-gray-800">Please log in to view your profile.</p>
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

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="card bg-base-100 shadow-2xl rounded-2xl p-8 w-full max-w-md mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Your Profile
        </h1>
        {isEditing ? (
          <form onSubmit={handleEdit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">New Password (optional)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter new password"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(user.name);
                  setEmail(user.email);
                  setPassword('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl font-semibold text-gray-800">Name: {user.name}</p>
              <p className="text-lg text-gray-600">Email: {user.email}</p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <LogOut className="w-4 h-4 inline mr-2" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;