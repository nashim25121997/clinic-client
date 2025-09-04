import { useState } from "react";
import { FaFilePdf, FaUpload } from "react-icons/fa";

export default function ReportsTab() {
  const [files, setFiles] = useState([
    {
      id: 1,
      type: "image",
      url: "https://storage.googleapis.com/kagglesdsdata/datasets/17810/23812/chest_xray/test/NORMAL/IM-0001-0001.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=databundle-worker-v2%40kaggle-161607.iam.gserviceaccount.com%2F20250902%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250902T021855Z&X-Goog-Expires=345600&X-Goog-SignedHeaders=host&X-Goog-Signature=05a6a42434f85e9fc030c714b3f792a79d6dafecbe534f74df569bd494d664ebda226197097f79729a124686eddce0fd5e14118cba1bb21f41a947347e3ff47cb7ccb381a04acc504c52e2a3e1e163e3c2d2b5c870c125ab9a3f7cbf729793f51d0cf5a4c9762d0a2fb7c3f49772cd388282129a4b55fc1dc09628518e3edfb09de9e8213e8458cd587e9d9eecff75a909935558bf29361297ac42341ca7a4c5b18fa4a2a028a0a8c141fe053fe3ab862c94f467fb35419cd47c1e803ed3f9e45fc9c5cb0cc5ecc5b16d16054b9136e1540efc63aba81ad4896b8fd4286bb6915b8d35a305cbbb5da30124b08a1d995b4462be4545e02015e62e57fc1a9497ef",
      note: "Chest X-ray report",
    },
    {
      id: 2,
      type: "pdf",
      url: "/files/report1.pdf",
      note: "Blood Test Report",
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [note, setNote] = useState("");

  const handleUpload = () => {
    if (!newFile) return;
    const type = newFile.type.includes("pdf") ? "pdf" : "image";

    setFiles([
      ...files,
      {
        id: Date.now(),
        type,
        url: URL.createObjectURL(newFile),
        note,
      },
    ]);
    setNewFile(null);
    setNote("");
    setShowUploadModal(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Upload Button */}
      <button
        onClick={() => setShowUploadModal(true)}
        className="btn btn-primary flex items-center gap-2 float-right mb-2"
      >
        <FaUpload /> Upload File
      </button>
      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="border rounded-lg overflow-hidden shadow-sm bg-white"
          >
            <div className="h-40 flex items-center justify-center bg-gray-50">
              {file.type === "image" ? (
                <img
                  src={file.url}
                  alt="report"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <FaFilePdf className="text-red-600 text-5xl" />
              )}
            </div>
            <div className="p-2 text-sm text-gray-600">
              <p className="font-medium">📝 {file.note || "No note"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 !mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Upload Report</h2>

            {/* Drag & Drop / File Input */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              {newFile ? (
                <p className="text-green-600">{newFile.name}</p>
              ) : (
                <p>Drag & drop file here, or click to select</p>
              )}
              <input
                type="file"
                id="fileInput"
                hidden
                accept="image/*,application/pdf"
                onChange={(e) => setNewFile(e.target.files?.[0] || null)}
              />
            </div>

            {/* Note Input */}
            <textarea
              className="input w-full mt-4"
              placeholder="Enter note for this file..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={!newFile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
