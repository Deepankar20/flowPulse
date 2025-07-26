// components/ClerkButtons.tsx
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { dark } from "@clerk/themes"; // Import the dark theme
import { LogIn } from "lucide-react";

export default function ClerkButtons() {
  return (
    <header className="flex items-center space-x-4">
      <SignedOut>
        <SignInButton mode="modal" appearance={{ baseTheme: dark }}>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors">
            <LogIn size={16} />
            <span className="font-medium">Sign In</span>
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton
          afterSignOutUrl="/signin"
          appearance={{
            variables: {
              colorPrimary: "#3b82f6",
              colorText: "#ffffff",
              colorBackground: "#1f2937",
              // colorAlphaShade: "#374151",
            },
            elements: {
              userButtonTrigger:
                "w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 " +
                "rounded-lg flex items-center justify-center shadow-lg " +
                "hover:shadow-xl transition-shadow",
              userButtonPopoverCard:
                "bg-gray-800 border border-gray-700 shadow-2xl",
              userButtonPopoverActionButton:
                "text-gray-300 hover:bg-gray-700/50 transition-colors",
              userButtonPopoverActionButtonIcon: "text-gray-400",
              userButtonPopoverActionText: "text-gray-300",
              userButtonPopoverFooter:
                "bg-gray-800 border-t border-gray-700/70",
            },
          }}
        />
      </SignedIn>
    </header>
  );
}
