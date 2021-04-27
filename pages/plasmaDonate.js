import Head from "next/head";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

async function getAppData() {
  const db = firebase.firestore();
  const snapshots = await db.collection("appData").doc("data").get();
  return snapshots.data();
}

export default function donatePlasma() {
  const [appData, setAppData] = useState({
    lastUpdated: "19-04-2020",
  });

  useEffect(() => {
    getAppData().then(setAppData);
  }, []);

  const phone = ["7415634223", "9930511578", "9425963179"];

  return (
    <div>
      <div className="bg-blue-200 min-h-screen p-2">
        <Head>
          <title>CoviHelp App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container mx-auto bg-white rounded-lg p-4">
          <h1 className="font-bold my-1 text-indigo-600 text-lg">
            CoviHelp
            <small className="float-right text-gray-600">
              Last updated: {appData.lastUpdated}
            </small>
          </h1>
          <div className="m-3">
            <p className="my-4">
              For plasma requirements, please whatsapp below information on any
              of below numbers, we will try our best to help you:
            </p>
            <ul className="list-disc ml-6 my-4">
              <li>Date of requirement</li>
              <li>Name of Patient</li>
              <li>Hospital Name</li>
              <li>Hospital Bed No</li>
              <li>Blood Group</li>
              <li>infection Percent/CT Score</li>
              <li>No of plasma units required</li>
              <li>SPO2 level</li>
              <li>Attender Name</li>
              <li>Attender Mobile Number</li>
            </ul>
            {phone.map((i) => (
              <div class="my-2 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="inline-block mr-4"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
