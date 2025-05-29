'use client';
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 animate-fade-in">
      <div className="mb-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-900 dark:text-white text-center animate-slide-down">
          Join Podcast2Newsletter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-md animate-fade-in">
          Create your free account and start turning podcasts into beautiful newsletters.
        </p>
      </div>
      <div className="w-full max-w-md animate-fade-in">
        <SignUp
          afterSignUpUrl="/add-podcast"
          afterSignInUrl="/add-podcast"
          signInUrl="/sign-in"
        />
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-slide-down {
          animation: slideDown 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
