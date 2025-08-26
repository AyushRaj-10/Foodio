import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { User, MapPin, Phone, Mail, Edit3, Plus, RefreshCw, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userInfo, user, addressInfo, addresses } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const navigate = useNavigate();

  const fetchInfo = async () => {
    setLoading(true);
    try {
      const [userRes, addressRes] = await Promise.all([userInfo(), addressInfo()]);
      console.log("👤 User profile:", userRes.user);
      console.log("📦 User addresses:", addressRes.addresses);
    } catch (err) {
      console.error("⚠️ Failed to fetch profile:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on component mount
  useEffect(() => {
    if (!user || !addresses?.length) {
      fetchInfo();
    }
  }, []);

  const ProfileCard = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {user?.name || "Welcome to Foodio"}
            </h1>
            <p className="text-gray-600 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              {user?.email || "your@email.com"}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setActiveTab('edit')}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          <Edit3 className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">12</div>
          <div className="text-sm text-gray-600">Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">{addresses?.length || 0}</div>
          <div className="text-sm text-gray-600">Addresses</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">★ 4.8</div>
          <div className="text-sm text-gray-600">Rating</div>
        </div>
      </div>
    </div>
  );

  const AddressCard = ({ address, index }) => (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">
              {address.type || `Address ${index + 1}`}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              address.isDefault ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {address.isDefault ? 'Default' : 'Secondary'}
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
          <Edit3 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <div className="space-y-2 text-gray-700">
        <p className="font-medium">{address.address}</p>
        <p>{address.city}, {address.state} {address.postalCode}</p>
        {address.phone && (
          <p className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {address.phone}
          </p>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center">
          Set as default
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 ${
        activeTab === id
          ? 'bg-orange-500 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className={`px-2 py-1 rounded-full text-xs ${
          activeTab === id ? 'bg-orange-400' : 'bg-gray-200'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              My Profile
            </h2>
            <p className="text-gray-600 mt-2">Manage your account and delivery preferences</p>
          </div>
          
          <button
            onClick={fetchInfo}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-xl font-medium shadow-md transition-all duration-200"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Profile Card */}
        <ProfileCard />

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6 bg-gray-100 p-2 rounded-2xl">
          <TabButton id="profile" label="Profile" />
          <TabButton id="addresses" label="Addresses" count={addresses?.length || 0} />
          <TabButton id="orders" label="Order History" count={12} />
          <TabButton id="settings" label="Settings" />
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {activeTab === 'addresses' && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Delivery Addresses</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 text-orange-600 rounded-xl border-2 border-orange-200 font-medium transition-all duration-200">
                  <Plus className="w-4 h-4" />
                  <button onClick={() => {navigate('/address')}} >Add Address</button>
                </button>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : addresses && addresses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr, i) => (
                    <AddressCard key={i} address={addr} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No addresses found</h3>
                  <p className="text-gray-500 mb-6">Add your first delivery address to get started</p>
                  <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors duration-200">
                    Add Address
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="pt-4">
                  <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium shadow-md transition-all duration-200">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Order History</h3>
              <p className="text-gray-600">Your recent orders will appear here</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Settings</h3>
              <p className="text-gray-600">Account preferences and settings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;