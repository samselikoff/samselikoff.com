import { A, Spacer, Lead, Container, Title, Head } from "../components/ui";

export default function FramerMotionCoursePage() {
  return (
    <>
      <Head>
        <title>Framer Motion Course</title>
      </Head>

      <div className="break-words md:text-lg-">
        <div className="pt-4 mx-auto max-w-7xl md:pt-6 xl:pt-8">
          <div className="max-w-3xl">
            <Spacer size="xl" />
            <Title>Framer Motion Recipes</Title>
            <Spacer size="lg" />
            <Lead>I've just started working on a brand new video course!</Lead>
            <Lead>
              I'll be teaching you how to build some really slick React
              components with{" "}
              <A href="https://www.framer.com/motion/">Framer Motion</A> in the
              style of the videos from{" "}
              <A href="https://youtube.com/samselikoff">my YouTube channel</A>.
            </Lead>
            <div className="py-4"></div>
            <p className="md:leading-relaxed md:text-lg-">
              For each component, you can expect a step-by-step video
              explanation along with the complete source code. I'll have more
              details soon, but for now email is the easiest way for me to share
              any updates with you, including some behind-the-scenes work and
              even a free video or two!
            </p>
            <p className="mt-4 md:leading-relaxed md:text-lg-">
              If you're interested, enter you email below:
            </p>
            <div className="mt-10 sm:mt-12">
              <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                <div className="sm:flex">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="block w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      className="block w-full px-4 py-3 font-medium text-white rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                    >
                      Start free trial
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                  Start your free 14-day trial, no credit card necessary. By
                  providing your email, you agree to our{" "}
                  <a href="#" className="font-medium text-white">
                    terms of service
                  </a>
                  .
                </p>
              </form>
            </div>
            <Spacer size="lg" />
          </div>
        </div>
      </div>
    </>
  );
}
