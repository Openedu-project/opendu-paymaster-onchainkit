'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import WalletConnectFallback from './components/WalletConnectFallback';

const features = [
  {
    title: 'Gasless Transactions',
    description: 'Mint NFTs without paying gas fees using Coinbase Paymaster technology',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  },
  {
    title: 'Base Sepolia Network',
    description: 'Built on Base Sepolia testnet, perfect for testing and development',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
      </svg>
    )
  },
  {
    title: 'OpenEdu Integration',
    description: 'Custom paymaster service built by OpenEdu for educational NFTs',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
      </svg>
    )
  },
];

export default function App() {
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
            <a href="https://openedu.net/en" className="text-gray-600 hover:text-blue-600 hidden md:block">About OpenEdu</a>
            <a href="https://developer.coinbase.com" className="text-gray-600 hover:text-blue-600 hidden md:block">Coinbase Developer</a>
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <div className="inline-block mb-6 bg-blue-700 bg-opacity-50 px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Powered by Coinbase Paymaster</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">NFT Minting Demo</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Experience gasless NFT minting on Base Sepolia network using Coinbase Paymaster technology,
              integrated with OpenEdu&apos;s custom paymaster service.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <a href="/mint" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition duration-300 animate-pulse">
                Mint Free NFT Now
              </a>
              <a href="https://openedu.net/en" className="bg-transparent hover:bg-blue-500 text-white border-2 border-white font-bold py-4 px-8 rounded-lg transition duration-300">
                Learn About OpenEdu
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This demo showcases how users can mint NFTs without paying gas fees,
                using Coinbase Paymaster technology integrated with OpenEdu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Steps Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Use This Demo</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to experience gasless NFT minting
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    1
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-600">
                    Click the connect button in the top right corner to connect your wallet.
                    Make sure you&apos;re on the Base Sepolia network.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center mb-12 gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    2
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">Click &quot;Mint Free NFT Now&quot;</h3>
                  <p className="text-gray-600">
                    Navigate to the minting page by clicking the button. You&apos;ll be able to
                    mint an NFT without paying any gas fees.
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    3
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold mb-2">No Transaction Confirmation Needed</h3>
                  <p className="text-gray-600">
                    The transaction will be processed automatically without requiring your confirmation.
                    The gas fees are covered by the OpenEdu paymaster service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technical Details</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This demo uses the following technologies
              </p>
            </div>
            <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Coinbase Paymaster</h3>
                <p className="text-gray-600 mb-4">
                  Coinbase Paymaster enables gasless transactions by allowing a third party (the paymaster)
                  to pay for transaction fees on behalf of users.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <code className="text-sm text-gray-800">
                    NEXT_PUBLIC_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base-sepolia/....
                  </code>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Base Sepolia Testnet</h3>
                <p className="text-gray-600 mb-4">
                  This demo runs on Base Sepolia, a testnet for Ethereum&apos;s Layer 2 scaling solution.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">OpenEdu Custom Paymaster</h3>
                <p className="text-gray-600 mb-4">
                  OpenEdu has built a custom paymaster service that integrates with Coinbase Paymaster
                  to enable gasless NFT minting for educational purposes.
                </p>
                <div className="bg-gray-100 p-4 rounded">
                  <code className="text-sm text-gray-800">
                    OPENEDU_API_ENDPOINT=https://opendu-paymaster-production.up.railway.app/api/v1/mint-nft
                  </code>
                </div>
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
