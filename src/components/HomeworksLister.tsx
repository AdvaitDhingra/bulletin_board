import React from "react";

import firebase from "gatsby-plugin-firebase";
import LoadingHomework from "./LoadingHomework";
import Homework from "./Homework";
import HomeworkData from "../types/HomeworkData";

//@ts-ignore
import Empty from "../images/empty.svg";

function HomeworksLister({ docSlug }) {
  const [homeworks, setHomeworks] = React.useState<HomeworkData>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("homework")
      .doc(docSlug)
      .onSnapshot((s) => {
        const data = s.data() as HomeworkData;
        setHomeworks(data);
        setLoaded(true);
      });

    return () => unsub();
  }, [docSlug]);

  const homeworksExist = () =>
    homeworks != null && Object.keys(homeworks).length !== 0;

  let timeout = 0;

  return (
    <>
      {homeworksExist() ? (
        Object.entries(homeworks).map((homework: [string, HomeworkData], i) => (
          <Homework
            id={homework[0]}
            key={homework[0]}
            timeout={++timeout}
            homework={homework[1]}
            docSlug={docSlug}
          />
        ))
      ) : loaded ? (
        <div style={{ margin: "0 35% 0 35%", textAlign: "center" }}>
          <Empty />
          <p>This is empty...</p>
        </div>
      ) : (
        <>
          <LoadingHomework />
          <LoadingHomework />
          <LoadingHomework />
        </>
      )}
    </>
  );
}

export default HomeworksLister;
