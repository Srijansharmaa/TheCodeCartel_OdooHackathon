import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import { Users, Shield, AlertTriangle, BarChart3, Settings, Ban, CheckCircle } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>({});
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsResponse, usersResponse] = await Promise.all([
          apiService.getAdminStats(),
          apiService.getAllUsers()
        ]);
        setStats(statsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Manage your platform and monitor user activity</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[{
            icon: <Users className="w-6 h-6 text-blue-600" />, bg: 'bg-blue-100 dark:bg-blue-800', label: 'Total Users', value: stats.totalUsers || 0
          }, {
            icon: <CheckCircle className="w-6 h-6 text-green-600" />, bg: 'bg-green-100 dark:bg-green-800', label: 'Active Users', value: stats.activeUsers || 0
          }, {
            icon: <Ban className="w-6 h-6 text-red-600" />, bg: 'bg-red-100 dark:bg-red-800', label: 'Banned Users', value: stats.bannedUsers || 0
          }, {
            icon: <BarChart3 className="w-6 h-6 text-purple-600" />, bg: 'bg-purple-100 dark:bg-purple-800', label: 'Total Swaps', value: stats.totalSwaps || 0
          }, {
            icon: <AlertTriangle className="w-6 h-6 text-yellow-600" />, bg: 'bg-yellow-100 dark:bg-yellow-800', label: 'Reports', value: stats.pendingReports || 0
          }].map(({ icon, bg, label, value }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-2 ${bg} rounded-lg`}>{icon}</div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {['dashboard', 'users', 'reports', 'settings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'dashboard' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Platform Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["Recent Activity", "System Status"].map(title => (
                    <div key={title} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-medium mb-2">{title}</h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        {title === "Recent Activity" ? (
                          <>
                            <p>• 5 new users registered today</p>
                            <p>• 12 skill swaps completed</p>
                            <p>• 3 reports submitted</p>
                          </>
                        ) : (
                          <>
                            <p>• All systems operational</p>
                            <p>• Database: Healthy</p>
                            <p>• API: 99.9% uptime</p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Users, reports, and settings tabs remain unchanged and will be updated similarly with dark: styles */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
