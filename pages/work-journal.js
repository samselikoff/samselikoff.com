import { A, Spacer, Lead, Container, Title, Head } from "../components/ui";
import { format, parse, parseISO, startOfWeek } from "date-fns";
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/database";

function Entry({ week, children }) {
  let dateObject = parse(week, "yyyy-MM-dd", new Date());
  let dayWithSuffix = format(dateObject, "do");
  let day = format(dateObject, "d");
  let suffix = dayWithSuffix.replace(day, "");
  let month = format(dateObject, "MMMM");
  let year = format(dateObject, "yyyy");

  return (
    <>
      <h2 className="mt-1 text-lg font-bold">
        <p>
          Week of {month} {day}
          <sup>{suffix}</sup>, {year}
        </p>
      </h2>

      <Spacer />

      <div className="pb-32 space-y-10">{children}</div>
    </>
  );
}

Entry.Section = function (props) {
  const titles = {
    work: (
      <>
        <span role="img" className="pr-1" aria-label="construction">
          🏗
        </span>{" "}
        Work
      </>
    ),
    learnings: (
      <>
        <span role="img" className="pr-1" aria-label="star">
          💫
        </span>{" "}
        Learnings
      </>
    ),
    "interesting-things": (
      <>
        <span role="img" className="pr-1" aria-label="interest">
          😮
        </span>{" "}
        Interesting things
      </>
    ),
  };
  return (
    <section>
      <p className="font-bold">{titles[props.title]}</p>

      <ul className="pt-4 pl-6 space-y-3 list-disc">{props.children}</ul>
    </section>
  );
};

Entry.Item = function ({ children, href }) {
  return (
    <li>
      {children}
      {href && (
        <>
          {" "}
          <A href={href}>Link</A>
        </>
      )}
    </li>
  );
};

export default function WorkJournalPage({ entries }) {
  let weeksObject = entries.reduce((memo, entry) => {
    let nearestMonday = startOfWeek(parseISO(entry.date), { weekStartsOn: 1 });
    let nearestMondayString = format(nearestMonday, "yyyy-MM-dd");
    memo[nearestMondayString] = memo[nearestMondayString] || [];
    memo[nearestMondayString].push(entry);

    return memo;
  }, {});

  let weeks = Object.keys(weeksObject)
    .sort((x, y) => (x > y ? "-1" : "1"))
    .map((startingDate) => ({
      startingDate,
      work: weeksObject[startingDate].filter(
        (entry) => entry.category === "work"
      ),
      learnings: weeksObject[startingDate].filter(
        (entry) => entry.category === "learning"
      ),
      interestingThings: weeksObject[startingDate].filter(
        (entry) => entry.category === "interesting-thing"
      ),
    }));

  return (
    <>
      <Head>
        <title>Work journal</title>
      </Head>

      <div className="break-words md:text-lg-">
        <Container size="some">
          <Spacer size="xl" />

          <Title>Work journal</Title>

          <Spacer size="lg" />

          <Lead>Doings and learnings. Updated weekly.</Lead>

          <Spacer size="lg" />

          {weeks.map((week) => (
            <Entry week={week.startingDate} key={week.startingDate}>
              {week.work.length > 0 && (
                <Entry.Section title="work">
                  {week.work.map((entry) => (
                    <Entry.Item href={entry.href} key={entry.id}>
                      {entry.text}
                    </Entry.Item>
                  ))}
                </Entry.Section>
              )}

              {week.learnings.length > 0 && (
                <Entry.Section title="learnings">
                  {week.learnings.map((entry) => (
                    <Entry.Item href={entry.href} key={entry.id}>
                      {entry.text}
                    </Entry.Item>
                  ))}
                </Entry.Section>
              )}

              {week.interestingThings.length > 0 && (
                <Entry.Section title="interesting-things">
                  {week.interestingThings.map((entry) => (
                    <Entry.Item href={entry.href} key={entry.id}>
                      {entry.text}
                    </Entry.Item>
                  ))}
                </Entry.Section>
              )}
            </Entry>
          ))}
        </Container>
      </div>
    </>
  );
}

export async function getStaticProps() {
  let firebaseConfig = {
    apiKey: "AIzaSyAXX4G4xSLAwfIgR8vOsgYQOq9or0Jmmyo",
    authDomain: "test-3fb7f.firebaseapp.com",
    databaseURL: "https://test-3fb7f.firebaseio.com",
    projectId: "test-3fb7f",
    storageBucket: "test-3fb7f.appspot.com",
    messagingSenderId: "197704559138",
    appId: "1:197704559138:web:f373ec99c0218a774ff87b",
    measurementId: "G-HP7G1FS9FN",
  };
  // Initialize Firebase
  let app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();
  let db = app.database();

  let snapshot = await db.ref("/work-journal-entries").once("value");
  let entriesObject = snapshot.val();

  return {
    props: {
      entries: Object.keys(entriesObject).map((id) => ({
        id,
        ...entriesObject[id],
      })),
    },
    revalidate: 1,
  };
}
