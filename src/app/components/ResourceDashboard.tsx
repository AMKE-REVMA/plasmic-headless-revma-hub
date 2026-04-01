"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../../lib/queries";
import client from "../../../lib/apollo";
import { useTranslation } from "../context/TranslationContext";
import Resources from "./Resources";

export default function ResourceDashboard() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { data, loading, error, refetch } = useQuery(GET_RESOURCES, { client });
  const { t } = useTranslation();
  const [selectedModalCategories, setSelectedModalCategories] = useState<string[]>([]);

  const categories = [
    { title: t("ResourcesPage.categoryInclusive"), summary: t("ResourcesPage.categoryInclusiveDesc"), img: "/inclusivity.png", tag: "inclusive practices" },
    { title: t("ResourcesPage.categoryLinguistics"), summary: t("ResourcesPage.categoryLinguisticsDesc"), img: "/translator.png", tag: "linguistics" },
    { title: t("ResourcesPage.categoryRomaHistory"), summary: t("ResourcesPage.categoryRomaHistoryDesc"), img: "/history.png", tag: "roma history" },
    { title: t("ResourcesPage.categoryClassroom"), summary: t("ResourcesPage.categoryClassroomDesc"), img: "/training.png", tag: "classroom activities" },
    { title: t("ResourcesPage.categoryGame"), summary: t("ResourcesPage.categoryGameDesc"), img: "/play.png", tag: "interactive game" },
    { title: t("ResourcesPage.categoryPlatform"), summary: t("ResourcesPage.categoryPlatformDesc"), img: "/platform.png", tag: "teaching platform" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const response = await fetch("/api/send-resource-email", {
      method: "POST",
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        description: formData.get("description"),
        resource_type: selectedModalCategories.join(", "),
        file_link: formData.get("file_link"),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert(t("ResourcesPage.submissionSuccess"));
      setIsModalOpen(false);
      setSelectedModalCategories([]);
    } else {
      alert(t("ResourcesPage.submissionFailure"));
    }    
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedModalCategories([]);
    }
  }, [isModalOpen]);

  return (
    <div className="w-full">
      {/* Category Icons */}
      <section id="categories" className="max-w-8xl mx-auto px-4 scroll-mt-24">
        <div className="flex justify-center flex-wrap gap-x-16 gap-y-8 text-center text-xs">
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.includes(item.tag)
                    ? prev.filter((tag) => tag !== item.tag)
                    : [...prev, item.tag]
                );
              }}
              className={`flex flex-col items-center w-[160px] p-4 rounded transition transform ${
                selectedCategories.includes(item.tag) ? "bg-yellow-100" : "hover:bg-yellow-100"
              }`}
            >
              <img src={item.img} alt={item.title} className="mb-2" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
              <p className="font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-500 text-xs leading-tight">{item.summary}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Search */}
      <section id="search" className="px-6 max-w-6xl mx-auto mt-8 scroll-mt-24">
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("ResourcesPage.search")}
            className="w-full py-3 pl-6 pr-12 border border-black rounded-full shadow-sm placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
        </div>
      </section>

      {/* Filter Tags */}
      <section id="filters" className="px-6 max-w-6xl mx-auto space-y-6 text-sm mt-8 scroll-mt-24">
        <h2 className="text-lg font-bold">{t("ResourcesPage.filterTitle")}</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setSelectedCategories([])}
            className={`px-4 py-1 rounded-full border border-black font-semibold tracking-wide transition ${
              selectedCategories.length === 0 ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"
            }`}
          >
            {t("ResourcesPage.filterAll")}
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.includes(cat.tag) ? prev.filter((tag) => tag !== cat.tag) : [...prev, cat.tag]
                );
              }}
              className={`px-4 py-1 rounded-full border border-black font-semibold tracking-wide transition ${
                selectedCategories.includes(cat.tag) ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamic Resources from WP */}
      <section id="results" className="px-4 py-5 mt-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <Resources searchQuery={searchQuery} selectedCategory={selectedCategories} data={data} loading={loading} error={error} refetch={refetch} />
        </div>
      </section>

      {/* Submit CTA */}
      <section id="submit" className="bg-white px-6 py-16 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("ResourcesPage.submitTitle")}</h2>
          <p className="text-base text-gray-700 mb-6">{t("ResourcesPage.submitText")}</p>
          <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition">
            {t("ResourcesPage.submitButton")}
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white p-10 rounded-lg w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-black font-bold" onClick={() => setIsModalOpen(false)}>✕</button>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="first_name" placeholder={t("ResourcesPage.modalFirstName")} required className="w-full border p-2 rounded" />
              <input type="text" name="last_name" placeholder={t("ResourcesPage.modalLastName")} required className="w-full border p-2 rounded" />
              <input type="email" name="email" placeholder={t("ResourcesPage.modalEmail")} required className="w-full border p-2 rounded" />
              <textarea name="description" placeholder={t("ResourcesPage.modalDescription")} required className="w-full border p-2 rounded h-24" />
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  {t("ResourcesPage.modalCancel")}
                </button>
                <button type="submit" className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">
                  {t("ResourcesPage.modalSubmit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
