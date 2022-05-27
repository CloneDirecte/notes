import { useState } from "react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [notesData, setNotesData] = useState();

  return (
    <>
      <Head>
        <title>CloneDirecte</title>
      </Head>
      <Component
        {...pageProps}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        notesData={notesData}
        setNotesData={setNotesData}
      />
    </>
  );
}

export default MyApp;
