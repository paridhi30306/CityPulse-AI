import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock3,
} from "lucide-react";

function Contact() {
  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50">

      {/* Hero */}

      <div className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            Contact CityPulse AI
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            We’re Here to Help
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Have a question, suggestion, or need help with a complaint?
            Get in touch with the CityPulse AI team.
          </p>

        </div>

      </div>

      {/* Contact Section */}

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Contact Information */}

          <div className="rounded-3xl bg-blue-700 p-8 text-black shadow-sm sm:p-10">

            <h2 className="text-2xl font-extrabold">
              Get in Touch
            </h2>

            <p className="mt-3 leading-7 text-blue-100">
              Our team is available to help with platform-related
              questions, complaint tracking, and general feedback.
            </p>

            <div className="mt-8 space-y-6">

              {/* Email */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={21} />
                </div>

                <div>
                  <p className="font-semibold">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-blue-100">
                    support@citypulseai.com
                  </p>
                </div>

              </div>

              {/* Phone */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone size={21} />
                </div>

                <div>
                  <p className="font-semibold">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-blue-100">
                    +91 1800 123 4567
                  </p>
                </div>

              </div>

              {/* Location */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={21} />
                </div>

                <div>
                  <p className="font-semibold">
                    Office
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-100">
                    Municipal Services Center
                    <br />
                    Prayagraj, Uttar Pradesh
                  </p>
                </div>

              </div>

              {/* Hours */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Clock3 size={21} />
                </div>

                <div>
                  <p className="font-semibold">
                    Support Hours
                  </p>

                  <p className="mt-1 text-sm text-blue-100">
                    Monday – Friday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Contact Form */}

          <div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10">

            <h2 className="text-2xl font-extrabold text-navy">
              Send Us a Message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the form and our team will get back to you.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message submitted successfully!");
              }}
              className="mt-7 space-y-5"
            >

              {/* Name */}

              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Your Name *
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Email */}

              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Email Address *
                </label>

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Subject */}

              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Subject *
                </label>

                <input
                  type="text"
                  required
                  placeholder="What is your message about?"
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Message */}

              <div>

                <label className="text-sm font-semibold text-slate-700">
                  Message *
                </label>

                <textarea
                  required
                  rows={5}
                  placeholder="Write your message..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-semibold text-black shadow-lg shadow-blue-900/20 transition hover:bg-blue-800"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;