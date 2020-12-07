import React from "react";

import firebase from "gatsby-plugin-firebase";
import LoadingHomework from "./LoadingHomework";
import Homework from "./Homework";
import HomeworkData, { isHomeworkData } from "../types/HomeworkData";
import usePermissions from "../utils/usePermissions";

//@ts-ignore
import Empty from "../images/empty.svg";

type Props = {
  courseName: string;
  subCourseName?: string;
};

function HomeworksLister({ courseName, subCourseName }: Props) {
  const [homeworks, setHomeworks] = React.useState<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  >(null);
  const [loaded, setLoaded] = React.useState(false);
  const permissions = usePermissions();
  const homeworksRef =
    permissions === null
      ? null
      : firebase
          .firestore()
          .collection("classes")
          .doc(permissions.className)
          .collection("courses")
          .doc(courseName)
          .collection("subCourses")
          .doc(subCourseName || "default")
          .collection("homeworks");

  React.useEffect(() => {
    if (homeworksRef === null) return;
    const unsub = homeworksRef.orderBy("startDate").onSnapshot((data) => {
      setHomeworks(data);
      setLoaded(true);
    });
    return () => unsub();
  }, [permissions, courseName, subCourseName]);

  const homeworksExist = () => homeworks != null && !homeworks.empty;
  let timeout = 0;

  return (
    <>
      {homeworksExist() ? (
        homeworks.docs.map((homework) => (
          <Homework
            id={homework.id}
            key={homework.id}
            timeout={++timeout}
            homework={homework.data() as HomeworkData}
            onDelete={() => homeworksRef.doc(homework.id).delete()}
          />
        ))
      ) : loaded || permissions === null ? (
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
