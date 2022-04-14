import Image from "next/image";
import { A, Spacer, Lead, Container, Title, Head } from "../components/ui";

export default function FramerMotionCoursePage() {
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
            className="relative w-full mt-2 overflow-hidden rounded-lg"
            style={{ aspectRatio: `${16 / 9}` }}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src="/images/framer-motion-course/image1.jpeg"
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
        <div className="px-4 pt-40 pb-48 -mt-24 text-white bg-blue-500">
          <h2 className="text-4xl font-bold leading-tight ">
            Ready to follow along?
          </h2>

          <div className="p-4 mt-8 text-gray-700 bg-white rounded-lg shadow-lg">
            <p>
              Sign up for <strong>behind-the-scenes work</strong> and get{" "}
              <strong>two free videos</strong> when the course is ready:
            </p>

            <form className="pt-4" action="">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-3 text-gray-700 placeholder-gray-600 border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
              />
              <div className="mt-3">
                <button
                  type="submit"
                  className="block w-full px-8 py-3 font-semibold text-white bg-blue-500 border border-transparent rounded-md shadow focus:outline-none focus:border-blue-100"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Form */}
        {/* <div className="px-6 pt-6 pb-12 mt-4 -mx-4 bg-gray-100">
          <div className="p-4 -mx-2 text-gray-800 bg-white rounded shadow-lg">
            <p>
              If you're interested in <strong>behind-the-scenes work</strong>{" "}
              and even <strong>two free videos</strong> when the course is
              ready, sign up to get notified:
            </p>
            <form className="mt-4" action="">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-3 placeholder-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
              <div className="mt-3">
                <button
                  type="submit"
                  className="block w-full px-8 py-3 font-medium text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </div>
    </>
  );
}
