
import { useMemo, useRef, useState } from "react";
import {
  FileText,
  Upload,
  Search,
  Download,
  Eye,
  Trash2,
  ShieldCheck,
  FolderOpen,
  X,
  FileImage,
  File,
  CalendarDays,
  AlertTriangle,
  Clock,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";

const categories = [
  "All Documents",
  "Passport",
  "Visa",
  "Government ID",
  "Driving Licence",
  "Tickets",
  "Hotel Bookings",
  "Travel Insurance",
  "Medical Documents",
  "Other",
];

// Calculate the number of days remaining until document expiry.
function getDaysRemaining(expiryDate) {
  if (!expiryDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(`${expiryDate}T00:00:00`);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
}

// Return the current expiry status of a document.
function getExpiryStatus(expiryDate) {
  const days = getDaysRemaining(expiryDate);

  if (days === null) return { label: "No expiry date", color: "slate" };
  if (days < 0) return { label: "Expired", color: "red" };
  if (days <= 30) return { label: "Expiring Soon", color: "amber" };

  return { label: "Valid", color: "green" };
}

function Documents() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Documents");
  const [uploadCategory, setUploadCategory] = useState("Passport");
  const [uploadExpiryDate, setUploadExpiryDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);
  const fileInputRef = useRef(null);

  const cardClass = isDark
    ? "border-slate-800 bg-slate-900"
    : "border-slate-200 bg-white";

  const inputClass = isDark
    ? "border-slate-700 bg-slate-900 text-white"
    : "border-slate-300 bg-white text-slate-900";

  const textClass = isDark ? "text-white" : "text-slate-900";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";

  // Filter documents using the selected category and search text.
  const filteredDocuments = useMemo(() => {
    return documents.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Documents" ||
        item.category === selectedCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [documents, selectedCategory, searchTerm]);

  const expiredCount = documents.filter(
    (item) => item.expiryDate && getDaysRemaining(item.expiryDate) < 0
  ).length;

  const expiringSoonCount = documents.filter((item) => {
    const days = getDaysRemaining(item.expiryDate);
    return days !== null && days >= 0 && days <= 30;
  }).length;

  // Handle document uploads with category and expiry information.
  const handleUpload = (event) => {
    const files = Array.from(event.target.files || []);

    const validFiles = files.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type.startsWith("image/")
    );

    const newDocuments = validFiles.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      category: uploadCategory,
      expiryDate: uploadExpiryDate,
      size: (file.size / (1024 * 1024)).toFixed(2),
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toLocaleDateString(),
    }));

    setDocuments((current) => [...newDocuments, ...current]);
    event.target.value = "";
  };

  // Delete a document and release its temporary browser URL.
  const handleDelete = (id) => {
    const item = documents.find((doc) => doc.id === id);

    if (item) {
      URL.revokeObjectURL(item.url);
    }

    setDocuments((current) =>
      current.filter((doc) => doc.id !== id)
    );

    if (previewDocument?.id === id) {
      setPreviewDocument(null);
    }
  };

  // Download the selected document.
  const handleDownload = (item) => {
    const link = window.document.createElement("a");
    link.href = item.url;
    link.download = item.name;
    link.click();
  };

  // Display an icon based on the uploaded file type.
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return <FileImage size={22} />;
    if (type === "application/pdf") return <FileText size={22} />;
    return <File size={22} />;
  };

  // Display an expiry status with an appropriate color.
  const getStatusStyle = (color) => {
    const styles = {
      green: "bg-green-500/10 text-green-500",
      amber: "bg-amber-500/10 text-amber-500",
      red: "bg-red-500/10 text-red-500",
      slate: isDark
        ? "bg-slate-800 text-slate-400"
        : "bg-slate-200 text-slate-600",
    };

    return styles[color];
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <Sidebar />

      <main className="min-h-screen p-5 md:ml-72 md:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Page heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium text-teal-500">
              TRAVEL DOCUMENT MANAGEMENT
            </p>
            <h1 className={`text-3xl font-bold ${textClass}`}>
              My Documents
            </h1>
            <p className={`mt-2 ${mutedClass}`}>
              Keep your important travel documents organized in one place.
            </p>
          </div>

          {/* Upload controls */}
          <div className={`mb-8 rounded-2xl border p-5 ${cardClass}`}>
            <h2 className={`mb-4 text-lg font-semibold ${textClass}`}>
              Upload a Document
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={`mb-2 block text-sm ${mutedClass}`}>
                  Document Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(event) => setUploadCategory(event.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500 ${inputClass}`}
                >
                  {categories
                    .filter((category) => category !== "All Documents")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className={`mb-2 block text-sm ${mutedClass}`}>
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  value={uploadExpiryDate}
                  min={new Date().toLocaleDateString("en-CA")}
                  onChange={(event) => setUploadExpiryDate(event.target.value)}
                  className={`w-full rounded-xl border px-4 py-3 outline-none focus:border-teal-500 ${inputClass}`}
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-white transition hover:bg-teal-600"
                >
                  <Upload size={19} />
                  Upload Documents
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />

            <p className={`mt-3 text-xs ${mutedClass}`}>
              Supported formats: PDF, JPG, PNG and other image formats.
            </p>
          </div>

          {/* Document statistics */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <FolderOpen className="mb-3 text-teal-500" size={25} />
              <p className={`text-sm ${mutedClass}`}>Total Documents</p>
              <h2 className={`mt-1 text-3xl font-bold ${textClass}`}>
                {documents.length}
              </h2>
            </div>

            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <FileText className="mb-3 text-blue-500" size={25} />
              <p className={`text-sm ${mutedClass}`}>Categories</p>
              <h2 className={`mt-1 text-3xl font-bold ${textClass}`}>
                {new Set(documents.map((item) => item.category)).size}
              </h2>
            </div>

            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <Clock className="mb-3 text-amber-500" size={25} />
              <p className={`text-sm ${mutedClass}`}>Expiring Soon</p>
              <h2 className="mt-1 text-3xl font-bold text-amber-500">
                {expiringSoonCount}
              </h2>
            </div>

            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <AlertTriangle className="mb-3 text-red-500" size={25} />
              <p className={`text-sm ${mutedClass}`}>Expired Documents</p>
              <h2 className="mt-1 text-3xl font-bold text-red-500">
                {expiredCount}
              </h2>
            </div>
          </div>

          {/* Expiry reminder panel */}
          {(expiredCount > 0 || expiringSoonCount > 0) && (
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={21} />
                <h2 className="font-semibold text-amber-500">
                  Document Expiry Reminders
                </h2>
              </div>

              <div className="space-y-2">
                {documents
                  .filter((item) => {
                    const days = getDaysRemaining(item.expiryDate);
                    return days !== null && days <= 30;
                  })
                  .map((item) => {
                    const days = getDaysRemaining(item.expiryDate);

                    return (
                      <p key={item.id} className={`text-sm ${textClass}`}>
                        <strong>{item.name}</strong>
                        {" — "}
                        {days < 0
                          ? `Expired ${Math.abs(days)} days ago`
                          : days === 0
                          ? "Expires today"
                          : `Expires in ${days} days`}
                      </p>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Search and category filter */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${mutedClass}`}
                size={19}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search documents..."
                className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-teal-500 ${inputClass}`}
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className={`rounded-xl border px-4 py-3 outline-none focus:border-teal-500 ${inputClass}`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Document list */}
          <div className={`rounded-2xl border p-5 ${cardClass}`}>
            <div className="mb-5">
              <h2 className={`text-xl font-semibold ${textClass}`}>
                Your Documents
              </h2>
              <p className={`mt-1 text-sm ${mutedClass}`}>
                Upload and manage your travel-related files.
              </p>
            </div>

            {filteredDocuments.length === 0 ? (
              <div
                className={`rounded-xl border border-dashed px-5 py-14 text-center ${
                  isDark ? "border-slate-700" : "border-slate-300"
                }`}
              >
                <FolderOpen
                  className="mx-auto mb-4 text-slate-400"
                  size={42}
                />
                <h3 className={`text-lg font-semibold ${textClass}`}>
                  No documents found
                </h3>
                <p className={`mt-2 text-sm ${mutedClass}`}>
                  Upload your passport, visa, tickets or other travel documents.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((item) => {
                  const status = getExpiryStatus(item.expiryDate);
                  const days = getDaysRemaining(item.expiryDate);

                  return (
                    <div
                      key={item.id}
                      className={`flex flex-col justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center ${
                        isDark
                          ? "border-slate-800 bg-slate-950"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="rounded-xl bg-teal-500/10 p-3 text-teal-500">
                          {getFileIcon(item.type)}
                        </div>

                        <div className="min-w-0">
                          <h3 className={`truncate font-semibold ${textClass}`}>
                            {item.name}
                          </h3>
                          <p className={`mt-1 text-sm ${mutedClass}`}>
                            {item.category} · {item.size} MB
                          </p>
                          <p className={`mt-1 text-xs ${mutedClass}`}>
                            Uploaded: {item.uploadedAt}
                          </p>
                          <p className={`mt-1 flex items-center gap-1 text-xs ${mutedClass}`}>
                            <CalendarDays size={13} />
                            {item.expiryDate
                              ? `Expiry: ${item.expiryDate}`
                              : "Expiry date not provided"}
                          </p>
                          {item.expiryDate && (
                            <p className={`mt-2 text-xs font-medium ${
                              status.color === "red"
                                ? "text-red-500"
                                : status.color === "amber"
                                ? "text-amber-500"
                                : "text-green-500"
                            }`}>
                              {days < 0
                                ? `Expired ${Math.abs(days)} days ago`
                                : days === 0
                                ? "Expires today"
                                : days <= 30
                                ? `Expires in ${days} days`
                                : "Document is valid"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(status.color)}`}
                        >
                          {status.label}
                        </span>

                        <button
                          onClick={() => setPreviewDocument(item)}
                          title="Preview"
                          className={`rounded-lg p-2.5 ${mutedClass} ${
                            isDark ? "bg-slate-800" : "bg-slate-200"
                          }`}
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDownload(item)}
                          title="Download"
                          className={`rounded-lg p-2.5 ${mutedClass} ${
                            isDark ? "bg-slate-800" : "bg-slate-200"
                          }`}
                        >
                          <Download size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Delete"
                          className="rounded-lg bg-red-500/10 p-2.5 text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Security information */}
          <div
            className={`mt-6 rounded-xl border border-teal-500/20 p-4 ${
              isDark ? "bg-teal-500/5" : "bg-teal-50"
            }`}
          >
            <div className="flex gap-3">
              <ShieldCheck className="shrink-0 text-teal-500" size={22} />
              <div>
                <h3 className="font-semibold text-teal-600">
                  Document Security
                </h3>
                <p className={`mt-1 text-sm ${mutedClass}`}>
                  This is currently a frontend demonstration. Uploaded files
                  remain in the current browser session and are not yet stored
                  in encrypted permanent storage. Expiry reminders are displayed
                  inside this page only. Automatic notifications will be added
                  during backend integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Document preview modal */}
      {previewDocument && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
            <div className="flex items-center justify-between gap-4 border-b border-slate-700 p-4">
              <h3 className="truncate font-semibold text-white">
                {previewDocument.name}
              </h3>
              <button
                onClick={() => setPreviewDocument(null)}
                className="rounded-lg p-2 text-slate-300 hover:bg-slate-800"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex max-h-[75vh] min-h-64 items-center justify-center overflow-auto bg-slate-950 p-4">
              {previewDocument.type.startsWith("image/") ? (
                <img
                  src={previewDocument.url}
                  alt={previewDocument.name}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              ) : (
                <iframe
                  src={previewDocument.url}
                  title={previewDocument.name}
                  className="h-[70vh] w-full rounded-lg bg-white"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;
