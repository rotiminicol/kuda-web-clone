
// Base API configuration
const AUTH_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:Ye7qAxAj';
const API_BASE_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:kQC-7-zf';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const data = await response.json();
    if (data.authToken) {
      localStorage.setItem('authToken', data.authToken);
    }
    return data;
  },

  signup: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    // Generate account number for new user
    const accountNumber = generateAccountNumber();
    
    const signupData = {
      ...userData,
      name: `${userData.firstName} ${userData.lastName}`,
      accountNumber,
      balance: 20000, // Starting balance of 20k
    };

    const response = await fetch(`${AUTH_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Signup failed' }));
      throw new Error(error.message || 'Signup failed');
    }
    
    const data = await response.json();
    if (data.authToken) {
      localStorage.setItem('authToken', data.authToken);
    }
    return data;
  },

  getMe: async () => {
    return makeRequest(`${AUTH_BASE_URL}/auth/me`);
  },

  updateBalance: async (newBalance: number) => {
    return makeRequest(`${AUTH_BASE_URL}/auth/me`, {
      method: 'PATCH',
      body: JSON.stringify({ balance: newBalance }),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },
};

// Transaction API
export const transactionAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/transaction`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/transaction/${id}`),
  create: (data: {
    type: 'debit' | 'credit';
    amount: number;
    description: string;
    recipient?: string;
    reference?: string;
  }) => makeRequest(`${API_BASE_URL}/transaction`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/transaction/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/transaction/${id}`, {
    method: 'DELETE',
  }),
};

// Card API
export const cardAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/card`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/card/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/card`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/card/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/card/${id}`, {
    method: 'DELETE',
  }),
};

// Bill API
export const billAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/bill`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/bill/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/bill`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/bill/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/bill/${id}`, {
    method: 'DELETE',
  }),
};

// Notification API
export const notificationAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/notification`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/notification/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/notification`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/notification/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/notification/${id}`, {
    method: 'DELETE',
  }),
};

// User Settings API
export const userSettingAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/user_setting`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/user_setting/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/user_setting`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/user_setting/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/user_setting/${id}`, {
    method: 'DELETE',
  }),
};

// User Session API
export const userSessionAPI = {
  getAll: () => makeRequest(`${API_BASE_URL}/user_session`),
  getById: (id: string) => makeRequest(`${API_BASE_URL}/user_session/${id}`),
  create: (data: any) => makeRequest(`${API_BASE_URL}/user_session`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => makeRequest(`${API_BASE_URL}/user_session/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => makeRequest(`${API_BASE_URL}/user_session/${id}`, {
    method: 'DELETE',
  }),
};

// Paystack API integration
export const paystackAPI = {
  getBanks: async () => {
    const response = await fetch('https://api.paystack.co/bank', {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SK}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch banks');
    }
    
    return response.json();
  },

  verifyAccount: async (accountNumber: string, bankCode: string) => {
    const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SK}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to verify account');
    }
    
    return response.json();
  },

  initiateTransfer: async (transferData: {
    amount: number;
    recipient: string;
    reason?: string;
    reference?: string;
  }) => {
    const response = await fetch('https://api.paystack.co/transfer', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_PAYSTACK_SK}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transferData),
    });
    
    if (!response.ok) {
      throw new Error('Transfer failed');
    }
    
    return response.json();
  },
};

// Utility function to generate account numbers
const generateAccountNumber = (): string => {
  // Generate 10-digit account number starting with 1234 for Kuda
  const prefix = '1234';
  const suffix = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return prefix + suffix;
};
