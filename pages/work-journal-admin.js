import { Head, Container, Spacer, Title, Lead } from "../components/ui";
import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/database";

let firebaseApp;

export default function WorkJournalAdminPage() {
  let [entries, setEntries] = useState();
  useEffect(() => {
    async function f() {
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
      firebaseApp = !firebase.apps.length
        ? firebase.initializeApp(firebaseConfig)
        : firebase.app();
      let db = firebaseApp.database();

      let snapshot = await db.ref("/work-journal-entries").once("value");
      let entriesObject = snapshot.val();

      let entries = Object.keys(entriesObject)
        .map((id) => ({
          id,
          ...entriesObject[id],
        }))
        .sort((x, y) => (x.date > y.date ? "-1" : "1"));

      setEntries(entries);
    }

    f();
  });

  return (
    <>
      <Head>
        <title>Work journal</title>
      </Head>

      <div className="md:text-lg-">
        <Container size="some">
          <Spacer size="xl" />

          <Title>Work journal</Title>

          <Spacer size="lg" />

          <Lead>Admin</Lead>

          <Spacer size="lg" />

          {!entries ? (
            <p>Loading...</p>
          ) : (
            <ul className="divide-y divide-cool-gray-200">
              {entries.map((entry) => (
                <div className="py-4" key={entry.id}>
                  <Entry entry={entry} />
                </div>
              ))}
            </ul>
          )}
        </Container>
      </div>
    </>
  );
}

function Entry({ entry }) {
  let [localEntry, setLocalEntry] = useState({ ...entry });
  let [isSaving, setIsSaving] = useState(false);

  function handleChange(key, value) {
    setLocalEntry((localEntry) => ({ ...localEntry, [key]: value }));
  }

  function updateEntry(e) {
    e.preventDefault();
    setIsSaving(true);

    let db = firebaseApp.database();
    db.ref(`work-journal-entries/${localEntry.id}`)
      .set(localEntry)
      .then(() => {
        setIsSaving(false);
      });
  }

  let hasLocalChanges = !shallowEqual(entry, localEntry);

  return (
    <div className="py-6">
      <form onSubmit={updateEntry}>
        <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor={`entry${localEntry.id}-date`}
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Date
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id={`entry${localEntry.id}-date`}
                value={localEntry.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>

        <fieldset className="mt-8">
          <legend className="text-sm font-medium leading-5 text-gray-700">
            Category
          </legend>
          <div className="mt-2">
            <div className="flex items-center">
              <input
                id={`entry${localEntry.id}-work`}
                name="category"
                type="radio"
                value="work"
                checked={localEntry.category === "work"}
                onChange={() => handleChange("category", "work")}
                className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
              />
              <label htmlFor={`entry${localEntry.id}-work`} className="ml-3">
                <span className="block text-sm font-medium leading-5 ">
                  Work
                </span>
              </label>
            </div>
            <div className="flex items-center mt-4">
              <input
                id={`entry${localEntry.id}-learning`}
                name="category"
                type="radio"
                value="learning"
                checked={localEntry.category === "learning"}
                onChange={() => handleChange("category", "learning")}
                className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
              />
              <label
                htmlFor={`entry${localEntry.id}-learning`}
                className="ml-3"
              >
                <span className="block text-sm font-medium leading-5 ">
                  Learning
                </span>
              </label>
            </div>
            <div className="flex items-center mt-4">
              <input
                id={`entry${localEntry.id}-interesting-thing`}
                name="category"
                type="radio"
                value="interesting-thing"
                checked={localEntry.category === "interesting-thing"}
                onChange={() => handleChange("category", "interesting-thing")}
                className="w-4 h-4 text-indigo-600 transition duration-150 ease-in-out form-radio"
              />
              <label
                htmlFor={`entry${localEntry.id}-interesting-thing`}
                className="ml-3"
              >
                <span className="block text-sm font-medium leading-5 ">
                  Interesting thing
                </span>
              </label>
            </div>
          </div>
        </fieldset>

        <div className="mt-8 sm:col-span-6">
          <label
            htmlFor={`entry${localEntry.id}-text`}
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Text
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <textarea
              id={`entry${localEntry.id}-text`}
              value={localEntry.text}
              onChange={(e) => handleChange("text", e.target.value)}
              rows="3"
              className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor={`entry${localEntry.id}-href`}
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Link
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id={`entry${localEntry.id}-href`}
                value={localEntry.href}
                placeholder="http://some-url.com"
                onChange={(e) => handleChange("href", e.target.value)}
                className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <span className="inline-flex ml-3 rounded-md shadow-sm">
              <button
                type="submit"
                disabled={!hasLocalChanges}
                className={`${
                  hasLocalChanges ? "" : "pointer-events-none opacity-50"
                } hinline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-md hover:bg-green-400 focus:outline-none focus:border-green-600 focus:shadow-outline-green active:bg-green-600 flex items-center relative`}
              >
                <span
                  className={`${
                    isSaving ? "" : "invisible"
                  } absolute inset-0 flex items-center justify-center`}
                >
                  <svg
                    className="w-4 h-4 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>

                <span className={isSaving ? "invisible" : ""}>Update</span>
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

function shallowEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}
