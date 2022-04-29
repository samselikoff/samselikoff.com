import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { A, Spacer, Lead, Container, Title, Head } from "../components/ui";
import { AnimatePresence, motion } from "framer-motion";

export default function FramerMotionCoursePage() {
  let { isSubmitting, isComplete, isError, formProps } = useCovertKitForm({
    formId: "3179275", // framer motion course form id
  });

  let signUpForm = useRef();

  return (
    <>
      <Head>
        <title>Craft cutting-edge UIs with Framer Motion</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@samselikoff" />
        <meta
          name="twitter:title"
          content="Craft cutting-edge UIs with Framer Motion"
        />
        <meta
          name="twitter:description"
          content="Learn how to use React and Framer Motion to pull off the polished UI interactions you see on sites like Stripe and Linear."
        />
        <meta
          name="twitter:image"
          content="https://samselikoff.com/images/framer-motion-course/cover.jpg"
        />
      </Head>

      <div
        className="flex-1 w-full -mt-px border-t border-gray-200"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="max-w-xl p-4 mx-auto lg:max-w-6xl lg:grid lg:grid-cols-2">
          {/* Top section */}
          <div className="xl:px-4">
            <div className="">
              <div className="px-4 mx-auto sm:pt-8">
                <div className="pt-4 lg:pt-8">
                  <div className="flex space-x-3">
                    <a
                      href="https://twitter.com/samselikoff"
                      className="block w-16 h-16 overflow-hidden rounded-full"
                    >
                      <Image
                        src="/images/profile.jpeg"
                        width={985}
                        height={985}
                      />
                    </a>
                    <a
                      href="https://twitter.com/ryantotweets"
                      className="block w-16 h-16 overflow-hidden rounded-full"
                    >
                      <Image src="/images/ryan.jpeg" width={985} height={985} />
                    </a>
                  </div>
                  <p className="mt-4 text-4xl font-bold leading-tight text-gray-800">
                    Craft cutting-edge UIs with Framer Motion
                  </p>
                  <p className="mt-4 text-lg text-gray-600 md:text-xl lg:mt-6 lg:text-2xl xl:mt-8"></p>
                  <div className="max-w-xl mx-auto mt-8">
                    <p className="mt-4 text-gray-700 lg:text-lg">
                      Subscribe for behind-the-scenes updates, free content
                      previews, and more as me and Ryan work on{" "}
                      <strong>Framer Motion Recipes</strong> — a course we're
                      creating that will teach you how to build the sort of
                      cutting-edge UI interactions you see on sites like Stripe
                      and in beautiful native applications like Things.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="pb-20 mt-8 lg:mt-32 lg:ml-12">
            <div className="px-4 mx-auto xl:px-0">
              <div className="p-4 mt-4 text-gray-700 bg-white border border-gray-100 rounded-lg shadow-xl sm:p-8 sm:mt-6 lg:mt-8">
                <AnimatePresence initial={false} exitBeforeEnter>
                  {isComplete ? (
                    <motion.div
                      key="allDone"
                      initial="hidden"
                      animate="showing"
                      exit="hidden"
                      transition={{
                        ease: "easeInOut",
                      }}
                      variants={{
                        hidden: {
                          height: signUpForm.current
                            ? signUpForm.current.offsetHeight
                            : "auto",
                          opacity: 0,
                        },
                        showing: {
                          height: "auto",
                          opacity: 1,
                        },
                      }}
                    >
                      <h3 className="font-semibold text-gray-900">All set!</h3>
                      <p className="pt-3 text-gray-700">
                        Thanks for subscribing! Please check your inbox for a
                        confirmation email.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signupForm"
                      ref={signUpForm}
                      initial="hidden"
                      animate="showing"
                      exit="hidden"
                      transition={{
                        ease: "easeOut",
                      }}
                      variants={{
                        hidden: {
                          opacity: 0,
                        },
                        showing: {
                          opacity: 1,
                        },
                      }}
                    >
                      <form className="" {...formProps}>
                        <input
                          name="email_address"
                          type="email"
                          required
                          placeholder="Enter your email"
                          className="w-full px-5 py-3 text-gray-700 placeholder-gray-600 border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
                        />
                        <div className="mt-3">
                          <button
                            type="submit"
                            disabled={isSubmitting || isComplete}
                            className={`
                        block w-full px-8 py-3 font-semibold text-white  border border-transparent rounded-md shadow focus:outline-none focus:border-blue-100
                        ${
                          isSubmitting || isComplete
                            ? "bg-blue-600 opacity-50"
                            : "bg-blue-500"
                        }
                      `}
                          >
                            Subscribe
                          </button>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-600">
                            I'll never share your information, and you can
                            unsubscribe at any time.
                          </p>
                        </div>
                        {isError && (
                          <div className="mt-3 text-red-500">
                            Oh no, something's wrong with our signup form 😔.
                            Please try again.
                          </div>
                        )}
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function useCovertKitForm({ formId }) {
  let url = `https://app.convertkit.com/forms/${formId}/subscriptions`;
  let [email, setEmail] = useState("");
  let [isError, setIsError] = useState(false);
  let [formState, setFormState] = useState("");

  let isSubmitting = formState === "submitting";
  let isComplete = formState === "complete";

  useEffect(() => {
    window.toggleNewsletter = () => {
      setEmail("ryanto@gmail.com");
      setFormState((state) => (state !== "complete" ? "complete" : ""));
    };
  });

  let handleSubmit = async function (event) {
    event.preventDefault();
    let form = event.target;
    let value = form.email_address.value;

    setFormState("submitting");

    let formData = new FormData(form);

    try {
      let response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsError(false);
        setEmail(value);
        setFormState("complete");
      } else {
        setIsError(true);
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
    }
  };

  let formProps = {
    onSubmit: handleSubmit,
    method: "POST",
    action: url,
  };

  return {
    formProps,
    email,
    isError,
    isComplete,
    isSubmitting,
  };
}

function TwitterLogo(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-3.594-1.555c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 3.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 4.557z" />
    </svg>
  );
}
