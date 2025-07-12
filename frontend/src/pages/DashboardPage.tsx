import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { Calendar, MessageSquare, Star, TrendingUp, Users, BookOpen } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Here's what's happening with your skill exchanges
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
              bg: 'bg-indigo-100',
              label: 'Active Requests',
              value: 12,
            },
            {
              icon: <Star className="w-6 h-6 text-green-600" />,
              bg: 'bg-green-100',
              label: 'Completed Swaps',
              value: 8,
            },
            {
              icon: <Users className="w-6 h-6 text-yellow-600" />,
              bg: 'bg-yellow-100',
              label: 'Connections',
              value: 24,
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
              bg: 'bg-purple-100',
              label: 'Rating',
              value: 4.8,
            },
          ].map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors"
            >
              <div className="flex items-center">
                <div className={`p-2 ${card.bg} dark:bg-opacity-20 rounded-lg`}>
                  {card.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{card.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow transition-colors"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  icon: <MessageSquare className="w-4 h-4 text-indigo-600" />,
                  bg: 'bg-indigo-100',
                  title: 'New swap request from John Doe',
                  desc: 'Requesting help with React development',
                  time: '2 hours ago',
                },
                {
                  icon: <Star className="w-4 h-4 text-green-600" />,
                  bg: 'bg-green-100',
                  title: 'Completed swap with Jane Smith',
                  desc: 'You received 5 stars for your teaching',
                  time: '1 day ago',
                },
                {
                  icon: <BookOpen className="w-4 h-4 text-blue-600" />,
                  bg: 'bg-blue-100',
                  title: 'Started learning from Mike Johnson',
                  desc: 'Python programming session scheduled',
                  time: '3 days ago',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 ${item.bg} dark:bg-opacity-20 rounded-full flex items-center justify-center`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
