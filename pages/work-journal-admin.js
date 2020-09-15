import { Head, Container, Spacer, Title, Lead } from "../components/ui";
import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import { format } from "date-fns";
import { Formik, Form, Field } from "formik";

// Add the Firebase products that you want to use
import "firebase/database";
import "firebase/auth";

let firebaseApp;
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

export default function WorkJournalAdminPage() {
  let [entries, setEntries] = useState();
  useEffect(() => {
    // Initialize Firebase
    firebaseApp = !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
    let db = firebaseApp.database();

    let workJournalEntriesRef = db.ref("/work-journal-entries");
    workJournalEntriesRef.on("value", (snapshot) => {
      let entriesObject = snapshot.val();

      let entries = Object.keys(entriesObject)
        .map((id) => ({
          id,
          ...entriesObject[id],
        }))
        .sort((x, y) => (x.date > y.date ? "-1" : "1"));

      setEntries(entries);
    });

    return () => {
      workJournalEntriesRef.off("value");
    };
  }, []);

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

            <NewEntry />
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

function NewEntry() {
  let defaultNewEntry = {
    date: format(new Date(), "yyyy-MM-dd"),
    text: "",
    category: "work",
    href: "",
  };

  async function createEntry(newEntry, { resetForm }) {
    let db = firebaseApp.database();
    let newId = db.ref().child("work-journal-entries").push().key;

    await db.ref(`work-journal-entries/${newId}`).set(newEntry);

    await new Promise((resolve) => setTimeout(resolve));

    resetForm({
      values: {
        date: newEntry.date,
        text: "",
        href: "",
        category: newEntry.category,
      },
    });
  }

  return (
    <EntryForm initialValues={defaultNewEntry} onSubmit={createEntry}>
      {({ isSubmitting }) => (
        <div className="pt-5">
          <div className="flex justify-end">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "pointer-events-none opacity-75"
                    : "hover:bg-blue-400 opacity-100"
                } relative flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md  focus:outline-none focus:border-blue-600 focus:shadow-outline-blue active:bg-blue-600`}
              >
                <span
                  className={`${
                    isSubmitting ? "" : "invisible"
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

                <span className={isSubmitting ? "invisible" : ""}>
                  Create Entry
                </span>
              </button>
            </span>
          </div>
        </div>
      )}
    </EntryForm>
  );
}

function Entry({ entry }) {
  let [isShowingForm, setIsShowingForm] = useState(false);

  async function updateEntry(entry) {
    let db = firebaseApp.database();

    await db.ref(`work-journal-entries/${entry.id}`).set(entry);
  }

  function deleteEntry() {
    if (confirm("Delete this entry?")) {
      firebaseApp.database().ref(`work-journal-entries/${entry.id}`).remove();
    } else {
      // ignore
    }
  }

  return isShowingForm ? (
    <EntryForm initialValues={entry} onSubmit={updateEntry}>
      {({ isSubmitting, dirty }) => (
        <div className="pt-5">
          <div className="flex">
            <span className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setIsShowingForm(false)}
                type="button"
                className="px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              >
                Close
              </button>
            </span>
            <span className="inline-flex ml-2 mr-auto rounded-md shadow-sm">
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
                disabled={!dirty}
                className={`${
                  dirty ? "" : "pointer-events-none opacity-50"
                } hinline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-500 border border-transparent rounded-md hover:bg-green-400 focus:outline-none focus:border-green-600 focus:shadow-outline-green active:bg-green-600 flex items-center relative`}
              >
                <span
                  className={`${
                    isSubmitting ? "" : "invisible"
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

                <span className={isSubmitting ? "invisible" : ""}>Update</span>
              </button>
            </span>
          </div>
        </div>
      )}
    </EntryForm>
  ) : (
    <button
      onClick={() => setIsShowingForm(true)}
      className="text-left focus:outline-none"
    >
      {entry.text}
    </button>
  );
}

function EntryForm({ initialValues, onSubmit, children }) {
  let uniqueId = initialValues.id || "new";

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, dirty }) => (
        <Form>
          <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor={`entry${uniqueId}-date`}
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Date
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <Field
                  id={`entry${uniqueId}-date`}
                  name="date"
                  type="text"
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
                <Field
                  id={`entry${uniqueId}-work`}
                  name="category"
                  type="radio"
                  value="work"
                  className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
                />
                <label htmlFor={`entry${uniqueId}-work`} className="ml-3">
                  <span className="block text-sm font-medium leading-5 ">
                    Work
                  </span>
                </label>
              </div>
              <div className="flex items-center ml-6">
                <Field
                  id={`entry${uniqueId}-learning`}
                  name="category"
                  type="radio"
                  value="learning"
                  className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
                />
                <label htmlFor={`entry${uniqueId}-learning`} className="ml-3">
                  <span className="block text-sm font-medium leading-5 ">
                    Learning
                  </span>
                </label>
              </div>
              <div className="flex items-center ml-6">
                <Field
                  id={`entry${uniqueId}-interesting-thing`}
                  name="category"
                  type="radio"
                  value="interesting-thing"
                  className="w-4 h-4 text-blue-600 transition duration-150 ease-in-out form-radio"
                />
                <label
                  htmlFor={`entry${uniqueId}-interesting-thing`}
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
              htmlFor={`entry${uniqueId}-text`}
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Text
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <Field
                as="textarea"
                id={`entry${uniqueId}-text`}
                type="text"
                name="text"
                rows="3"
                className="block w-full transition duration-150 ease-in-out form-textarea sm:text-sm sm:leading-5"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 row-gap-6 col-gap-4 mt-6 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor={`entry${uniqueId}-href`}
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Link
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <Field
                  id={`entry${uniqueId}-href`}
                  placeholder="http://some-url.com"
                  name="href"
                  className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                />
              </div>
            </div>
          </div>
          {children({ isSubmitting, dirty })}
        </Form>
      )}
    </Formik>
  );
}
