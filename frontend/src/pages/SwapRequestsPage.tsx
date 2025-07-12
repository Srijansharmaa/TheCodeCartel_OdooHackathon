import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { apiService } from '../services/api';
import Toast from '../components/Toast';
import { Clock, Check, X, MessageCircle, Star } from 'lucide-react';

const SwapRequestsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('received');
  const [requests, setRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'warning',
    isVisible: false
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        if (activeTab === 'received') {
          const response = await apiService.getReceivedRequests();
          setRequests(response.data);
        } else {
          const response = await apiService.getSentRequests();
          setRequests(response.data);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <Check className="w-4 h-4" />;
      case 'completed':
        return <Star className="w-4 h-4" />;
      case 'rejected':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await apiService.acceptSwapRequest(requestId);
      // Refresh the requests
      const response = await apiService.getReceivedRequests();
      setRequests(response.data);
      setToast({
        message: 'Request accepted successfully!',
        type: 'success',
        isVisible: true
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      setToast({
        message: 'Failed to accept request. Please try again.',
        type: 'error',
        isVisible: true
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await apiService.rejectSwapRequest(requestId);
      // Refresh the requests
      const response = await apiService.getReceivedRequests();
      setRequests(response.data);
      setToast({
        message: 'Request rejected successfully!',
        type: 'success',
        isVisible: true
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      setToast({
        message: 'Failed to reject request. Please try again.',
        type: 'error',
        isVisible: true
      });
    }
  };

  const filteredRequests = requests.filter((request: any) => request.type === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Requests</h1>
          <p className="text-gray-600 mb-8">Manage your skill exchange requests</p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('received')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'received'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Received Requests
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sent'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sent Requests
              </button>
            </nav>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} requests
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'received' 
                    ? 'You haven\'t received any swap requests yet.'
                    : 'You haven\'t sent any swap requests yet.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request: any, index: number) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {activeTab === 'received' ? request.from : request.to}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status}</span>
                          </span>
                        </div>
                        <p className="text-sm font-medium text-indigo-600 mb-2">
                          {request.skill}
                        </p>
                        <p className="text-gray-600 text-sm mb-3">
                          {request.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {request.date}
                        </p>
                      </div>
                    </div>

                    {request.status === 'pending' && activeTab === 'received' && (
                      <div className="mt-4 flex space-x-2">
                        <button 
                          onClick={() => handleAcceptRequest(request.id)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleRejectRequest(request.id)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    )}

                    {request.status === 'accepted' && (
                      <div className="mt-4">
                        <button 
                          onClick={() => alert('Session started! This would open a video call or chat interface.')}
                          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 inline mr-2" />
                          Start Session
                        </button>
                      </div>
                    )}

                    {request.status === 'completed' && (
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">4.8/5 rating</span>
                        </div>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-500">
                          View Details
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

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

export default SwapRequestsPage; 