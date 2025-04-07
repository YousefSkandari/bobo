                          {/* Add "Repair needed" sign for rundown buildings - with animation */}
                          {isRundown && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md animate-pulse"
                              style={{ 
                                backgroundColor: 'var(--error)',
                                color: 'var(--text-on-accent)'
                              }}
                            >
                              !
                            </div>
                          )}

                          {/* Enhanced building tooltip with more info and styling */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 p-4 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none border backdrop-blur-sm"
                            style={{ 
                              backgroundColor: 'rgba(var(--bg-card-rgb), 0.85)', 
                              borderColor: isRundown ? 'var(--error)' : 'var(--accent-primary)',
                              maxHeight: '400px',
                              overflow: 'auto'
                            }}
                          >
                            {/* Tooltip content */}
                          </div>

                          {/* Building label with glow effect */} 