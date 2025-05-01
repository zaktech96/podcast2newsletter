import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import appConfig from './config';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import type { NextFetchEvent } from 'next/server';

const isProtectedRoute = appConfig.auth.enabled ? createRouteMatcher(['/dashboard(.*)']) : () => false;
const isOnboardingRoute = appConfig.auth.enabled ? createRouteMatcher(['/onboarding']) : () => false;
const isApiRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/api');

// List of allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  // Add more trusted domains if needed
];

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Handle CORS for API routes
  if (isApiRoute(request)) {
    const origin = request.headers.get('origin');
    
    // Create base response
    const response = NextResponse.next();
    
    // Always allow the built-in frontend to access the API
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    // Only allow specified origins
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    } else {
      // For non-allowed origins, set origin to null (blocks the request in browsers)
      response.headers.set('Access-Control-Allow-Origin', 'null');
    }
    
    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Access-Control-Max-Age', '86400'); // 24 hours
      
      return response;
    }
  }

  // Handle all routes with clerk middleware if enabled
  if (appConfig.auth.enabled) {
    return clerkMiddleware((auth, req, evt) => {
      const userId = auth().userId;
      const path = req.nextUrl.pathname;
      
      // If user is not authenticated and tries to access protected routes
      if (!userId && (isProtectedRoute(req) || isOnboardingRoute(req))) {
        return auth().redirectToSignIn();
      }
      
      // User is authenticated
      if (userId) {
        // Check if user is trying to access the sign-in or sign-up pages
        if (path.startsWith('/sign-in') || path.startsWith('/sign-up')) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        
        // If user is going to home page and is authenticated, redirect them to dashboard
        if (path === '/') {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }
      
      return NextResponse.next();
    })(request, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
