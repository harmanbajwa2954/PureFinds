"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { sendRecommendationEmail } from "@/app/actions/sendEmail";

export default function FloatingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Prevent background scroll when form is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    <>
      {/* Backdrop overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end w-full sm:w-auto pointer-events-none">
        {/* Form Card — Bottom sheet on mobile, floating card on desktop */}
        <div 
          className={`w-full sm:w-96 sm:mb-4 sm:mr-0 bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border-t sm:border border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out transform
            sm:rounded-2xl sm:origin-bottom-right
            ${isOpen
              ? 'translate-y-0 opacity-100 sm:scale-100 pointer-events-auto'
              : 'translate-y-full opacity-0 sm:translate-y-8 sm:scale-90 pointer-events-none'
            }`}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-semibold text-lg">Suggest a Product</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 -m-1 rounded-lg active:bg-white/10"
              aria-label="Close suggestion form"
            >
              <X size={22} />
            </button>
          </div>
          
          <div className="p-4 sm:p-5 max-h-[70vh] overflow-y-auto">
            {status === "success" ? (
              <div className="text-center py-6 sm:py-8">
                <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 text-green-600 mb-4 shadow-inner">
                  <MessageSquare size={28} />
                </div>
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Thank you!</h4>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">Your recommendation has been sent.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="floating-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="floating-name"
                    name="name"
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-shadow text-base sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="floating-productInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product Name or URL
                  </label>
                  <textarea
                    id="floating-productInfo"
                    name="productInfo"
                    required
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none transition-shadow resize-none text-base sm:text-sm"
                    placeholder="https://amazon.com/..."
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 active:scale-[0.98] min-h-[48px]"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Sending...
                    </>
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

        {/* Floating Button — Positioned to avoid overlap with product cards */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${
            isOpen
              ? 'hidden sm:flex bg-gray-600 hover:bg-gray-700'
              : 'flex bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-600/30'
          } pointer-events-auto text-white rounded-full p-3.5 sm:p-4 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 m-4 sm:m-0 self-end`}
          aria-label="Suggest a product"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </>
  );
}
