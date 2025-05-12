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
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
      <WalletConnectFallback />
      <header className="py-4 px-6 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">OE</span>
            </div>
            <h1 className="text-xl font-bold text-blue-600">OpenEdu NFT Demo</h1>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
            <a href="https://openedu.net/en" className="text-gray-600 hover:text-blue-600 hidden md:block">About OpenEdu</a>
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
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-block mb-6 bg-blue-700 bg-opacity-50 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Gasless NFT Minting</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mint Your Free NFT</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Experience the power of gasless transactions with Coinbase Paymaster technology.
              No gas fees, no hassle - just connect your wallet and mint!
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              {isConnected ? (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-center">Ready to Mint Your NFT</h2>
                  <p className="mb-8 text-gray-600 text-center">
                    Click the button below to mint an NFT with gas fees sponsored by OpenEdu Paymaster API.
                    No transaction confirmation needed - we handle everything for you!
                  </p>

                  <div className="flex justify-center mb-8">
                    <ApiMintService
                      tokenUri={tokenUri}
                      receiverAddress={address}
                      onTransactionComplete={handleTransactionComplete}
                    />
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>This is a demo with a free backend that may be in sleep mode. If it doesn&apos;t work on the first try, please wait a moment and try again. The backend needs to wake up from sleep mode.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h2 className="text-2xl font-bold mb-6">Connect Your Wallet to Continue</h2>
                  <p className="mb-8 text-gray-600">
                    To mint your free NFT, you need to connect your wallet first.
                    Make sure you&apos;re on the Base Sepolia network.
                  </p>
                  <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                    <ConnectWallet>
                      Connect Wallet
                    </ConnectWallet>
                  </div>
                </div>
              )}

              {transactions.length > 0 && (
                <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-6 text-center">Your Transactions</h2>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Hash</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receiver</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {transactions.map((tx) => (
                            <tr key={tx.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  tx.status === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : tx.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-red-100 text-red-800'
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
                                    className="text-blue-600 hover:text-blue-800"
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
                <a href="/" className="inline-block bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition duration-300">
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xs">OE</span>
              </div>
              <span className="font-semibold">OpenEdu NFT Demo</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://openedu.net/en" className="hover:text-blue-400 text-sm">About OpenEdu</a>
              <a href="https://developer.coinbase.com/products/paymaster" className="hover:text-blue-400 text-sm">Coinbase Paymaster</a>
              <a href="https://base.org" className="hover:text-blue-400 text-sm">Base Network</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} OpenEdu. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2 md:mt-0">Demo for educational purposes only</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
