import "./TranslationPage.scss";
import React, { useState, useEffect, useRef } from "react";
import api from "../../api";

const TranslationPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3005/api/translate", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "translated_file.xlsx";
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        console.error("Translation failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Excel for Translation</h1>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload and Translate
      </button>
    </div>
  );
};

export default TranslationPage;