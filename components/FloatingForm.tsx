"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { sendRecommendationEmail } from "@/app/actions/sendEmail";

export default function FloatingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    
    const formData = new FormData(e.currentTarget);
    const result = await sendRecommendationEmail(formData);

    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else if (result.success) {
      setStatus("success");
      setMessage("Recommendation sent successfully!");
      // Reset form after a delay
      setTimeout(() => {
        setIsOpen(false);
        setStatus("idle");
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Form Card */}
      <div 
        className={`mb-4 w-80 sm:w-96 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
          <h3 className="font-semibold text-lg">Suggest a Product</h3>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4 shadow-inner">
                <MessageSquare size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Thank you!</h4>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Your recommendation has been sent.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="productInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name or URL
                </label>
                <textarea
                  id="productInfo"
                  name="productInfo"
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-shadow resize-none"
                  placeholder="https://amazon.com/..."
                ></textarea>
              </div>

              {status === "error" && (
                <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{message}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-600/20"
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Recommendation
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-600/30'} text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95`}
        aria-label="Suggest a product"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
