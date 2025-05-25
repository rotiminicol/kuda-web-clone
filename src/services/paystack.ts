
// Paystack integration service
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Get Paystack keys from environment
const getPaystackKeys = () => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PK;
  const secretKey = import.meta.env.VITE_PAYSTACK_SK;
  
  if (!publicKey || !secretKey) {
    throw new Error('Paystack keys not found in environment variables');
  }
  
  return { publicKey, secretKey };
};

// Helper function for Paystack API calls
const makePaystackRequest = async (endpoint: string, options: RequestInit = {}) => {
  const { secretKey } = getPaystackKeys();
  
  const response = await fetch(`${PAYSTACK_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${secretKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Paystack API error' }));
    throw new Error(error.message || `Paystack API error: ${response.status}`);
  }

  return response.json();
};

export const paystackService = {
  // Get list of Nigerian banks
  getBanks: async () => {
    try {
      const response = await makePaystackRequest('/bank?country=nigeria');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching banks:', error);
      throw error;
    }
  },

  // Verify account number with bank
  verifyAccount: async (accountNumber: string, bankCode: string) => {
    try {
      const response = await makePaystackRequest(
        `/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`
      );
      return response.data;
    } catch (error) {
      console.error('Error verifying account:', error);
      throw error;
    }
  },

  // Create transfer recipient
  createTransferRecipient: async (data: {
    type: string;
    name: string;
    account_number: string;
    bank_code: string;
    currency?: string;
  }) => {
    try {
      const response = await makePaystackRequest('/transferrecipient', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          currency: data.currency || 'NGN',
        }),
      });
      return response.data;
    } catch (error) {
      console.error('Error creating transfer recipient:', error);
      throw error;
    }
  },

  // Initiate transfer
  initiateTransfer: async (data: {
    amount: number; // Amount in kobo
    recipient: string;
    reason?: string;
    reference?: string;
  }) => {
    try {
      const response = await makePaystackRequest('/transfer', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          source: 'balance',
          reference: data.reference || `transfer_${Date.now()}`,
        }),
      });
      return response.data;
    } catch (error) {
      console.error('Error initiating transfer:', error);
      throw error;
    }
  },

  // Verify transaction
  verifyTransaction: async (reference: string) => {
    try {
      const response = await makePaystackRequest(`/transaction/verify/${reference}`);
      return response.data;
    } catch (error) {
      console.error('Error verifying transaction:', error);
      throw error;
    }
  },

  // Get transaction history
  getTransactions: async (page = 1, perPage = 50) => {
    try {
      const response = await makePaystackRequest(
        `/transaction?page=${page}&perPage=${perPage}`
      );
      return response.data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Initialize payment
  initializePayment: async (data: {
    amount: number; // Amount in kobo
    email: string;
    reference?: string;
    callback_url?: string;
  }) => {
    try {
      const response = await makePaystackRequest('/transaction/initialize', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          reference: data.reference || `payment_${Date.now()}`,
        }),
      });
      return response.data;
    } catch (error) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  },
};

// Utility functions
export const paystackUtils = {
  // Convert Naira to Kobo
  nairaToKobo: (naira: number): number => Math.round(naira * 100),

  // Convert Kobo to Naira
  koboToNaira: (kobo: number): number => kobo / 100,

  // Format amount for display
  formatAmount: (amount: number, currency = '₦'): string => {
    return `${currency}${amount.toLocaleString()}`;
  },

  // Generate reference
  generateReference: (prefix = 'ref'): string => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  },
};
