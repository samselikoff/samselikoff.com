import { Head, Container, Spacer, Title, Lead } from "../components/ui";
import { useEffect, useState, useRef } from "react";
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/database";
import { format } from "date-fns";

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

  let [isSavingNewEntry, setIsSavingNewEntry] = useState();
  let [newEntry, setNewEntry] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    text: "",
    category: "work",
    href: "",
  });

  function handleChange(key, value) {
    setNewEntry((newEntry) => ({ ...newEntry, [key]: value }));
  }

  function createEntry(e) {
    e.preventDefault();
    setIsSavingNewEntry(true);

    let db = firebaseApp.database();
    let newId = db.ref().child("work-journal-entries").push().key;

    db.ref(`work-journal-entries/${newId}`)
      .set(newEntry)
      .then(() => {
        setIsSavingNewEntry(false);
        setNewEntry({
          date: newEntry.date,
          text: "",
          href: "",
          category: newEntry.category,
        });
      });
  }

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

          <div>
            <p className="text-sm italic font-medium text-gray-500 uppercase">
              New entry
            </p>
            <NewEntry
              entry={newEntry}
              isSaving={isSavingNewEntry}
              handleChange={handleChange}
              onSubmit={createEntry}
            />
          </div>

          <Spacer size="lg" />

          <div className="border-t-4 border-gray-800 border-double" />

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

function NewEntry({ entry, isSaving, handleChange, onSubmit }) {
  return (
    <EntryForm
      entry={entry}
      isSaving={isSaving}
      onChange={handleChange}
      onSubmit={onSubmit}
    >
      <div className="pt-5">
        <div className="flex justify-end">
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="submit"
              className="relative flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md hover:bg-blue-400 focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600"
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

              <span className={isSaving ? "invisible" : ""}>Create Entry</span>
            </button>
          </span>
        </div>
      </div>
    </EntryForm>
  );
}

function Entry({ entry }) {
  let [localEntry, setLocalEntry] = useState({ ...entry });
  let [isSaving, setIsSaving] = useState(false);

  function handleChange(key, value) {
    console.log("here");
    setLocalEntry((localEntry) => ({ ...localEntry, [key]: value }));
  }

  function updateEntry(e) {
    e.preventDefault();
    setIsSaving(true);

    let db = firebaseApp.database();

    db.ref(`work-journal-entries/${entry.id}`)
      .set(localEntry)
      .then(() => {
        setIsSaving(false);
      });
  }

  function deleteEntry() {
    if (confirm("Delete this entry?")) {
      firebaseApp.database().ref(`work-journal-entries/${entry.id}`).remove();
    } else {
      // ignore
    }
  }

  let hasLocalChanges = !shallowEqual(entry, localEntry);

  return (
    <EntryForm
      entry={localEntry}
      hasLocalChanges={hasLocalChanges}
      isSaving={isSaving}
      onChange={handleChange}
      onSubmit={updateEntry}
    >
      <div className="pt-5">
        <div className="flex">
          <span className="inline-flex mr-auto rounded-md shadow-sm">
            <button
              onClick={deleteEntry}
              type="button"
              className="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            >
              Delete...
            </button>
          </span>
          <span className="inline-flex rounded-md shadow-sm">
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
    </EntryForm>
  );
}

function EntryForm({
  entry,
  hasLocalChanges,
  isSaving,
  onChange,
  onSubmit,
  children,
}) {
  // let [localEntry, setLocalEntry] = useState({ ...entry });
  // let [isSaving, setIsSaving] = useState(false);

  // function handleChange (key, value) {
  //   setLocalEntry((localEntry) => ({ ...localEntry, [key]: value }));
  // };

  // function updateEntry(e) {
  //   e.preventDefault();
  //   setIsSaving(true);

  //   let db = firebaseApp.database();

  //   let id = entry.id || db.ref().child("work-journal-entries").push().key;

  //   db.ref(`work-journal-entries/${id}`)
  //     .set(localEntry)
  //     .then(() => {
  //       setIsSaving(false);
  //     });
  // }

  // function deleteEntry() {
  //   if (confirm("Delete this entry?")) {
  //     firebaseApp.database().ref(`work-journal-entries/${entry.id}`).remove();
  //   } else {
  //     // ignore
  //   }
  // }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor={`entry${entry.id}-date`}
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Date
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id={`entry${entry.id}-date`}
              value={entry.date}
              onChange={(e) => onChange("date", e.target.value)}
              className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
            />
          </div>
        </div>
      </div>
      <fieldset className="mt-8">
        <legend className="text-sm font-medium leading-5 text-gray-700">
          Category
        </legend>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <input
              id={`entry${entry.id}-work`}
              name="category"
              type="radio"
              value="work"
              checked={entry.category === "work"}
              onChange={() => onChange("category", "work")}
              className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
            />
            <label htmlFor={`entry${entry.id}-work`} className="ml-3">
              <span className="block text-sm font-medium leading-5 ">Work</span>
            </label>
          </div>
          <div className="flex items-center ml-6">
            <input
              id={`entry${entry.id}-learning`}
              name="category"
              type="radio"
              value="learning"
              checked={entry.category === "learning"}
              onChange={() => onChange("category", "learning")}
              className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
            />
            <label htmlFor={`entry${entry.id}-learning`} className="ml-3">
              <span className="block text-sm font-medium leading-5 ">
                Learning
              </span>
            </label>
          </div>
          <div className="flex items-center ml-6">
            <input
              id={`entry${entry.id}-interesting-thing`}
              name="category"
              type="radio"
              value="interesting-thing"
              checked={entry.category === "interesting-thing"}
              onChange={() => onChange("category", "interesting-thing")}
              className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
            />
            <label
              htmlFor={`entry${entry.id}-interesting-thing`}
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
          htmlFor={`entry${entry.id}-text`}
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Text
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <textarea
            id={`entry${entry.id}-text`}
            value={entry.text}
            onChange={(e) => onChange("text", e.target.value)}
            rows="3"
            className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
          ></textarea>
        </div>
      </div>
      <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor={`entry${entry.id}-href`}
            className="block text-sm font-medium leading-5 text-gray-700"
          >
            Link
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id={`entry${entry.id}-href`}
              value={entry.href}
              placeholder="http://some-url.com"
              onChange={(e) => onChange("href", e.target.value)}
              className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
            />
          </div>
        </div>
      </div>
      {children}
    </form>
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
