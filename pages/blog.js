import { getAllPosts } from "../lib/posts";
import { Head, Spacer, Title, Container } from "../components/ui";
import NextLink from "next/link";

export default function Blog({ allPosts }) {
  return (
    <>
      <Head>
        <title>Blog – Sam Selikoff</title>
      </Head>

      <div className="pb-20">
        <Container size="some">
          <Spacer size="xl" />

          <Title>Blog</Title>

          <ul className="mt-12 leading-snug">
            {allPosts.map((post) => (
              <li className="mt-6 md:mt-10" key={post.slug}>
                <NextLink href={`/blog/${post.slug}`}>
                  <a className="inline-block">
                    <h2 className="mt-1 text-lg font-semibold md:text-2xl">
                      {post.title}
                    </h2>
                  </a>
                </NextLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "date", "slug"]);

  return {
    props: { allPosts },
  };
}
