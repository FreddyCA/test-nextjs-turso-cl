"use client";

import React, { useState } from "react";
import { createMessage } from "../lib/actions/createMessageDB";

export default function InputMessages() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message) {
      setError("El mensaje no puede estar vacío.");
      setSuccess("");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("message", message);

      const response = await createMessage(formData);
      if (response.ok) {
        setMessage("");
        setError("");
        setSuccess("Mensaje enviado con éxito!");
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      }
    } catch (error) {
      setError("Error al enviar el mensaje. Inténtalo de nuevo.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div>
        <label
          htmlFor="message"
          className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        >
          Mensaje
        </label>
        <input
          type="text"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Enter your message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`mt-4 w-full text-white bg-purple-700 py-4 ${
          success ? "mb-0" : "mb-6"
        } hover:bg-red-500`}
      >
        {loading ? "Enviando..." : "Enviar mensaje"}
      </button>
      {success && <p className="h-5 mt-1 text-sm text-green-600">{success}</p>}
    </form>
  );
}
