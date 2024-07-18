export type CustomerField = {
  id: string;
  name: string;
};

export type CreateInvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export const initialState: CreateInvoiceState = {
    errors: {
      customerId: [],
      amount: [],
      status: [],
    },
    message: "",
  };
