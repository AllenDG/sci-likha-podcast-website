import { useState } from "react";
import { X, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { crud } from "../../../../../api/index";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

type ContentType = "episode" | "gallery" | null;

const AddContentModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddContentModalProps) => {
  const [step, setStep] = useState<"select" | "form">("select");
  const [contentType, setContentType] = useState<ContentType>(null);

  // Form states
  const [formData, setFormData] = useState({
    id: "",
    episode_id: "",
    title: "",
    category: "",
    description: "",
    content: "", // Url of video or gallery
    created_by: "",
    type: "",
    assessment_url: "",
  });

  const handleReset = () => {
    setStep("select");
    setContentType(null);
    setFormData({
      id: "",
      episode_id: "",
      title: "",
      category: "",
      description: "",
      content: "", // Url of video or gallery
      created_by: "",
      type: "",
      assessment_url: "",
    });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleTypeSelect = (type: ContentType) => {
    setContentType(type);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct payload for API
    const payload = {
      episode_id: `EP${Date.now().toString().slice(-8)}`,
      title: formData.title,
      category: formData.category,
      type: contentType, // "episode" or "gallery"
      description: contentType === "episode" ? formData.description : "Gallery",
      created_by: formData.created_by || null,
      assessment_url: contentType === "episode" ? formData.assessment_url : null,
      content: formData.content,
    };

    try {
      // Call your CRUD function to create the post
      await crud.create("/v1/content/create-post", payload);

      onSubmit(); // Refresh content list in parent
      handleClose(); // Reset form and close modal
    } catch (error) {
      console.error("Error creating content post:", error);
      alert("Failed to create content post.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {step === "select"
              ? "Add New Content"
              : `Add ${contentType === "episode" ? "Episode" : "Gallery"} Post`}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === "select" ? (
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => handleTypeSelect("gallery")}
                className="group p-10 border-2 border-gray-200 rounded-3xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-purple-100 group-hover:bg-purple-200 rounded-3xl flex items-center justify-center transition-colors">
                    <ImageIcon className="w-12 h-12 text-purple-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Gallery Post
                    </h3>
                    <p className="text-sm text-gray-600">
                      Add images via URL
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleTypeSelect("episode")}
                className="group p-10 border-2 border-gray-200 rounded-3xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-blue-100 group-hover:bg-blue-200 rounded-3xl flex items-center justify-center transition-colors">
                    <Video className="w-12 h-12 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Episode Post
                    </h3>
                    <p className="text-sm text-gray-600">
                      Add a video via URL
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={`Enter ${contentType} title`}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="">Select category</option>
                    <option value="General Biology">General Biology</option>
                    <option value="Cell Biology">Cell Biology</option>
                    <option value="Plant Biology">Plant Biology</option>
                    <option value="Metabolism">Metabolism</option>
                    <option value="Ecology">Ecology</option>
                  </select>
                </div>
              </div>

              {/* Episode Specific */}
              {contentType === "episode" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Enter episode description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Video URL <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com/video.mp4"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Assessment URL
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com/assessment"
                      value={formData.assessment_url}
                      onChange={(e) =>
                        setFormData({ ...formData, assessment_url: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Gallery Specific */}
              {contentType === "gallery" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Created By <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter creator name"
                      value={formData.created_by}
                      onChange={(e) =>
                        setFormData({ ...formData, created_by: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Image URL <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  onClick={() => setStep("select")}
                  className="flex-1 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl font-medium"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-4 text-white font-semibold hover:opacity-90 transition-opacity rounded-xl"
                  style={{ backgroundColor: "#163409" }}
                >
                  Create {contentType === "episode" ? "Episode" : "Gallery"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;
