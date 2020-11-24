import { Head, Container } from "../components/ui";
import Code from "../components/code";
import NextLink from "next/link";
import { MDXProvider } from "@mdx-js/react";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import slugify from "slugify";

export default function Layout({ children, frontMatter }) {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>

      <div className="px-6 pt-6 md:pt-12 lg:pt-16 md:leading-relaxed md:text-lg- lg:text-lg">
        <Container size="measure">
          <article>
            <div className="mb-8 md:mb-10">
              <h1 className="mt-8 text-3xl font-semibold leading-tight md:text-4xl lg:text-4-5xl">
                {frontMatter.title}
              </h1>
            </div>
            <MDXProvider components={components}>{children}</MDXProvider>
          </article>

          <p className="pt-8 text-sm font-medium text-right text-gray-500 md:mt-1">
            {format(parseISO(frontMatter.date), "MMMM d, yyyy")}
          </p>

          <hr className="mt-10" />

          <div className="mt-10">
            <div>
              <NextLink href="/">
                <a className="block w-16 h-16 mx-auto overflow-hidden rounded-full">
                  <Image src="/images/profile.jpeg" width={985} height={985} />
                </a>
              </NextLink>
            </div>

            <div className="mt-2 leading-none text-center">
              <p className="pt-2 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                Written by
              </p>
              <p className="pt-2 text-xl font-semibold">
                <NextLink href="/">
                  <a>Sam Selikoff</a>
                </NextLink>
              </p>
            </div>
          </div>

          <div className="pb-24 mt-8 text-center">
            <NextLink href="/blog">
              <a className="font-medium text-blue-500">← View all posts</a>
            </NextLink>
          </div>
        </Container>
      </div>
    </>
  );
}

const components = {
  h2: ({ children = "", ...rest }) => (
    <h2
      id={slugify(children).toLowerCase()}
      className="pt-20 mt-8 text-lg font-semibold leading-tight text-gray-900 border-t border-gray-200 md:text-2xl"
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: () => {
    throw new Error("Selikoff: Don't use an h3 in your blog posts, dude");
  },
  p: (props) => <p className="mt-4 lg:mt-6">{props.children}</p>,
  img: (props) => <img className="mt-4 lg:mt-6" {...props} />,
  a: ({ children, ...rest }) => (
    <a className="text-blue-500 underline" {...rest}>
      {children}
    </a>
  ),
  hr: () => <hr className="mt-4 border-gray-200 lg:mt-6" />,
  ol: (props) => <ol className="pl-6 mt-4 list-decimal lg:mt-6" {...props} />,
  ul: (props) => <ul className="pl-6 mt-4 list-disc lg:mt-6" {...props} />,
  li: (props) => <li className="mt-2" {...props} />,

  blockquote: (props) => (
    <blockquote className="pl-4 italic border-l-4 border-gray-200">
      {props.children}
    </blockquote>
  ),
  inlineCode: (props) => (
    <code className="px-1 py-px text-sm bg-gray-100">{props.children}</code>
  ),
  pre: (props) => <div {...props} />,

  // MDX assigns a className of something like `language-jsx{1,5-10}`
  code: ({ className, children }) => {
    let props = { children };
    let languageMatch = className && className.match("language-([^{]+)");
    if (languageMatch) {
      props.language = languageMatch[1];
    }
    let highlightedLinesMatch = className && className.match("{(.+)}");
    if (highlightedLinesMatch) {
      props.highlightedLines = highlightedLinesMatch[1];
    }

    return (
      <div className="my-8 -mx-6 overflow-hidden sm:rounded-lg md:mx-auto">
        <Code {...props} />
      </div>
    );
  },
};
