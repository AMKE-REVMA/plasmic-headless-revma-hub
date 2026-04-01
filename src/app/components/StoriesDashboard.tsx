"use client";
import { useRef, useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import TeacherTestimonials from "./TeacherTestimonials";

export default function StoriesDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get("email");
      const role = formData.get("role");
      const message = formData.get("message");

      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, role, message }),
        });
        const result = await res.json();

        if (result.success) {
          alert(t("ResourcesPage.submissionSuccess"));
          setIsModalOpen(false);
        } else {
          alert(t("ResourcesPage.submissionFailure"));
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-full">
      {/* Teacher Testimonials Section */}
      <TeacherTestimonials />

      {/* Submit Section */}
      <section id="submit" className="bg-white px-6 py-16 text-center border-t border-gray-200 scroll-mt-24">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {t("TeachingRoma.submitSectionTitle")}
          </h2>
          <p className="text-base text-gray-700">
            {t("TeachingRoma.submitSectionText")}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block mt-4 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition-all"
          >
            {t("TeachingRoma.submitButton")}
          </button>
        </div>
      </section>

      {/* Testimonial Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-10 rounded-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="absolute top-4 right-4 text-black font-bold" onClick={() => setIsModalOpen(false)}>✕</button>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="email" name="email" placeholder={t("TeachingRoma.formEmail")} required className="w-full border p-2 rounded" />
              <input type="text" name="role" placeholder={t("TeachingRoma.formRole")} className="w-full border p-2 rounded" />
              <textarea name="message" placeholder={t("TeachingRoma.formMessage")} required className="w-full border p-2 rounded h-24" />
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  {t("TeachingRoma.formCancel")}
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">
                  {t("TeachingRoma.formSubmit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
