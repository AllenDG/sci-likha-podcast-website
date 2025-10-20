import { useState } from "react";
import { X, Upload, Image as ImageIcon, Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ContentItem } from "../ContentManagement";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: Omit<ContentItem, "id">) => void;
}

type ContentType = "episode" | "gallery" | null;

const AddContentModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddContentModalProps) => {
  const [step, setStep] = useState<"select" | "form">("select");
  const [contentType, setContentType] = useState<ContentType>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    releaseDate: "",
    description: "",
    assessmentUrl: "",
    createdBy: "",
    imageFile: null as File | null,
    videoFile: null as File | null,
    duration: "",
  });

  const handleReset = () => {
    setStep("select");
    setContentType(null);
    setTags([]);
    setCurrentTag("");
    setFormData({
      title: "",
      category: "",
      releaseDate: "",
      description: "",
      assessmentUrl: "",
      createdBy: "",
      imageFile: null,
      videoFile: null,
      duration: "",
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

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, videoFile: file });

      // Get video duration
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setFormData((prev) => ({
          ...prev,
          duration: `${minutes}:${seconds.toString().padStart(2, "0")}`,
        }));
      };
      video.src = URL.createObjectURL(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageFile: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const episodeId = `EP${Date.now().toString().slice(-8)}`;

    const newContent: Omit<ContentItem, "id"> = {
      episodeId,
      title: formData.title,
      category: formData.category,
      releaseDate: formData.releaseDate,
      text: formData.duration || "Gallery",
      type: contentType as "episode" | "gallery",
      ...(contentType === "episode" && {
        description: formData.description,
        tags: tags,
        assessmentUrl: formData.assessmentUrl,
      }),
      ...(contentType === "gallery" && {
        createdBy: formData.createdBy,
        imageUrl: formData.imageFile
          ? URL.createObjectURL(formData.imageFile)
          : "",
      }),
    };

    onSubmit(newContent);
    handleClose();
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
            // Type Selection
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
                      Add images to your gallery carousel
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
                      Add a new podcast episode with details
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Episode Form */}
              {contentType === "episode" && (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter episode title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>

                  {/* Category & Release Date */}
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

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Release Date <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.releaseDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            releaseDate: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Enter episode description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <Input
                        type="text"
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddTag())
                        }
                        className="flex-1 px-4 py-3 rounded-xl"
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:text-blue-900"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Video Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Upload Video <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-emerald-500 transition-colors">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        required
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                          <Upload className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {formData.videoFile
                              ? formData.videoFile.name
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500">
                            MP4, MOV, AVI up to 500MB
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Duration (Auto-populated) */}
                  {formData.duration && (
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Duration (Auto-detected)
                      </label>
                      <Input
                        type="text"
                        value={formData.duration}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-50"
                      />
                    </div>
                  )}

                  {/* Assessment URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Assessment URL
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com/assessment"
                      value={formData.assessmentUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assessmentUrl: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>
                </>
              )}

              {/* Gallery Form */}
              {contentType === "gallery" && (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter gallery title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>

                  {/* Category & Release Date */}
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

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        Release Date <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="date"
                        value={formData.releaseDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            releaseDate: e.target.value,
                          })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Created By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Created By <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter creator name"
                      value={formData.createdBy}
                      onChange={(e) =>
                        setFormData({ ...formData, createdBy: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 rounded-xl"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Upload Image <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                          <Upload className="w-8 h-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            {formData.imageFile
                              ? formData.imageFile.name
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </label>
                    </div>
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
