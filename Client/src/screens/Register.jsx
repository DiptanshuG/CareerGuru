import React, { useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    mobileNumber: "",
    position: "",
    experience: "Fresher",
    companyName: "",
    workLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate(); // Add this line to use the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        formData
      );
      setLoading(false);
      console.log({ response });
      const data = response.data;
      toast.success(`${data.message}`);

      // Navigate to VerifyOTP component with the email prop
      if (data.message) {
        navigate("/verify", { state: { email: formData.email } });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);

      if (error.response && error.response.status === 404) {
        toast.error("API endpoint not found. Please check your server configuration.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registration Form
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                onChange={handleChange}
                value={formData.fullName}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                onChange={handleChange}
                value={formData.email}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                onChange={handleChange}
                value={formData.password}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="sr-only">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                required
                onChange={handleChange}
                value={formData.mobileNumber}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mobile Number"
              />
            </div>
            <div>
              <label htmlFor="position" className="sr-only">
                Position
              </label>
              <input
                id="position"
                name="position"
                type="text"
                required
                onChange={handleChange}
                value={formData.position}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Position"
              />
            </div>
            <div>
              <label htmlFor="experience" className="sr-only">
                Experience
              </label>
              <select
                id="experience"
                name="experience"
                required
                onChange={handleChange}
                value={formData.experience}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              >
                <option value="Fresher">Fresher</option>
                <option value="Experience">Experience</option>
              </select>
            </div>
            <div>
              <label htmlFor="companyName" className="sr-only">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                required
                onChange={handleChange}
                value={formData.companyName}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label htmlFor="workLocation" className="sr-only">
                Work Location
              </label>
              <input
                id="workLocation"
                name="workLocation"
                type="text"
                required
                onChange={handleChange}
                value={formData.workLocation}
                className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Work Location"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? (
                <TailSpin color="#fff" height={20} width={20} />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};


export default Register;
