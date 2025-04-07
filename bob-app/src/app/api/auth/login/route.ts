import { NextRequest, NextResponse } from 'next/server';
import authService from '@/lib/auth-service';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validate request
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Attempt login with auth service
    const user = authService.login(email, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Return user data
    return NextResponse.json({
      user,
      message: 'Login successful'
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
} 