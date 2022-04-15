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
        <title>Framer Motion Course</title>
      </Head>

      <div className="">
        {/* Top section */}
        <div className="px-4 mx-auto max-w-7xl">
          <div className="pt-4">
            <p className="font-bold leading-none text-gray-800 uppercase text-xxs ">
              <span className="px-2 py-1 text-blue-500 rounded bg-blue-50">
                video course
              </span>
            </p>
            <h1 className="mt-4 text-6xl font-bold text-gray-800 leading-tighter">
              Framer Motion <span className="text-blue-500">Recipes</span>
            </h1>

            <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-2xl">
              I'm working on a new course where I'll be teaching you how to
              build some really slick React components with{" "}
              <A href="https://www.framer.com/motion/">Framer Motion</A>!
            </p>
            <p className="mt-4 text-lg text-gray-700 md:text-xl lg:text-2xl">
              By the end you'll have a set of robust, beautiful components that
              you can use in your own apps and tweak to your heart's content.
            </p>
          </div>
        </div>

        {/* Picture */}
        <div className="px-4 mt-12">
          <div
            className="relative mt-2 overflow-hidden rounded-lg"
            style={{ aspectRatio: `${16 / 9}` }}
          >
            <Image
              layout="fill"
              objectFit="cover"
              quality={100}
              src="/images/framer-motion-course/sam-edit-2.jpg"
            />
          </div>
          <p className="px-8 pt-2 text-xs font-medium text-center text-white">
            The videos will be shot and taught in the style of <br />
            <a
              className="font-bold text-white border-b border-blue-300"
              href="https://www.youtube.com/samselikoff"
            >
              my YouTube channel
            </a>
            .
          </p>
        </div>

        {/* Form */}
        <div className="px-4 pt-40 pb-40 -mt-24 text-white bg-blue-500">
          <h2 className="text-4xl font-bold leading-tight ">
            Ready to follow along?
          </h2>

          <div className="p-4 mt-16 text-gray-700 bg-white rounded-lg shadow-lg">
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
                  <p>
                    Sign up for <strong>behind-the-scenes work</strong> and get{" "}
                    <strong>two free videos</strong> when the course is ready:
                  </p>
                  <form className="pt-4" {...formProps}>
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
                      isSubmitting || isComplete ? "bg-blue-600" : "bg-blue-500"
                    }
                  `}
                      >
                        Sign up
                      </button>
                    </div>
                    {isError && (
                      <div className="mt-3 text-red-500">
                        Oh no, something's wrong with our signup form 😔. Please
                        try again.
                      </div>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pt-12">
          <h2 className="text-4xl font-bold leading-tight ">
            Meet your teachers
          </h2>

          <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-2xl">
            Me and my friend Ryan can't wait to teach this course because Framer
            Motion is one of our favorite libraries, and this kind of UI polish
            is always something people want to add to their apps but never have
            the time.
          </p>

          <div className="pt-8 pb-8">
            <div
              className="relative overflow-hidden rounded-lg"
              style={{ aspectRatio: `${16 / 9}` }}
            >
              <Image
                layout="fill"
                objectFit="cover"
                quality={100}
                src="/images/framer-motion-course/sam-and-ryan.jpeg"
              />
            </div>
          </div>

          <p className="text-lg text-gray-700 md:text-xl lg:text-2xl">
            Over the years we've run conference trainings, worked on open
            source, and these days we make videos for{" "}
            <A href="https://www.youtube.com/c/RyanToronto">each</A> of{" "}
            <A href="https://www.youtube.com/c/SamSelikoff">our</A> YouTube
            channels.
          </p>

          <div className="grid grid-cols-2 py-12">
            <div className="text-center">
              <a href="https://twitter.com/samselikoff">
                <Image
                  quality={100}
                  width={64}
                  height={64}
                  className="overflow-hidden rounded-full "
                  src="/images/framer-motion-course/twitter-sam.jpg"
                />
                <p className="block text-xs font-semibold text-gray-800 underline">
                  @samselikoff
                </p>
              </a>
            </div>
            <div className="text-center">
              <a href="https://twitter.com/ryantotweets">
                <Image
                  quality={100}
                  width={64}
                  height={64}
                  className="overflow-hidden rounded-full"
                  src="/images/framer-motion-course/twitter-ryan.jpg"
                />
                <p className="block text-xs font-semibold text-gray-800 underline">
                  @ryantotweets
                </p>
              </a>
            </div>
          </div>

          <p className="pb-12 text-lg text-gray-700 md:text-xl lg:text-2xl">
            We can't wait to build some awesome Framer Motion components
            together!
          </p>
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
