'use client';

import { useState, useEffect } from 'react';

export default function WalletConnectFallback() {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Check for WalletConnect errors in the console
    const originalError = console.error;
    console.error = (...args) => {
      const errorMessage = args.join(' ');
      if (errorMessage.includes('WalletConnect') || errorMessage.includes('not been authorized')) {
        setShowError(true);
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  if (!showError) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-red-600">WalletConnect Error</h2>
        <p className="mb-4">
          There was an issue with WalletConnect authorization. This is likely because the WalletConnect Project ID is not properly configured.
        </p>
        <p className="mb-4">
          To fix this issue:
        </p>
        <ol className="list-decimal pl-5 mb-4 space-y-2">
          <li>Get a valid WalletConnect Project ID from <a href="https://cloud.walletconnect.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WalletConnect Cloud</a></li>
          <li>Add <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">localhost</code> to the list of allowed domains</li>
          <li>Update your <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">.env.local</code> file with the new Project ID</li>
          <li>Restart your development server</li>
        </ol>
        <div className="flex justify-end">
          <button 
            onClick={() => setShowError(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
