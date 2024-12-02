"use client";
import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { toast } from "sonner";
import app from "../../../lib/FirebaseConfigue";

const AddNewCard = ({ editData }) => {
  const [formData, setFormData] = useState({
    productName: editData?.productName || "",
    category: editData?.category || "",
    tagline: editData?.tagline || "",
    description: editData?.description || "",
    url: editData?.url || "",
    imageUrl: editData?.imageUrl || "",
    pricing: editData?.pricing || "",
    keyFeatures: editData?.keyFeatures || "",
    howToUse: editData?.howToUse || "",
    videoUrl: editData?.videoUrl || "",
  });

  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUrl = (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewImage(URL.createObjectURL(image));
      setFormData((prevData) => ({ ...prevData, imageUrl: image }));
    }
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert("Please upload an image.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const storage = getStorage(app);
      const storageRef = ref(storage, "images/" + formData.imageUrl.name);
      await uploadBytes(storageRef, formData.imageUrl);
      const downloadURL = await getDownloadURL(storageRef);

      const payload = {
        ...formData,
        imageUrl: downloadURL,
        keyFeatures: formData.keyFeatures
          .split(",")
          .map((feature) => feature.trim()),
      };

      const token = localStorage.getItem("token");

      if (editData && editData !== null) {
        const response = await axios.put(
          `http://localhost:5000/aitools/update/${editData._id}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        toast.success("Card updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:5000/aitools/save",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        toast.success("Card added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      category: "",
      tagline: "",
      description: "",
      url: "",
      imageUrl: null,
      pricing: "",
      keyFeatures: "",
      howToUse: "",
      videoUrl: "",
    });
    setPreviewImage("");
  };

  useEffect(() => {
    if (editData && editData.imageUrl) {
      setPreviewImage(editData.imageUrl);
    } else {
      setPreviewImage("");
    }
  }, [editData]);

  return (
    <div className="py-10">
      <div className="mb-4 text-center space-y-3">
        <a
          href="/"
          className="text-white text-[13px] border p-3 rounded-md transition-all font-medium ease-in-out duration-200 hover:bg-white hover:text-black"
        >
          ← Back to home
        </a>
        <h1 className="text-[35px] font-semibold text-white">
          Submit a listing
        </h1>
      </div>
      <form
        onSubmit={handleUploadImage}
        className="modal-content h-full mx-auto w-[60%] bg-[#1D1B30] p-8 rounded-md overflow-hidden"
      >
        {[
          { name: "productName", label: "Product Name" },
          { name: "category", label: "Category" },
          { name: "tagline", label: "Tagline" },
          { name: "description", label: "Description", multiline: true },
          { name: "url", label: "URL" },
          { name: "pricing", label: "Pricing" },
          { name: "keyFeatures", label: "Key Features (comma separated)" },
          { name: "howToUse", label: "How to Use", multiline: true },
          { name: "videoUrl", label: "Video URL" },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-white mb-1" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.multiline ? "textarea" : "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#0C0A20] text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ height: field.multiline ? "80px" : "auto" }}
            />
          </div>
        ))}

        <div className="p-2 border shadow-md rounded-md w-1/2 mx-auto overflow-hidde">
          <label
            htmlFor="file-upload"
            className="cursor-pointer relative mx-auto bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden"
          >
            {!previewImage ? (
              <div className="text-center h-48 flex flex-col items-center justify-center">
                <div className="text-4xl text-blue-600 font-bold">+</div>
                <p className="text-gray-500 mt-1">Upload Image</p>
              </div>
            ) : (
              <img
                src={editData?.imageUrl || previewImage}
                alt="Preview"
                className="h-full w-full object-contain"
              />
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageUrl}
            className="hidden"
          />
          {previewImage && (
            <button
              onClick={() => setPreviewImage("")}
              type="button"
              className="text-center border w-full bg-red-600 rounded py-1 mt-1 font-medium text-white"
            >
              Change Image
            </button>
          )}
          {error && <p className="error-text">{error}</p>}
        </div>
        <Button
          type="submit"
          variant="contained"
          color={!editData ? "success" : "primary"}
          disabled={uploading}
          fullWidth
          sx={{
            textTransform: "capitalize",
            mt: 2,
          }}
        >
          {uploading ? (
            <CircularProgress size={24} />
          ) : editData ? (
            "Update"
          ) : (
            "Submit"
          )}{" "}
          Card
        </Button>
      </form>
    </div>
  );
};

export default AddNewCard;
