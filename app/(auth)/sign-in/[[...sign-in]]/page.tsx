import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function SignInPage() {
  return (
    <SignIn
      appearance={{ baseTheme: dark }}
      redirectUrl="/dashboard"
      afterSignInUrl="/dashboard"
      signUpUrl="/sign-up"
    />
  );
}
