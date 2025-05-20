'use client';
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Page() {
  console.log('Rendering SignUp page');
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp 
        appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary: 'bg-purple-600 hover:bg-purple-700',
            footerActionLink: 'text-purple-600 hover:text-purple-700'
          }
        }}
      />
    </div>
  );
}
