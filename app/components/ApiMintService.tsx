'use client';

import { useState } from 'react';
import { Transaction as TransactionModel } from '../models/transaction';

interface ApiMintServiceProps {
  receiverAddress?: string;
  tokenUri: string;
  onTransactionComplete?: (transaction: TransactionModel) => void;
}

export default function ApiMintService({
  receiverAddress,
  tokenUri,
  onTransactionComplete
}: ApiMintServiceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMint = async () => {
    if (!receiverAddress) {
      console.error('Receiver address is missing');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/mint-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver_address: receiverAddress,
          token_uri: tokenUri,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to mint NFT');
      }

      console.log('Success response:', JSON.stringify(data, null, 2));

      // Create a transaction record
      if (onTransactionComplete) {
        // The API response structure can vary, so we need to handle different formats
        let txHash = '';
        let userOpHash = '';

        // Check if the response has a nested data structure
        if (data.data && typeof data.data === 'object') {
          txHash = data.data.tx_hash || '';
          userOpHash = data.data.user_op_hash || '';
        } else if (data.code === 200 && data.data) {
          // Handle the case where data is already at the top level
          txHash = data.tx_hash || '';
          userOpHash = data.user_op_hash || '';
        } else {
          // Direct access if no nesting
          txHash = data.tx_hash || '';
          userOpHash = data.user_op_hash || '';
        }

        console.log('Extracted transaction hash:', txHash);
        console.log('Extracted user op hash:', userOpHash);

        const transaction: TransactionModel = {
          id: txHash || Date.now().toString(),
          tx_hash: txHash,
          user_op_hash: userOpHash,
          receiver_address: receiverAddress,
          token_uri: tokenUri,
          status: 'success',
          created_at: Date.now(),
          updated_at: Date.now(),
        };

        console.log('Created transaction record:', JSON.stringify(transaction, null, 2));

        onTransactionComplete(transaction);
      }

      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');

      // Create a failed transaction record
      if (onTransactionComplete) {
        const transaction: TransactionModel = {
          id: Date.now().toString(),
          tx_hash: '',
          user_op_hash: '',
          receiver_address: receiverAddress,
          token_uri: tokenUri,
          status: 'failed',
          error: err instanceof Error ? err.message : 'An unknown error occurred',
          created_at: Date.now(),
          updated_at: Date.now(),
        };

        onTransactionComplete(transaction);
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <button
          onClick={handleMint}
          disabled={isLoading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Minting...' : 'Mint NFT'}
        </button>

        <div className="text-sm text-gray-500 text-center">
          Gas fees sponsored by OpenEdu Paymaster API
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
