import { fetchCustomers } from "../lib/getData";
import FormInvoice from "../ui/formInvoice";

export default async function InvoicePage() {
  const responseCustomers = await fetchCustomers();
  return (
    <main style={{ padding: "2rem" }}>
      <FormInvoice customers={responseCustomers} />
    </main>
  );
}
