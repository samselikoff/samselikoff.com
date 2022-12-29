import { Head, Lead, Spacer, Title } from "../components/ui";

export default function Demos() {
  return (
    <>
      <Head>
        <title>Demos – Sam Selikoff</title>
      </Head>

      <div className="pb-20 px-6">
        <div className="max-w-2xl mx-auto md:max-w-7xl">
          <Spacer size="xl" />

          <Title>Demos</Title>

          <Spacer size="lg" />

          <Lead>Short videos of demos I've shared on Twitter.</Lead>

          <Spacer size="lg" />

          <div className="-mx-6 md:mt-8 md:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {demos.map((demo) => (
                <div className="bg-black flex" key={demo.url}>
                  <a
                    href={demo.url}
                    className="border-b border-gray-800 block self-center"
                  >
                    <video
                      src={demo.src}
                      style={{ aspectRatio: 1 }}
                      autoPlay
                      muted
                      loop
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

let demos = [
  {
    src: "/demos/2022-12-27.mp4",
    url: "https://twitter.com/samselikoff/status/1607775610570407937",
  },
  {
    src: "/demos/2022-12-07.mp4",
    url: "https://twitter.com/samselikoff/status/1600604780648402966",
  },
  {
    src: "/demos/2022-12-05.mp4",
    url: "https://twitter.com/samselikoff/status/1599854580560318465",
  },
  {
    src: "/demos/2022-11-30.mp4",
    url: "https://twitter.com/samselikoff/status/1597951130071314432",
  },
  {
    src: "/demos/2022-11-02.mp4",
    url: "https://twitter.com/samselikoff/status/1587830119606919168",
  },
  {
    src: "/demos/2022-08-16.mp4",
    url: "https://twitter.com/samselikoff/status/1559720134771703809",
  },
  {
    src: "/demos/2022-08-04.mp4",
    url: "https://twitter.com/samselikoff/status/1555203631292506112",
  },
  {
    src: "/demos/2022-07-22.mp4",
    url: "https://twitter.com/samselikoff/status/1550535920855781378",
  },
  {
    src: "/demos/2022-07-21.mp4",
    url: "https://twitter.com/samselikoff/status/1550267630136840192",
  },
  {
    src: "/demos/2022-07-18.mp4",
    url: "https://twitter.com/samselikoff/status/1549089439451942915",
  },
  {
    src: "/demos/2022-06-22.mp4",
    url: "https://twitter.com/samselikoff/status/1539609980042706945",
  },
  {
    src: "/demos/2022-06-22-2.mp4",
    url: "https://twitter.com/samselikoff/status/1539749115134939136",
  },
  {
    src: "/demos/2022-06-11.mp4",
    url: "https://twitter.com/samselikoff/status/1535645554314813440",
  },
  {
    src: "/demos/2022-05-24.mp4",
    url: "https://twitter.com/samselikoff/status/1529104531606339585",
  },
  {
    src: "/demos/2022-05-20.mp4",
    url: "https://twitter.com/samselikoff/status/1527746918297870336",
  },
  {
    src: "/demos/2022-04-15.mp4",
    url: "https://twitter.com/samselikoff/status/1515077492897312772",
  },
];
