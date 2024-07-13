import { getMessages } from "../lib/actions/getMessagesDB";
export const runtime = "edge";

export default async function ListMessages() {
  let messages = [];

  try {
    messages = await getMessages();
  } catch (error) {
    console.error("Error fetching messages:", error);
    return (
      <div className="mt-8 text-red-600">
        Error al cargar los mensajes. Inténtalo de nuevo más tarde.
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="mt-8 text-gray-700">No hay mensajes disponibles.</div>
    );
  }

  return (
    <>
      <ul className="mt-8 space-y-4 overflow-y-auto">
        {messages.map(({ id, message }) => (
          <li
            key={id}
            className="rounded-md border border-gray-200 p-2 text-sm text-gray-700"
          >
            {message}
          </li>
        ))}
      </ul>
    </>
  );
}
