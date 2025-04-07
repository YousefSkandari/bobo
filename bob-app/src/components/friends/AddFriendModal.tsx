'use client';

import React, { useState } from 'react';

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendRequest: (username: string) => void;
}

const AddFriendModal: React.FC<AddFriendModalProps> = ({ 
  isOpen, 
  onClose, 
  onSendRequest 
}) => {
  const [username, setUsername] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    // Basic validation
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setIsProcessing(true);
    try {
      await onSendRequest(username.trim());
      // Reset form after successful submission
      setUsername('');
    } catch (err) {
      setError('Failed to send friend request. Please try again.');
      console.error('Error sending friend request:', err);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg p-6 max-w-md w-full"
        style={{ backgroundColor: 'var(--bg-card)' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Add Friend</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2" style={{ color: 'var(--text-secondary)' }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isProcessing}
            />
            {error && (
              <p className="text-sm mt-1" style={{ color: 'var(--error)' }}>{error}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border rounded-md transition-colors disabled:opacity-50"
              style={{ 
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                backgroundColor: 'transparent'
              }}
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="px-4 py-2 rounded-md transition-opacity disabled:opacity-50 flex items-center justify-center min-w-[100px]"
              style={{ 
                backgroundColor: 'var(--accent-primary)', 
                color: 'var(--text-on-accent)'
              }}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full"
                  style={{ borderColor: 'var(--text-on-accent)' }}></div>
              ) : (
                'Send Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFriendModal; 