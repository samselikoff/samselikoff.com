export default function Layout(frontMatter) {
  return ({ children: content }) => {
    // React hooks, for example `useState` or `useEffect`, go here.
    return (
      <div>
        <p>foooooooooooo</p>
        <h1>{frontMatter.title}</h1>
        {content}
      </div>
    );
  };
}
