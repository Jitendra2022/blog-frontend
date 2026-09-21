import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaCamera, 
  FaEye, 
  FaEyeSlash, 
  FaArrowRight, 
  FaCheckCircle 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Register = () => {
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Enter a valid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    profile: Yup.mixed()
      .required("Profile photo is required")
      .test(
        "fileType",
        "Only JPEG, PNG, JPG, or WebP files are supported",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type)
      )
      .test(
        "fileSize",
        "Profile image must be less than 5MB",
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
  });

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="ambient-glow-indigo top-0 left-0 opacity-40" />
      <div className="ambient-glow-purple bottom-0 right-0 opacity-40" />

      {/* Left Branding Showcase Panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/70 p-12 flex-col justify-between border-r border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/40">
            <HiSparkles className="text-xl" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            InkPulse
          </span>
        </Link>

        <div className="max-w-md space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <HiSparkles className="text-amber-400" />
            <span>Join Our Global Thinkers</span>
          </div>

          <blockquote className="text-3xl font-extrabold text-white leading-snug tracking-tight">
            "Every impactful movement begins with a voice that refuses to remain silent."
          </blockquote>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Full access to weekly technical essays and architecture teardowns</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Personalized profile page and bookmark library</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <FaCheckCircle className="text-emerald-400 shrink-0" />
              <span>Engage in threaded community conversations with top builders</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500">
          © {new Date().getFullYear()} InkPulse. Empowering thoughtful publication worldwide.
        </div>
      </div>

      {/* Right Registration Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <HiSparkles />
              </div>
              <span className="text-xl font-bold text-white">InkPulse</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Create Account
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Enter your details to register as a reader & writer.
              </p>
            </div>

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
                  toast.success(res.data?.message || "Account created successfully!");
                  resetForm();
                  setPreview(null);
                  navigate("/login", { replace: true });
                } catch (err) {
                  console.error(err);
                  toast.error(err.response?.data?.message || "Registration failed. Please try again.");
                }
              }}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FaUser size={13} />
                      </div>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Alex Morgan"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                    </div>
                    <ErrorMessage name="name" component="p" className="text-rose-400 text-xs mt-1" />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FaEnvelope size={13} />
                      </div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="alex@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                    </div>
                    <ErrorMessage name="email" component="p" className="text-rose-400 text-xs mt-1" />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <FaLock size={13} />
                      </div>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      >
                        {showPassword ? <FaEyeSlash size={13} /> : <FaEye size={13} />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-rose-400 text-xs mt-1" />
                  </div>

                  {/* Profile Avatar Upload */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Profile Avatar
                    </label>
                    <div className="flex items-center gap-4">
                      {preview ? (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-indigo-500 shrink-0">
                          <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                          <FaCamera size={18} />
                        </div>
                      )}
                      
                      <label className="flex-1 cursor-pointer">
                        <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition text-center font-medium">
                          Choose an image file
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.currentTarget.files[0];
                            setFieldValue("profile", file);
                            setPreview(file ? URL.createObjectURL(file) : null);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <ErrorMessage name="profile" component="p" className="text-rose-400 text-xs mt-1" />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition cursor-pointer"
                  >
                    <span>{isSubmitting ? "Creating account..." : "Complete Registration"}</span>
                    {!isSubmitting && <FaArrowRight size={12} />}
                  </button>
                </Form>
              )}
            </Formik>

            {/* Switch to Login */}
            <div className="mt-6 pt-5 border-t border-slate-800 text-center text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 ml-1"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
