'use client';

import { useState } from 'react';

const NewsletterSignupPage = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (action: 'subscribe' | 'unsubscribe') => {
    setIsLoading(true);
    try {
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const response = await fetch(`/api/newsletter/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated with Our Newsletter
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Subscribe to get the latest updates, offers, and news directly in your inbox. You can unsubscribe anytime.
          </p>
        </header>

        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleSubmit('subscribe')}
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('unsubscribe')}
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 p-4 rounded-md bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200">
              {message}
            </div>
          )}
        </section>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:text-gray-700 dark:hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-gray-700 dark:hover:text-gray-300">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NewsletterSignupPage;
