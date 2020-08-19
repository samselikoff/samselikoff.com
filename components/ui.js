import React from "react";
import NextLink from "next/link";

export const A = ({
  children,
  font = "medium",
  underline = true,
  className = "",
  href,
  ...props
}) => {
  let border = underline
    ? `border-b border-blue-400 hover:border-blue-500 `
    : ``;
  className += ` ${border} font-${font} text-blue-600`;
  let isInternalLink = href?.startsWith("/");

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a {...props} className={className}>
          {children}
        </a>
      </NextLink>
    );
  } else {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
};

export function Title({ size = "md", children }) {
  let styles = {
    sm:
      "text-4xl font-semibold leading-tight text-gray-800 md:text-5xl lg:text-6xl lg:font-medium xl:text-7xl",
    md:
      "text-5xl font-semibold leading-tight text-gray-800 md:text-6xl lg:text-7xl lg:font-medium xl:text-8xl",
  };
  return <h1 className={styles[size]}>{children}</h1>;
}

export function Lead({ children }) {
  return (
    <p className="mt-6 text-lg text-gray-700 md:text-xl lg:text-2xl">
      {children}
    </p>
  );
}

export function Spacer({ size = "md" }) {
  let styles = {
    md: "mt-8",
    lg: "mt-8 md:mt-10 xl:mt-16",
    xl: "mt-8 md:mt-16 xl:mt-24",
  };

  return <div className={styles[size]}></div>;
}

export function Container({ size, children }) {
  let styles = {
    small: "max-w-sm mx-auto px-6 sm:max-w-lg md:max-w-xl lg:max-w-2xl", // Home
    some: "max-w-xl px-6 mx-auto lg:max-w-3xl lg:px-0", // Podcast, Blog index
    measure: "max-w-measure mx-auto", // Blog post
    large: "max-w-2xl px-6 mx-auto md:max-w-xl", // Projects
  };

  return <div className={styles[size]}>{children}</div>;
}

export const Img = ({ src, aspectRatio = 16 / 9, className = "" }) => {
  return (
    <div
      className="relative"
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
    >
      <div className="absolute inset-0">
        <img src={src} className={className} />
      </div>
    </div>
  );
};

export const Img2 = ({
  src,
  aspectRatio = 16 / 9,
  imgStyle = {},
  className = "",
}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `);

  let imageData = data.allFile.nodes.find((file) => file.relativePath === src)
    .childImageSharp.fluid;

  return (
    /*
      We pre-wire the wrapper with position: relative, zIndex: 0 here to fix a bug in Safari. Otherwise,
      as images are fading in, border radius won't be correctly applied.
    */
    <GatsbyImage
      className={className}
      style={{ position: "relative", zIndex: 0 }}
      fluid={{ ...imageData, aspectRatio }}
      imgStyle={imgStyle}
      loading="eager"
    />
  );
};
