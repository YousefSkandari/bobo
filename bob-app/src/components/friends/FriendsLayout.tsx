'use client';

import React, { useState, useEffect } from 'react';
import FriendCard from './FriendCard';
import FriendRequestCard from './FriendRequestCard';
import AddFriendModal from './AddFriendModal';

// Type definitions
interface User {
  id: string;
  username: string;
  name?: string;
  avatar?: string;
}

interface Friend extends User {
  friendshipId: string;
  friendSince: string;
}

interface FriendRequest {
  id: string;
  sender: User;
  receiver: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

const FriendsLayout: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Mock user ID (would come from auth in a real app)
  const mockUserId = "user-123";
  
  // Fetch friends data
  const fetchFriends = async () => {
    try {
      setLoading(true);
      // In a real application, this would be an API call
      // For now, we'll use mock data
      const mockFriends: Friend[] = [
        {
          id: '1',
          username: 'johndoe',
          name: 'John Doe',
          avatar: '/avatars/user1.png',
          friendshipId: 'f1',
          friendSince: '2023-01-15T12:00:00Z',
        },
        {
          id: '2',
          username: 'janesmith',
          name: 'Jane Smith',
          avatar: '/avatars/user2.png',
          friendshipId: 'f2',
          friendSince: '2023-02-20T15:30:00Z',
        },
        {
          id: '3',
          username: 'mikebrown',
          name: 'Mike Brown',
          avatar: '/avatars/user3.png',
          friendshipId: 'f3',
          friendSince: '2023-03-10T09:45:00Z',
        },
      ];
      
      const mockRequests: FriendRequest[] = [
        {
          id: 'r1',
          sender: {
            id: '4',
            username: 'sarahjones',
            name: 'Sarah Jones',
            avatar: '/avatars/user4.png',
          },
          receiver: {
            id: mockUserId,
            username: 'currentuser',
          },
          status: 'pending',
          createdAt: '2023-04-05T14:20:00Z',
        },
      ];
      
      setFriends(mockFriends);
      setFriendRequests(mockRequests);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching friends data:', err);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchFriends();
  }, []);
  
  // Filter friends based on search query
  const filteredFriends = friends.filter(friend => 
    friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (friend.name && friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Handle accepting a friend request
  const handleAcceptRequest = async (requestId: string) => {
    try {
      // In a real app, this would be an API call
      console.log(`Accepting friend request: ${requestId}`);
      
      // Update the UI immediately
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      
      // Add the new friend to the friends list (in a real app, this would come from the API)
      const acceptedRequest = friendRequests.find(req => req.id === requestId);
      if (acceptedRequest) {
        const newFriend: Friend = {
          ...acceptedRequest.sender,
          friendshipId: `new-${Date.now()}`,
          friendSince: new Date().toISOString(),
        };
        setFriends(prev => [...prev, newFriend]);
      }
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };
  
  // Handle rejecting a friend request
  const handleRejectRequest = async (requestId: string) => {
    try {
      // In a real app, this would be an API call
      console.log(`Rejecting friend request: ${requestId}`);
      
      // Update the UI immediately
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (err) {
      console.error('Error rejecting friend request:', err);
    }
  };
  
  // Handle sending a friend request
  const handleSendFriendRequest = async (username: string) => {
    try {
      // In a real app, this would be an API call
      console.log(`Sending friend request to: ${username}`);
      
      // Close the modal
      setIsAddFriendModalOpen(false);
      
      // Show confirmation
      alert(`Friend request sent to ${username}!`);
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };
  
  // Handle viewing a friend's city
  const handleViewCity = (friendId: string) => {
    // In a real app, this would navigate to the friend's city view
    console.log(`Viewing city of friend: ${friendId}`);
    alert(`Navigating to ${friendId}'s city (not implemented in this demo)`);
  };
  
  return (
    <div className="pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Friends</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Connect with friends and explore their cities</p>
      </div>
      
      {/* Search and add friend */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-color)',
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5"
            style={{ color: 'var(--text-secondary)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        
        <button
          className="px-4 py-2 rounded-md transition-colors"
          style={{ 
            backgroundColor: 'var(--accent-primary)', 
            color: 'var(--text-on-accent)'
          }}
          onClick={() => setIsAddFriendModalOpen(true)}
        >
          Add Friend
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b mb-6" style={{ borderColor: 'var(--border-color)' }}>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'friends'
              ? 'border-b-2'
              : 'hover:opacity-80'
          }`}
          style={{ 
            color: activeTab === 'friends' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderColor: activeTab === 'friends' ? 'var(--accent-primary)' : 'transparent'
          }}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        
        <button
          className={`px-4 py-2 font-medium flex items-center ${
            activeTab === 'requests'
              ? 'border-b-2'
              : 'hover:opacity-80'
          }`}
          style={{ 
            color: activeTab === 'requests' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            borderColor: activeTab === 'requests' ? 'var(--accent-primary)' : 'transparent'
          }}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          {friendRequests.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full"
              style={{ 
                backgroundColor: 'var(--error)', 
                color: 'white' 
              }}
            >
              {friendRequests.length}
            </span>
          )}
        </button>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
            style={{ borderColor: 'var(--accent-primary)' }}></div>
        </div>
      )}
      
      {/* Friends list */}
      {!loading && activeTab === 'friends' && (
        <>
          {filteredFriends.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFriends.map(friend => (
                <FriendCard
                  key={friend.id}
                  friend={friend}
                  onViewCity={() => handleViewCity(friend.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              {searchQuery ? (
                <p style={{ color: 'var(--text-secondary)' }} className="text-lg mb-4">No friends found matching "{searchQuery}"</p>
              ) : (
                <>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-lg mb-4">You don't have any friends yet.</p>
                  <button
                    className="px-4 py-2 rounded-md"
                    style={{ 
                      backgroundColor: 'var(--accent-primary)', 
                      color: 'var(--text-on-accent)'
                    }}
                    onClick={() => setIsAddFriendModalOpen(true)}
                  >
                    Add Your First Friend
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Friend requests */}
      {!loading && activeTab === 'requests' && (
        <>
          {friendRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {friendRequests.map(request => (
                <FriendRequestCard
                  key={request.id}
                  request={request}
                  onAccept={() => handleAcceptRequest(request.id)}
                  onReject={() => handleRejectRequest(request.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p style={{ color: 'var(--text-secondary)' }} className="text-lg">You don't have any pending friend requests.</p>
            </div>
          )}
        </>
      )}
      
      {/* Add friend modal */}
      <AddFriendModal
        isOpen={isAddFriendModalOpen}
        onClose={() => setIsAddFriendModalOpen(false)}
        onSendRequest={handleSendFriendRequest}
      />
    </div>
  );
};

export default FriendsLayout; 