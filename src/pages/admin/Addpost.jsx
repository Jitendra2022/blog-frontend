import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { 
  FaCloudUploadAlt, 
  FaEye, 
  FaPenFancy, 
  FaCalendarAlt, 
  FaClock, 
  FaArrowRight, 
  FaCheck 
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const AddPost = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters")
      .required("Title is required"),
    desc: Yup.string()
      .min(10, "Article content must be at least 10 characters")
      .required("Article content is required"),
    image: Yup.mixed()
      .required("Featured banner image is required")
      .test(
        "fileType",
        "Only image formats (JPEG, PNG, JPG, WebP) are allowed",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type)
      )
      .test(
        "fileSize",
        "Image size must be less than 5MB",
        (value) => value && value.size <= 5 * 1024 * 1024
      ),
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-2">
          <HiSparkles />
          <span>Authoring Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Publish a New Story
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Craft high-impact articles with real-time card preview.
        </p>
      </div>

      <Formik
        initialValues={{
          title: "",
          desc: "",
          image: null,
          category: "Web Dev",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const data = new FormData();
            data.append("title", values.title);
            data.append("desc", values.desc);
            data.append("image", values.image);
            if (values.category) data.append("category", values.category);

            const res = await axiosInstance.post("/blog/create", data);
            toast.success(res.data?.message || "Article published successfully!");
            resetForm();
            setPreview(null);
            navigate("/");
          } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Something went wrong while publishing.");
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Authoring Form (7 cols) */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
              <Form className="space-y-6">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Headline / Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="e.g. Modern Architecture Patterns in Next.js & React 19"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />
                  <ErrorMessage name="title" component="p" className="text-rose-400 text-xs mt-1" />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Primary Category
                  </label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition cursor-pointer"
                  >
                    <option value="Web Dev">Web Dev</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="UI/UX Architecture">UI/UX Architecture</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Career & Culture">Career & Culture</option>
                  </Field>
                </div>

                {/* Description / Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Article Content
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {values.desc ? values.desc.length : 0} characters
                    </span>
                  </div>
                  <Field
                    as="textarea"
                    name="desc"
                    rows="6"
                    placeholder="Write your article insights, takeaways, and explanations here..."
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition leading-relaxed"
                  />
                  <ErrorMessage name="desc" component="p" className="text-rose-400 text-xs mt-1" />
                </div>

                {/* Image Banner Upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Featured Banner Image
                  </label>
                  <div className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-6 text-center transition bg-slate-900/50">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        setFieldValue("image", file);
                        setPreview(file ? URL.createObjectURL(file) : null);
                      }}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                        <FaCloudUploadAlt size={24} />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Click to select banner photo
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        PNG, JPG, or WebP up to 5MB
                      </p>
                    </label>
                  </div>
                  <ErrorMessage name="image" component="p" className="text-rose-400 text-xs mt-1" />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 transition cursor-pointer"
                >
                  <FaPenFancy size={13} />
                  <span>{isSubmitting ? "Publishing Story..." : "Publish Article to Feed"}</span>
                </button>
              </Form>
            </div>

            {/* Right: Live Card Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                <FaEye className="text-indigo-400" />
                <span>Live Feed Card Preview</span>
              </div>

              <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <div className="h-48 w-full bg-slate-900 relative overflow-hidden">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 p-4">
                      <FaCloudUploadAlt size={32} />
                      <span className="text-xs mt-2">No image selected yet</span>
                    </div>
                  )}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                    {values.category || "Technology"}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt size={10} className="text-indigo-400" />
                      Today
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="flex items-center gap-1">
                      <FaClock size={10} className="text-purple-400" />
                      {values.desc ? `${Math.max(1, Math.ceil(values.desc.split(/\s+/).length / 35))} min read` : "3 min read"}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-2">
                    {values.title || "Your Engaging Article Title Will Appear Here"}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {values.desc || "Your article's opening summary and key takeaways will be previewed right here to attract readers on the main feed."}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                    <span>Read Article</span>
                    <FaArrowRight size={10} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </Formik>
    </div>
  );
};

export default AddPost;
