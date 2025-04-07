'use client';

import React from 'react';

interface PremiumFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  onPurchase: () => void;
}

const PremiumFeatureModal: React.FC<PremiumFeatureModalProps> = ({
  isOpen,
  onClose,
  featureName,
  onPurchase
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className="relative w-full max-w-md p-6 rounded-lg shadow-xl"
        style={{ backgroundColor: 'var(--bg-card)' }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-xl"
          style={{ color: 'var(--text-secondary)' }}
          onClick={onClose}
        >
          ×
        </button>
        
        {/* Header */}
        <div className="text-center mb-6">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
            style={{ 
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid gold'
            }}
          >
            <span className="text-2xl" style={{ color: 'gold' }}>⭐</span>
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Unlock Premium Features
          </h2>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            {featureName ? `"${featureName}" is a premium feature` : 'Upgrade to access premium features'}
          </p>
        </div>
        
        {/* Feature list */}
        <div 
          className="p-4 rounded-lg mb-6"
          style={{ backgroundColor: 'var(--bg-secondary)' }}
        >
          <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
            Premium includes:
          </h3>
          <ul className="space-y-2">
            {[
              'Access to exclusive premium building styles',
              'Special city themes including Night Theme',
              'Advanced city decorations and landmarks',
              'Premium editing tools for your city',
              'Priority customer support'
            ].map((feature, index) => (
              <li 
                key={index}
                className="flex items-center gap-2"
              >
                <span className="text-xs" style={{ color: 'gold' }}>✓</span>
                <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="mb-2">
            <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Monthly subscription</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>$9.99</span>
            <span className="text-sm ml-1" style={{ color: 'var(--text-tertiary)' }}>/month</span>
          </div>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Cancel anytime
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            className="flex-1 px-4 py-2 rounded-md border"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              backgroundColor: 'transparent'
            }}
            onClick={onClose}
          >
            Maybe Later
          </button>
          <button
            className="flex-1 px-4 py-2 rounded-md flex items-center justify-center gap-1"
            style={{ 
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              color: 'gold',
              border: '1px solid gold'
            }}
            onClick={onPurchase}
          >
            <span className="text-sm">⭐</span>
            Subscribe Now
          </button>
        </div>
        
        <p className="mt-4 text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
          By upgrading, you agree to our terms and conditions. This is a simulated purchase.
          No actual payment will be processed in this demo.
        </p>
      </div>
    </div>
  );
};

export default PremiumFeatureModal; 