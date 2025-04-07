'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';

interface Transaction {
  id: number;
  date: string;
  stockSymbol: string;
  stockName: string;
  type: 'buy' | 'sell' | 'deposit';
  quantity?: number;
  price?: number;
  amount: number;
}

export default function TransactionsPage() {
  // Mock transaction data
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2023-08-15T14:30:00',
      stockSymbol: 'AAPL',
      stockName: 'Apple Inc.',
      type: 'buy',
      quantity: 10,
      price: 175.05,
      amount: 1750.50
    },
    {
      id: 2,
      date: '2023-08-12T10:15:00',
      stockSymbol: 'MSFT',
      stockName: 'Microsoft Corp.',
      type: 'buy',
      quantity: 5,
      price: 250.06,
      amount: 1250.30
    },
    {
      id: 3,
      date: '2023-08-08T16:45:00',
      stockSymbol: 'TSLA',
      stockName: 'Tesla Inc.',
      type: 'sell',
      quantity: 2,
      price: 296.75,
      amount: 593.50
    },
    {
      id: 4,
      date: '2023-08-05T09:20:00',
      type: 'deposit',
      stockSymbol: '',
      stockName: '',
      amount: 5000.00
    },
    {
      id: 5,
      date: '2023-08-01T11:10:00',
      stockSymbol: 'AMZN',
      stockName: 'Amazon.com Inc.',
      type: 'buy',
      quantity: 3,
      price: 337.95,
      amount: 1013.85
    }
  ]);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return { 
          backgroundColor: 'rgba(99, 102, 241, 0.1)', 
          color: 'var(--accent-primary)' 
        };
      case 'sell':
        return { 
          backgroundColor: 'rgba(16, 185, 129, 0.1)', 
          color: 'var(--success)' 
        };
      case 'deposit':
        return { 
          backgroundColor: 'rgba(59, 130, 246, 0.1)', 
          color: 'var(--info)' 
        };
      default:
        return { 
          backgroundColor: 'var(--bg-secondary)', 
          color: 'var(--text-secondary)' 
        };
    }
  };
  
  return (
    <MainLayout>
      <div className="pb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Transaction History</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
          Record of all your investment activities
        </p>
        
        <div className="shadow-lg rounded-lg overflow-hidden border" style={{ 
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)' 
        }}>
          <div className="p-6" style={{ 
            background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
          }}>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-on-accent)' }}>Recent Transactions</h2>
            <p style={{ color: 'var(--text-on-accent)', opacity: 0.8 }} className="mt-1">Your trading and deposit history</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: 'var(--divider-color)' }}>
              <thead style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ 
                backgroundColor: 'var(--bg-card)', 
                borderColor: 'var(--divider-color)'
              }}>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-opacity-80" style={{ backgroundColor: 'var(--bg-card)' }}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" 
                        style={getTypeColor(transaction.type)}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.type === 'deposit' ? (
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>-</span>
                      ) : (
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{transaction.stockSymbol}</div>
                          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{transaction.stockName}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ color: 'var(--text-secondary)' }}>
                      {transaction.quantity || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right" style={{ color: 'var(--text-secondary)' }}>
                      {transaction.price ? `$${transaction.price.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium" style={{
                      color: transaction.type === 'sell' || transaction.type === 'deposit'
                        ? 'var(--success)'
                        : 'var(--error)'
                    }}>
                      {transaction.type === 'buy' ? '-' : '+'} ${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t" style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}>
            <div className="flex justify-between items-center">
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Showing {transactions.length} transactions
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border text-sm font-medium rounded-md" style={{ 
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }}>
                  Previous
                </button>
                <button className="px-4 py-2 border text-sm font-medium rounded-md" style={{ 
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-color)'
                }}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 