import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    profile: Yup.mixed()
      .required("Profile image is required")
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
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          profile: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const data = new FormData();
            data.append("name", values.name);
            data.append("email", values.email);
            data.append("password", values.password);
            data.append("profile", values.profile);
            const res = await axiosInstance.post("/auth/register", data);
            toast.success(res.data.message);
            resetForm();
            setPreview(null);
            navigate("/login", { replace: true });
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Field
                name="name"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue("profile", file);
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="w-full"
              />
              <ErrorMessage
                name="profile"
                component="p"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-48 object-cover rounded-md border"
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
