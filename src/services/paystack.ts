
const PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SK;
const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PK;

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccountVerification {
  account_number: string;
  account_name: string;
  bank_id: number;
}

export const paystackService = {
  async getBanks(): Promise<Bank[]> {
    try {
      const response = await fetch('https://api.paystack.co/bank', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch banks');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching banks:', error);
      throw error;
    }
  },

  async verifyAccount(accountNumber: string, bankCode: string): Promise<AccountVerification> {
    try {
      const response = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to verify account');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error verifying account:', error);
      throw error;
    }
  },
};
