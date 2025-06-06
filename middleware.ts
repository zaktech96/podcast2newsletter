import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import appConfig from './config';

let clerkMiddleware: any, createRouteMatcher: any;

if (appConfig.auth.enabled) {
  try {
    ({ clerkMiddleware, createRouteMatcher } = require('@clerk/nextjs/server'));
  } catch (error) {
    console.warn('Clerk modules not available. Auth will be disabled.');
    appConfig.auth.enabled = false;
  }
}

const isProtectedRoute = appConfig.auth.enabled ? createRouteMatcher(['/dashboard(.*)']) : () => false;
const isOnboardingRoute = appConfig.auth.enabled ? createRouteMatcher(['/onboarding']) : () => false;
const isApiRoute = (req: NextRequest) => req.nextUrl.pathname.startsWith('/api');

// List of allowed origins for CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
];

export default async function middleware(req: NextRequest) {
  // Handle CORS for API routes
  if (isApiRoute(req)) {
    const origin = req.headers.get('origin');
    const response = NextResponse.next();
    
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    } else {
      response.headers.set('Access-Control-Allow-Origin', 'null');
    }
    
    if (req.method === 'OPTIONS') {
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Access-Control-Max-Age', '86400');
      return response;
    }
    
    // For clerk-based auth, proceed with auth check after setting CORS headers
    if (appConfig.auth.enabled) {
      return clerkMiddleware((auth: any) => {
        return response;
      })(req);
    }
    
    return response;
  }

  // Handle non-API routes with clerk middleware if enabled
  if (appConfig.auth.enabled) {
    return clerkMiddleware((auth: any) => {
      const { userId } = auth();
      const path = req.nextUrl.pathname;
      
      // If user is not authenticated and tries to access protected routes
      if (!userId && (isProtectedRoute(req) || isOnboardingRoute(req))) {
        return auth().redirectToSignIn({ returnBackUrl: req.url });
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
    })(req);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};