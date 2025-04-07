'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import { 
  ArrowPathIcon,
  UsersIcon,
  ClockIcon,
  ChevronLeftIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import TradeModal from '@/components/TradeModal';

// Mock stock market data - same as in the stocks main page
const availableStocks = [
  { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 175.05, change: 3.2, marketCap: 2850, volume: 68.5, sector: 'Technology', popular: true },
  { id: 2, name: 'Microsoft Corp', symbol: 'MSFT', price: 250.06, change: -0.8, marketCap: 1870, volume: 32.1, sector: 'Technology', popular: true },
  { id: 3, name: 'Tesla Inc.', symbol: 'TSLA', price: 296.75, change: 5.7, marketCap: 942, volume: 120.3, sector: 'Automotive', popular: true },
  { id: 4, name: 'Amazon.com Inc.', symbol: 'AMZN', price: 337.95, change: 1.2, marketCap: 1350, volume: 54.8, sector: 'Consumer Cyclical', popular: true },
  { id: 5, name: 'Google', symbol: 'GOOGL', price: 1350.10, change: -1.3, marketCap: 1720, volume: 22.5, sector: 'Technology', popular: true },
  { id: 6, name: 'Netflix Inc.', symbol: 'NFLX', price: 450.25, change: 1.2, marketCap: 196, volume: 10.2, sector: 'Entertainment' },
  { id: 7, name: 'Adobe Inc.', symbol: 'ADBE', price: 380.75, change: 0.8, marketCap: 171, volume: 8.5, sector: 'Technology' },
  { id: 8, name: 'Nvidia Corp.', symbol: 'NVDA', price: 620.50, change: 2.3, marketCap: 1520, volume: 88.7, sector: 'Technology', popular: true },
  { id: 9, name: 'PayPal Holdings', symbol: 'PYPL', price: 110.30, change: -1.5, marketCap: 115, volume: 17.3, sector: 'Financial Services' },
  { id: 10, name: 'Shopify Inc.', symbol: 'SHOP', price: 85.45, change: 0.3, marketCap: 108, volume: 12.8, sector: 'Technology' },
  { id: 11, name: 'Salesforce Inc.', symbol: 'CRM', price: 210.60, change: 1.1, marketCap: 205, volume: 9.7, sector: 'Technology' },
  { id: 12, name: 'AMD Inc.', symbol: 'AMD', price: 128.90, change: 3.4, marketCap: 207, volume: 65.4, sector: 'Technology' },
  { id: 13, name: 'Zoom Video', symbol: 'ZM', price: 70.25, change: -0.5, marketCap: 20.8, volume: 5.2, sector: 'Technology' },
  { id: 14, name: 'Twitter Inc.', symbol: 'TWTR', price: 40.15, change: -2.1, marketCap: 30.6, volume: 22.9, sector: 'Communication Services' },
  { id: 15, name: 'Meta Platforms', symbol: 'META', price: 325.80, change: 1.7, marketCap: 830, volume: 28.4, sector: 'Technology', popular: true },
  { id: 16, name: 'Uber Technologies', symbol: 'UBER', price: 45.20, change: 0.5, marketCap: 92.3, volume: 18.7, sector: 'Technology' },
  { id: 17, name: 'Airbnb Inc.', symbol: 'ABNB', price: 135.70, change: -0.7, marketCap: 86.5, volume: 7.6, sector: 'Consumer Cyclical' },
  { id: 18, name: 'Walmart Inc.', symbol: 'WMT', price: 160.30, change: 0.2, marketCap: 430, volume: 9.3, sector: 'Consumer Defensive' },
  { id: 19, name: 'JPMorgan Chase', symbol: 'JPM', price: 182.50, change: 1.3, marketCap: 525, volume: 14.7, sector: 'Financial Services', popular: true },
  { id: 20, name: 'Johnson & Johnson', symbol: 'JNJ', price: 157.80, change: -0.4, marketCap: 380, volume: 8.2, sector: 'Healthcare', popular: true },
];

// Function to generate a consistent color for a stock symbol
const getStockColor = (symbol: string): string => {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 70%, 60%)`;
};

// Generate historical data for stock chart
const generateHistoricalData = (stock: typeof availableStocks[0], days: number = 30) => {
  const data = [];
  let currentPrice = stock.price;
  const volatility = Math.abs(stock.change) / 10 || 0.01;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some random variation based on the stock's volatility
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, 1); // Ensure price doesn't go below 1
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  
  return data;
};

// Generate community data
const generateCommunityData = (stock: typeof availableStocks[0]) => {
  const userCount = Math.floor(Math.random() * 1000) + 100;
  const avgProfitability = (Math.random() * 20 - 5).toFixed(2);
  
  // Generate purchase timeline (last 6 months)
  const timeline = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    
    timeline.push({
      month: date.toLocaleString('default', { month: 'short' }),
      purchases: Math.floor(Math.random() * 500)
    });
  }
  
  return {
    usersOwning: userCount,
    avgProfitability: parseFloat(avgProfitability),
    timeline
  };
};

// Stock card component for related stocks
const StockCard = ({ stock, onClick }: { 
  stock: typeof availableStocks[0],
  onClick: () => void
}) => {
  const bgColor = getStockColor(stock.symbol);
  
  return (
    <div 
      className="rounded-lg overflow-hidden shadow-sm border transition-all hover:shadow-md cursor-pointer"
      style={{ 
        backgroundColor: 'var(--bg-card)', 
        borderColor: 'var(--border-color)' 
      }}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            <div 
              className="w-10 h-10 mr-3 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-bold"
              style={{ 
                backgroundColor: bgColor,
                color: '#FFFFFF',
              }}
            >
              {stock.symbol.slice(0, 2)}
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{stock.name}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stock.symbol}</p>
            </div>
          </div>
          <span 
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{ 
              backgroundColor: stock.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              color: stock.change >= 0 ? 'var(--success)' : 'var(--error)'
            }}
          >
            {stock.change >= 0 ? '+' : ''}{stock.change}%
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Price</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>${stock.price.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sector</p>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{stock.sector}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StockDetailPage() {
  const router = useRouter();
  const params = useParams();
  const symbol = params.symbol as string;
  
  const [stock, setStock] = useState<typeof availableStocks[0] | null>(null);
  const [relatedStocks, setRelatedStocks] = useState<typeof availableStocks>([]);
  const [historicalData, setHistoricalData] = useState<{date: string, price: number}[]>([]);
  const [communityData, setCommunityData] = useState({
    usersOwning: 0,
    avgProfitability: 0,
    timeline: [] as {month: string, purchases: number}[]
  });
  const chartRef = useRef<HTMLCanvasElement>(null);
  
  // Add state for controlling the trade modal
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  
  useEffect(() => {
    // Find the stock by symbol
    const foundStock = availableStocks.find(s => s.symbol === symbol);
    
    if (foundStock) {
      setStock(foundStock);
      
      // Generate historical data for chart
      setHistoricalData(generateHistoricalData(foundStock));
      
      // Generate community data
      setCommunityData(generateCommunityData(foundStock));
      
      // Find related stocks (same sector)
      const sectorStocks = availableStocks
        .filter(s => s.sector === foundStock.sector && s.symbol !== foundStock.symbol)
        .slice(0, 4);
      setRelatedStocks(sectorStocks);
    }
  }, [symbol]);
  
  // Update chart drawing logic to be theme-aware
  useEffect(() => {
    if (!chartRef.current || historicalData.length === 0 || !stock) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    // Handle high DPI displays
    const setupHiDPICanvas = (canvas: HTMLCanvasElement) => {
      // Get the device pixel ratio
      const dpr = window.devicePixelRatio || 1;
      
      // Get the CSS display size
      const rect = canvas.getBoundingClientRect();
      
      // Set the actual canvas size for higher resolution
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale the context to ensure correct drawing operations
      ctx.scale(dpr, dpr);
      
      // Set the CSS display size to maintain layout
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      return dpr;
    };
    
    // Set up high DPI canvas
    const dpr = setupHiDPICanvas(chartRef.current);
    
    // Track mouse position for tooltips
    let mouseX = 0;
    let mouseY = 0;
    let activePoint: { x: number, y: number, price: number, date: string } | null = null;
    let isHovering = false;
    
    // Chart drawing logic
    ctx.clearRect(0, 0, chartRef.current.width / dpr, chartRef.current.height / dpr);
    
    // Calculate chart dimensions
    const width = chartRef.current.width / dpr;
    const height = chartRef.current.height / dpr;
    const padding = 40;
    const leftPadding = 75; // Even more padding for Y-axis labels
    const rightPadding = padding;
    const topPadding = padding;
    const bottomPadding = padding;
    const chartWidth = width - leftPadding - rightPadding;
    const chartHeight = height - topPadding - bottomPadding;
    
    // Find min and max values with better padding
    const prices = historicalData.map(d => d.price);
    const minValue = Math.min(...prices);
    const maxValue = Math.max(...prices);
    const range = maxValue - minValue;
    
    // Add 10% padding to top and bottom
    const maxPrice = maxValue + (range * 0.15);
    const minPrice = Math.max(0, minValue - (range * 0.1)); // Ensure not below 0
    const priceRange = maxPrice - minPrice;
    
    // Get theme-aware colors
    const getThemeColors = () => {
      // Get colors from CSS variables
      const root = document.documentElement;
      const bgSecondary = window.getComputedStyle(root).getPropertyValue('--bg-secondary').trim() || '#2d3748';
      const textSecondary = window.getComputedStyle(root).getPropertyValue('--text-secondary').trim() || '#a0aec0';
      const textPrimary = window.getComputedStyle(root).getPropertyValue('--text-primary').trim() || '#e2e8f0';
      const success = window.getComputedStyle(root).getPropertyValue('--success').trim() || '#10b981';
      const error = window.getComputedStyle(root).getPropertyValue('--error').trim() || '#ef4444';
      const bgCard = window.getComputedStyle(root).getPropertyValue('--bg-card').trim() || '#1a202c';
      const borderColor = window.getComputedStyle(root).getPropertyValue('--border-color').trim() || '#4a5568';
      
      return {
        bgSecondary,
        textSecondary,
        textPrimary,
        success,
        error,
        bgCard,
        borderColor
      };
    };
    
    const colors = getThemeColors();
    
    // Helper function to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      if (hex.startsWith('#')) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      // If not a hex color, use a default
      return `rgba(100, 100, 100, ${alpha})`;
    };
    
    // Set chart background
    ctx.fillStyle = colors.bgSecondary;
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines (horizontal)
    ctx.beginPath();
    ctx.strokeStyle = hexToRgba(colors.textSecondary, 0.25);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 2]);
    
    // Draw 4 evenly spaced grid lines
    for (let i = 0; i <= 4; i++) {
      const y = topPadding + (i * chartHeight / 4);
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(width - rightPadding, y);
    }
    
    // Draw vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = leftPadding + (i * chartWidth / 6);
      ctx.moveTo(x, topPadding);
      ctx.lineTo(x, height - bottomPadding);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw axes with better visibility
    ctx.strokeStyle = hexToRgba(colors.textPrimary, 0.7);
    ctx.lineWidth = 1.5;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(leftPadding, topPadding);
    ctx.lineTo(leftPadding, height - bottomPadding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(leftPadding, height - bottomPadding);
    ctx.lineTo(width - rightPadding, height - bottomPadding);
    ctx.stroke();
    
    // Calculate point coordinates
    const points = historicalData.map((d, i) => {
      const x = leftPadding + (i / (historicalData.length - 1)) * chartWidth;
      const y = height - bottomPadding - ((d.price - minPrice) / priceRange) * chartHeight;
      return { x, y, price: d.price, date: d.date };
    });
    
    // Draw the area under the line
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - bottomPadding);
    ctx.lineTo(points[0].x, points[0].y);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length-1].x, height - bottomPadding);
    ctx.closePath();
    
    // Better gradient for area under curve
    const gradient = ctx.createLinearGradient(0, topPadding, 0, height - bottomPadding);
    if (stock.change >= 0) {
      gradient.addColorStop(0, hexToRgba(colors.success, 0.3));
      gradient.addColorStop(1, hexToRgba(colors.success, 0.05));
    } else {
      gradient.addColorStop(0, hexToRgba(colors.error, 0.3));
      gradient.addColorStop(1, hexToRgba(colors.error, 0.05));
    }
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line with higher contrast
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    
    // Thicker stroke for line
    ctx.strokeStyle = stock.change >= 0 ? colors.success : colors.error;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    // Add Y-axis labels with better contrast
    ctx.fillStyle = colors.textPrimary;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'right';
    
    // More Y axis labels for better readability
    for (let i = 0; i <= 4; i++) {
      const value = minPrice + (priceRange * (i / 4));
      const y = height - bottomPadding - (chartHeight * (i / 4));
      // Format the price with appropriate decimal places based on value
      const formattedPrice = value >= 1000 ? value.toFixed(0) : value.toFixed(2);
      ctx.fillText(`$${formattedPrice}`, leftPadding - 10, y + 4);
    }
    
    // Add X-axis labels (dates) with better spacing and formatting
    ctx.textAlign = 'center';
    ctx.fillStyle = colors.textPrimary;
    ctx.font = 'bold 12px Arial';
    
    // Draw more date labels (6 evenly spaced dates)
    for (let i = 0; i <= 6; i++) {
      const index = Math.floor((historicalData.length - 1) * (i / 6));
      if (index >= 0 && index < historicalData.length) {
        const date = new Date(historicalData[index].date);
        const x = leftPadding + (chartWidth * (i / 6));
        ctx.fillText(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
                    x, height - bottomPadding + 15);
      }
    }
    
    // Event handlers for interactivity with improved detection
    const handleMouseMove = (e: MouseEvent) => {
      if (!chartRef.current) return;
      
      // Get the canvas's position on the page
      const rect = chartRef.current.getBoundingClientRect();
      
      // Calculate the position of the mouse cursor relative to the canvas
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
      
      // Find the closest point to the mouse
      let closestPoint = null;
      let closestDistance = Infinity;
      
      points.forEach(point => {
        // Prioritize X distance for better horizontal tracking
        const xDistance = Math.abs(point.x - mouseX);
        const yDistance = Math.abs(point.y - mouseY);
        // Use weighted distance (x is more important than y)
        const distance = xDistance * 3 + yDistance;
        
        // Consider points within chart area and prioritize closer X values
        if (xDistance < 30 && mouseY >= topPadding && mouseY <= height - bottomPadding && 
            mouseX >= leftPadding && mouseX <= width - rightPadding) {
          if (distance < closestDistance) {
            closestDistance = distance;
            closestPoint = point;
          }
        }
      });
      
      if (closestPoint !== activePoint) {
        activePoint = closestPoint;
        redrawWithTooltip();
      } else if (!closestPoint && activePoint) {
        activePoint = null;
        redrawWithTooltip(false);
      }
    };
    
    const handleMouseEnter = () => {
      isHovering = true;
    };
    
    const handleMouseLeave = () => {
      isHovering = false;
      activePoint = null;
      redrawWithTooltip(false);
    };
    
    const redrawWithTooltip = (showTooltip = true) => {
      // Get most current theme colors
      const colors = getThemeColors();
      
      // Redraw the chart (base elements)
      ctx.clearRect(0, 0, width, height);
      
      // Set chart background
      ctx.fillStyle = colors.bgSecondary;
      ctx.fillRect(0, 0, width, height);
      
      // Draw grid lines
      ctx.beginPath();
      ctx.strokeStyle = hexToRgba(colors.textSecondary, 0.25);
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      
      // Draw horizontal grid lines
      for (let i = 0; i <= 4; i++) {
        const y = topPadding + (i * chartHeight / 4);
        ctx.moveTo(leftPadding, y);
        ctx.lineTo(width - rightPadding, y);
      }
      
      // Draw vertical grid lines
      for (let i = 0; i <= 6; i++) {
        const x = leftPadding + (i * chartWidth / 6);
        ctx.moveTo(x, topPadding);
        ctx.lineTo(x, height - bottomPadding);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw axes
      ctx.strokeStyle = hexToRgba(colors.textPrimary, 0.7);
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.moveTo(leftPadding, topPadding);
      ctx.lineTo(leftPadding, height - bottomPadding);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(leftPadding, height - bottomPadding);
      ctx.lineTo(width - rightPadding, height - bottomPadding);
      ctx.stroke();
      
      // Draw the area under the line
      ctx.beginPath();
      ctx.moveTo(points[0].x, height - bottomPadding);
      ctx.lineTo(points[0].x, points[0].y);
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(points[points.length-1].x, height - bottomPadding);
      ctx.closePath();
      
      // Better gradient for area under curve
      const gradient = ctx.createLinearGradient(0, topPadding, 0, height - bottomPadding);
      if (stock.change >= 0) {
        gradient.addColorStop(0, hexToRgba(colors.success, 0.3));
        gradient.addColorStop(1, hexToRgba(colors.success, 0.05));
      } else {
        gradient.addColorStop(0, hexToRgba(colors.error, 0.3));
        gradient.addColorStop(1, hexToRgba(colors.error, 0.05));
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = stock.change >= 0 ? colors.success : colors.error;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      // Draw all data points smaller with better contrast - ONLY if hovering
      if (isHovering) {
        points.forEach(point => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = stock.change >= 0 ? colors.success : colors.error;
          ctx.fill();
          ctx.strokeStyle = colors.bgSecondary;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
      
      // Add Y-axis labels
      ctx.fillStyle = colors.textPrimary;
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'right';
      
      for (let i = 0; i <= 4; i++) {
        const value = minPrice + (priceRange * (i / 4));
        const y = height - bottomPadding - (chartHeight * (i / 4));
        // Format the price with appropriate decimal places based on value
        const formattedPrice = value >= 1000 ? value.toFixed(0) : value.toFixed(2);
        ctx.fillText(`$${formattedPrice}`, leftPadding - 10, y + 4);
      }
      
      // Add X-axis labels
      ctx.textAlign = 'center';
      ctx.fillStyle = colors.textPrimary;
      ctx.font = 'bold 12px Arial';
      
      for (let i = 0; i <= 6; i++) {
        const index = Math.floor((historicalData.length - 1) * (i / 6));
        if (index >= 0 && index < historicalData.length) {
          const date = new Date(historicalData[index].date);
          const x = leftPadding + (chartWidth * (i / 6));
          ctx.fillText(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
                      x, height - bottomPadding + 15);
        }
      }
      
      // Draw tooltip for active point with better contrast
      if (activePoint && showTooltip && isHovering) {
        // Draw vertical line at point
        ctx.beginPath();
        ctx.moveTo(activePoint.x, topPadding);
        ctx.lineTo(activePoint.x, height - bottomPadding);
        ctx.strokeStyle = hexToRgba(colors.textPrimary, 0.7);
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 2]);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw horizontal line at point for better crosshair effect
        ctx.beginPath(); 
        ctx.moveTo(leftPadding, activePoint.y);
        ctx.lineTo(width - rightPadding, activePoint.y);
        ctx.strokeStyle = hexToRgba(colors.textPrimary, 0.7);
        ctx.stroke();
        
        // Draw point highlight with better visibility
        ctx.beginPath();
        ctx.arc(activePoint.x, activePoint.y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = stock.change >= 0 ? colors.success : colors.error;
        ctx.fill();
        ctx.strokeStyle = colors.bgSecondary;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw more prominent tooltip box
        const tooltipWidth = 130;
        const tooltipHeight = 70;
        let tooltipX = activePoint.x - tooltipWidth / 2;
        let tooltipY = activePoint.y - tooltipHeight - 15;
        
        // Move tooltip below point if near top of chart
        if (tooltipY < topPadding + 10) {
          tooltipY = activePoint.y + 15;
        }
        
        // Make sure tooltip is within canvas bounds
        if (tooltipX < leftPadding) tooltipX = leftPadding;
        if (tooltipX + tooltipWidth > width - rightPadding) tooltipX = width - rightPadding - tooltipWidth;
        
        // Tooltip box with enhanced visibility
        ctx.fillStyle = colors.bgCard;
        ctx.strokeStyle = hexToRgba(colors.textPrimary, 0.5);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Draw rounded rectangle
        const radius = 6;
        ctx.moveTo(tooltipX + radius, tooltipY);
        ctx.lineTo(tooltipX + tooltipWidth - radius, tooltipY);
        ctx.quadraticCurveTo(tooltipX + tooltipWidth, tooltipY, tooltipX + tooltipWidth, tooltipY + radius);
        ctx.lineTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight - radius);
        ctx.quadraticCurveTo(tooltipX + tooltipWidth, tooltipY + tooltipHeight, tooltipX + tooltipWidth - radius, tooltipY + tooltipHeight);
        ctx.lineTo(tooltipX + radius, tooltipY + tooltipHeight);
        ctx.quadraticCurveTo(tooltipX, tooltipY + tooltipHeight, tooltipX, tooltipY + tooltipHeight - radius);
        ctx.lineTo(tooltipX, tooltipY + radius);
        ctx.quadraticCurveTo(tooltipX, tooltipY, tooltipX + radius, tooltipY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw small indicator arrow
        ctx.beginPath();
        const arrowSize = 6;
        if (tooltipY > activePoint.y) { // If tooltip is below point
          ctx.moveTo(activePoint.x, activePoint.y + arrowSize);
          ctx.lineTo(activePoint.x - arrowSize, activePoint.y + arrowSize * 2);
          ctx.lineTo(activePoint.x + arrowSize, activePoint.y + arrowSize * 2);
        } else { // If tooltip is above point
          ctx.moveTo(activePoint.x, activePoint.y - arrowSize);
          ctx.lineTo(activePoint.x - arrowSize, activePoint.y - arrowSize * 2);
          ctx.lineTo(activePoint.x + arrowSize, activePoint.y - arrowSize * 2);
        }
        ctx.closePath();
        ctx.fillStyle = colors.bgCard;
        ctx.fill();
        ctx.stroke();
        
        // Tooltip text with better contrast
        ctx.fillStyle = colors.textPrimary;
        ctx.textAlign = 'center';
        ctx.font = 'bold 14px Arial';
        
        // Format date
        const date = new Date(activePoint.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        });
        
        ctx.fillText(`$${activePoint.price.toFixed(2)}`, tooltipX + tooltipWidth / 2, tooltipY + 30);
        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = hexToRgba(colors.textPrimary, 0.9);
        ctx.fillText(formattedDate, tooltipX + tooltipWidth / 2, tooltipY + 50);
      }
    };
    
    // Add event listeners
    chartRef.current.addEventListener('mousemove', handleMouseMove);
    chartRef.current.addEventListener('mouseleave', handleMouseLeave);
    chartRef.current.addEventListener('mouseenter', handleMouseEnter);
    
    // Initial draw - explicitly pass false to prevent any hover effects on load
    redrawWithTooltip(false);
    
    // Cleanup event listeners
    return () => {
      if (chartRef.current) {
        chartRef.current.removeEventListener('mousemove', handleMouseMove);
        chartRef.current.removeEventListener('mouseleave', handleMouseLeave);
        chartRef.current.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [stock, historicalData]);
  
  // If stock not found
  if (!stock) {
    return (
      <MainLayout>
        <div className="pb-8">
          <div className="flex items-center mb-6">
            <button 
              className="flex items-center mr-4 py-2 px-3 rounded-md hover:bg-opacity-80"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
              onClick={() => router.back()}
            >
              <ChevronLeftIcon className="h-5 w-5 mr-1" style={{ color: 'var(--text-primary)' }} />
              <span style={{ color: 'var(--text-primary)' }}>Back</span>
            </button>
          </div>
          <div 
            className="p-8 text-center rounded-lg border"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
          >
            Stock not found
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const isPositive = stock.change >= 0;
  const trendColor = isPositive ? 'var(--success)' : 'var(--error)';
  
  return (
    <MainLayout>
      <div className="pb-8">
        {/* Back button */}
        <div className="flex items-center mb-6">
          <button 
            className="flex items-center mr-4 py-2 px-3 rounded-md hover:bg-opacity-80"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" style={{ color: 'var(--text-primary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Back</span>
          </button>
        </div>
      
        {/* Stock header and buy/sell buttons */}
        <div 
          className="p-6 rounded-lg mb-6 relative"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div 
                className="w-16 h-16 mr-4 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl font-bold"
                style={{ 
                  backgroundColor: getStockColor(stock.symbol),
                  color: '#FFFFFF',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                {stock.symbol.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{stock.name}</h1>
                <p className="text-md" style={{ color: 'var(--text-secondary)' }}>
                  {stock.symbol} · {stock.sector}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                ${stock.price.toFixed(2)}
              </p>
              <p className="text-lg font-medium mb-3" style={{ color: trendColor }}>
                {stock.change >= 0 ? '+' : ''}{stock.change}%
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  className="px-5 py-2 rounded-md font-medium text-sm transition-all hover:opacity-90 hover:shadow-md flex items-center"
                  style={{ 
                    backgroundColor: 'var(--success)',
                    color: 'var(--text-on-accent)'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTradeModalOpen(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Buy
                </button>
                <button
                  className="px-5 py-2 rounded-md font-medium text-sm transition-all hover:opacity-90 hover:shadow-md flex items-center"
                  style={{ 
                    backgroundColor: 'var(--error)',
                    color: 'var(--text-on-accent)'
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTradeModalOpen(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      
        {/* Two-column layout for chart and key stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Price Chart - takes 2/3 of the width */}
          <div 
            className="p-6 rounded-lg md:col-span-2"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Price History (30 Days)
            </h2>
            <div 
              className="bg-opacity-90 p-4 rounded-lg mb-2 relative"
              style={{ 
                backgroundColor: 'var(--bg-secondary)',
                height: '300px'
              }}
            >
              <canvas 
                ref={chartRef} 
                width="1200" 
                height="500"
                style={{width: '100%', height: '100%'}}
                className="w-full h-full cursor-crosshair"
              ></canvas>
            </div>
            <div className="flex justify-between">
              <button 
                className="px-3 py-1 text-sm rounded flex items-center"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-secondary)' 
                }}
              >
                <ArrowPathIcon className="h-4 w-4 mr-1" />
                Refresh
              </button>
              <div className="flex space-x-2">
                {['1D', '1W', '1M', '3M', '1Y', 'All'].map(period => (
                  <button 
                    key={period}
                    className="px-3 py-1 text-xs rounded"
                    style={{ 
                      backgroundColor: period === '1M' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      color: period === '1M' ? 'var(--text-on-accent)' : 'var(--text-secondary)'
                    }}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Key Statistics - takes 1/3 of the width */}
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Key Statistics
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Market Cap', value: `$${stock.marketCap}B` },
                { label: 'Volume (24h)', value: `${stock.volume}M` },
                { label: '52 Week High', value: `$${(stock.price * (1 + Math.random() * 0.3)).toFixed(2)}` },
                { label: '52 Week Low', value: `$${(stock.price * (1 - Math.random() * 0.3)).toFixed(2)}` },
                { label: 'P/E Ratio', value: (15 + Math.random() * 20).toFixed(2) },
                { label: 'EPS', value: `$${(stock.price / (15 + Math.random() * 20)).toFixed(2)}` },
                { label: 'Dividend Yield', value: `${(Math.random() * 3).toFixed(2)}%` },
                { label: 'Beta', value: (0.5 + Math.random() * 1.5).toFixed(2) },
                { label: 'Shares Outstanding', value: `${(stock.marketCap * 1000 / stock.price).toFixed(2)}M` }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="flex justify-between p-2 rounded"
                  style={{ backgroundColor: 'var(--bg-secondary)' }}
                >
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{stat.label}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      
        {/* Community Insights */}
        <div 
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Community Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User stats */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <div className="flex items-center mb-4">
                <UsersIcon className="h-5 w-5 mr-2" style={{ color: 'var(--accent-primary)' }} />
                <h4 className="text-md font-medium" style={{ color: 'var(--text-primary)' }}>User Ownership</h4>
              </div>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{communityData.usersOwning}</p>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>BOB users own this stock</p>
                </div>
                <div className="text-right">
                  <p 
                    className="text-lg font-bold" 
                    style={{ color: communityData.avgProfitability >= 0 ? 'var(--success)' : 'var(--error)' }}
                  >
                    {communityData.avgProfitability >= 0 ? '+' : ''}{communityData.avgProfitability}%
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Avg. profitability</p>
                </div>
              </div>
              <div 
                className="h-2 rounded-full my-3 relative overflow-hidden"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <div 
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ 
                    backgroundColor: 'var(--accent-primary)',
                    width: `${(communityData.usersOwning / 1000) * 100}%`
                  }}
                ></div>
              </div>
              <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
                {Math.round((communityData.usersOwning / 1000) * 100)}% of active users own {stock.symbol}
              </p>
            </div>
            
            {/* Purchase timeline */}
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <div className="flex items-center mb-4">
                <ClockIcon className="h-5 w-5 mr-2" style={{ color: 'var(--accent-primary)' }} />
                <h4 className="text-md font-medium" style={{ color: 'var(--text-primary)' }}>Purchase Timeline</h4>
              </div>
              <div className="flex items-end h-24 justify-between mb-1">
                {communityData.timeline.map((item, index) => (
                  <div key={index} className="flex flex-col items-center w-1/6">
                    <div 
                      className="w-8 rounded-t-sm"
                      style={{ 
                        height: `${(item.purchases / 500) * 100}%`,
                        backgroundColor: 'var(--accent-primary)',
                        opacity: 0.7 + (index / communityData.timeline.length) * 0.3
                      }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {communityData.timeline.map((item, index) => (
                  <div key={index} className="text-center w-1/6">
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.month}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center mt-3" style={{ color: 'var(--text-tertiary)' }}>
                Most purchases in {communityData.timeline.reduce((max, item) => 
                  item.purchases > max.purchases ? item : max
                ).month}
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Stocks */}
        <div 
          className="p-6 rounded-lg"
          style={{ backgroundColor: 'var(--bg-card)' }}
        >
          <div className="flex items-center mb-4">
            <BuildingOffice2Icon className="h-6 w-6 mr-2" style={{ color: 'var(--accent-primary)' }} />
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Similar {stock.sector} Stocks
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedStocks.map(relatedStock => (
              <StockCard 
                key={relatedStock.id} 
                stock={relatedStock}
                onClick={() => router.push(`/stocks/${relatedStock.symbol}`)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Add the trade modal */}
      {stock && (
        <TradeModal
          stock={stock}
          isOpen={isTradeModalOpen}
          onClose={() => setIsTradeModalOpen(false)}
        />
      )}
    </MainLayout>
  );
} 