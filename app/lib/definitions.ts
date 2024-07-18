export type CustomerField = {
  id: string;
  name: string;
};

// Estado inicial para errores o mensajes de éxito
// export const initialState = {
//   message: "",
//   errors: {
//     customerId: "",
//     amount: "",
//     status: "",
//   },
// };

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
