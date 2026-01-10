import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

const AddPost = () => {
  const [preview, setPreview] = useState(null);

  // ✅ Yup validation schema (5MB max)
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    desc: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileType",
        "Only image files are allowed",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type
          )
      )
      .test(
        "fileSize",
        "Image must be less than 5MB",
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a Post</h2>

      <Formik
        initialValues={{
          title: "",
          desc: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const data = new FormData();
            data.append("title", values.title);
            data.append("desc", values.desc);
            data.append("image", values.image);

            const res = await axiosInstance.post("/blog/create", data);
            toast.success(res.data.message);

            resetForm();
            setPreview(null);
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Field
                name="title"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Field
                as="textarea"
                name="desc"
                rows="4"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="desc"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue("image", file);
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="w-full"
              />
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Image Preview */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-full h-48 object-cover rounded-md border"
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPost;
