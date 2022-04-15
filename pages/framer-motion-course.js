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
        <div className="xl:px-4">
          <div className="">
            {/* Top section */}
            <div className="max-w-xl px-4 mx-auto sm:pt-8 lg:max-w-2xl xl:px-0 xl:max-w-3xl">
              <div className="pt-4 lg:pt-8">
                <p className="font-bold leading-none text-gray-800 uppercase text-xxs ">
                  <span className="px-2 py-1 text-blue-500 rounded bg-blue-50">
                    video course
                  </span>
                </p>
                <h1 className="mt-4 text-6xl font-bold text-gray-800 leading-tighter lg:leading-none xl:text-7xl">
                  Framer Motion <span className="text-blue-500">Recipes</span>
                </h1>
                <p className="mt-4 text-lg text-gray-700 md:text-xl lg:mt-6 lg:text-1-5xl xl:mt-8">
                  I'm working on a new course where I'll be teaching you how to
                  build some really slick React components with{" "}
                  <A href="https://www.framer.com/motion/">Framer Motion</A>!
                </p>
                <p className="mt-4 text-lg text-gray-700 md:text-xl lg:text-1-5xl xl:mt-6">
                  By the end you'll have a set of robust, beautiful components
                  that you can use in your own apps and tweak to your heart's
                  content.
                </p>
              </div>
            </div>
            {/* Picture */}
            <div className="max-w-2xl px-4 mx-auto mt-12 lg:mt-16 lg:max-w-3xl xl:max-w-5xl">
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
              <p className="px-8 pt-2 text-xs font-medium text-center text-white sm:text-sm ">
                The videos will be shot and taught in the style of{" "}
                <br className="sm:hidden" />
                <a
                  className="font-bold text-white border-b border-blue-300"
                  href="https://www.youtube.com/samselikoff"
                >
                  my YouTube channel
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="pt-40 pb-40 -mt-24 text-white bg-blue-500 sm:pt-48 sm:pb-32 lg:-mt-48 lg:pt-72 xl:pt-80">
          <div className="max-w-xl px-4 mx-auto lg:max-w-2xl xl:px-0 xl:max-w-3xl">
            <h2 className="text-4xl font-bold leading-tight lg:text-4-5xl xl:text-5xl">
              Ready to follow along?
            </h2>
            <div className="p-4 mt-8 text-gray-700 bg-white rounded-lg shadow-lg sm:p-8 sm:mt-6 lg:mt-8 lg:text-xl">
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
                      I'll have more details soon, but you can sign up now to
                      get <strong>behind-the-scenes updates</strong> and even{" "}
                      <strong>a free video or two</strong> once the course is
                      ready:
                    </p>
                    <form className="pt-5" {...formProps}>
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
                          ? "bg-blue-600"
                          : "bg-blue-500"
                      }
                    `}
                        >
                          Sign up
                        </button>
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

        {/* Footer */}
        <div className="max-w-xl px-4 pt-12 pb-16 mx-auto sm:pt-16 lg:max-w-2xl lg:pt-20 lg:pb-20 xl:pb-28 xl:max-w-3xl">
          <h2 className="text-4xl font-bold leading-tight lg:text-4-5xl xl:text-5xl">
            Meet your teachers
          </h2>

          <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-1-5xl xl:mt-8">
            Hey there! I'm{" "}
            <A href="https://twitter.com/samselikoff">Sam Selikoff</A> and I'll
            be teaching this course along with my friend{" "}
            <A href="https://twitter.com/ryantotweets">Ryan Toronto</A>.
          </p>

          <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-1-5xl">
            We co-host <A href="https://frontendfirst.fm/">Frontend First</A>,
            make videos for each of our{" "}
            <A href="https://www.youtube.com/c/SamSelikoff">YouTube</A>{" "}
            <A href="https://www.youtube.com/c/RyanToronto">channels</A>, and
            work on <A href="https://github.com/samselikoff">open</A>{" "}
            <A href="https://github.com/ryanto">source</A> together.{" "}
          </p>

          <div className="py-8 sm:py-12 sm:-mx-6 xl:-mx-12">
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

          <p className="text-lg text-gray-700 md:text-xl lg:text-1-5xl">
            We want to teach this course because animation is something folks
            get super excited about but can have a hard time implementing on
            their own.
          </p>

          <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-1-5xl">
            So we're focused on making components that you'll not only
            understand, but also be able to <em>actually use and customize</em>{" "}
            in your own applications.
          </p>

          {/* <div className="grid grid-cols-2 py-12">
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
          </div> */}

          <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-1-5xl">
            We can't wait to show you what we've been working on!
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
