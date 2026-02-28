"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would send the data to your backend here
    try {
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          placeholder={t("name")}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          placeholder={t("email")}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
          placeholder={t("message")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors transform hover:scale-105 disabled:transform-none disabled:hover:scale-100 shadow-lg"
      >
        {status === "sending" ? t("sending") : t("send")}
      </button>

      {status === "success" && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg">
          {t("success")}
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
          {t("error")}
        </div>
      )}
    </form>
  );
}
