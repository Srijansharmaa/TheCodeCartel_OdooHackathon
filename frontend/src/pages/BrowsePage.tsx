import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import Toast from '../components/Toast';
import { Search, Filter, Star, MapPin, MessageCircle } from 'lucide-react';

const BrowsePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [connectForm, setConnectForm] = useState({
    skillOffered: '',
    skillWanted: '',
    message: ''
  });
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
    isVisible: false
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.getUsers();
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term and selected skill
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skillsOffered.some((skill: string) => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        user.skillsWanted.some((skill: string) => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (selectedSkill) {
      filtered = filtered.filter(user =>
        user.skillsOffered.some((skill: string) => 
          skill.toLowerCase().includes(selectedSkill.toLowerCase())
        ) ||
        user.skillsWanted.some((skill: string) => 
          skill.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, selectedSkill, users]);

  const handleConnect = (user: any) => {
    setSelectedUser(user);
    setShowConnectModal(true);
  };

  const handleSendRequest = async () => {
    try {
      await apiService.sendSwapRequest(
        selectedUser.id.toString(),
        connectForm.skillOffered,
        connectForm.skillWanted,
        connectForm.message
      );
      setShowConnectModal(false);
      setSelectedUser(null);
      setConnectForm({ skillOffered: '', skillWanted: '', message: '' });
      setToast({
        message: 'Swap request sent successfully!',
        type: 'success',
        isVisible: true
      });
    } catch (error: any) {
      console.error('Error sending request:', error);
      setToast({
        message: error.message || 'Failed to send request. Please try again.',
        type: 'error',
        isVisible: true
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Skills</h1>
          <p className="text-gray-600 mb-8">Find people with the skills you need and connect with them</p>
        </motion.div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Skills</option>
              <option value="react">React</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="design">UI/UX Design</option>
            </select>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : (
            filteredUsers.map((user: any, index: number) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{user.rating}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{user.location}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{user.bio}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Wanted:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleConnect(user)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Connect
                </button>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Connect Modal */}
      {showConnectModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connect with {selectedUser.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill You're Offering
                </label>
                <input
                  type="text"
                  value={connectForm.skillOffered}
                  onChange={(e) => setConnectForm({...connectForm, skillOffered: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., React Development"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill You Want to Learn
                </label>
                <input
                  type="text"
                  value={connectForm.skillWanted}
                  onChange={(e) => setConnectForm({...connectForm, skillWanted: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Python Programming"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={connectForm.message}
                  onChange={(e) => setConnectForm({...connectForm, message: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  placeholder="Tell them why you want to connect..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowConnectModal(false);
                  setSelectedUser(null);
                  setConnectForm({ skillOffered: '', skillWanted: '', message: '' });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRequest}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default BrowsePage; 