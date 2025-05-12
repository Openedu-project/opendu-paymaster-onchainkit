'use client';

import { useState } from 'react';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect
} from '@coinbase/onchainkit/wallet';
import {
  Avatar,
  Name,
  Identity,
  Address,
  EthBalance
} from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import ApiMintService from '../components/ApiMintService';
import WalletConnectFallback from '../components/WalletConnectFallback';
import { Transaction } from '../models/transaction';

export default function MintPage() {
  const { address, isConnected } = useAccount();
  // Use fixed values for tokenUri and receiverAddress
  const tokenUri = 'https://brown-interesting-eel-440.mypinata.cloud/ipfs/bafkreihh5xmatthhijqeyf7ga2je6q7tox757ss7jhdjkmcqazrmohuwnu';
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransactionComplete = (transaction: Transaction) => {
    console.log('Transaction completed:', JSON.stringify(transaction, null, 2));
    setTransactions(prev => [transaction, ...prev]);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <WalletConnectFallback />
      <header className="pt-4 pr-4">
        <div className="flex justify-end">
          <div className="wallet-container">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8">OpenEdu Paymaster Mint</h1>

          {isConnected ? (
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Mint an NFT with Sponsored Gas</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Click the button below to mint an NFT with gas fees sponsored by OpenEdu Paymaster API.
              </p>

              <ApiMintService
                tokenUri={tokenUri}
                receiverAddress={address}
                onTransactionComplete={handleTransactionComplete}
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4">Connect your wallet to mint NFTs with sponsored gas</p>
              <div className="inline-block">
                <ConnectWallet>
                  Connect Wallet
                </ConnectWallet>
              </div>
            </div>
          )}

          {transactions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transaction Hash</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Receiver</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              tx.status === 'success'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : tx.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {tx.tx_hash && tx.tx_hash.length > 2 ? (
                              <a
                                href={`https://sepolia.basescan.org/tx/${tx.tx_hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                {tx.tx_hash.substring(0, 10)}...
                              </a>
                            ) : (
                              <span className="text-gray-500">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {tx.receiver_address.substring(0, 10)}...
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Back to Home
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
