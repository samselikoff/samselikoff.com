import { getAllPosts, getPostBySlug } from "../../lib/posts";
import markdownToHtml from "../../lib/markdownToHtml";
import { Head, Container, Img } from "../../components/ui";
import NextLink from "next/link";

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <div className="px-6 pt-6 md:pt-12 lg:pt-16 md:leading-relaxed md:text-lg- lg:text-lg">
        <Container size="measure">
          <article>
            {/* <MDXProvider components={components}> */}
            <div className="mb-8 md:mb-10">
              <h1 className="mt-8 text-3xl font-semibold leading-tight md:text-4xl lg:text-4-5xl">
                {post.title}
              </h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            {/* <MDXRenderer>{mdx.body}</MDXRenderer> */}
            {/* </MDXProvider> */}
          </article>

          <p className="pt-8 text-sm font-medium text-right text-gray-500 md:mt-1">
            {post.date}
          </p>

          <hr className="mt-10" />

          <div className="mt-10">
            <div>
              <NextLink href="/">
                <a className="block w-16 h-16 mx-auto overflow-hidden rounded-full">
                  <Img src="/images/profile.jpeg" aspectRatio={1} />
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

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content"]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
