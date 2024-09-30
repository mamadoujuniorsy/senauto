"use client";

import { useState } from "react";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await fetch("/api/emails", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Email envoyé avec succès !");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("Erreur lors de l'envoi de l'email.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setStatus("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <section className="py-16 max-w-[1440px] mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-10">Contactez-moi</h2>
      <div className="flex flex-col md:flex-row gap-10 items-center">
        {/* Section photo */}
        <div className="flex-1 flex justify-center">
          <Image
            src="/photo.jpg" 
            alt="Mamadou Sy"
            width={300}
            height={300}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Formulaire de contact */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-semibold text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Envoyer
            </button>
            <p className="mt-4 text-center text-gray-700">{status}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
