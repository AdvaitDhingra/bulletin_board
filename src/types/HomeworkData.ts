import type firebase from "firebase";
type Timestamp = firebase.firestore.Timestamp;

const isTimestamp = (obj): obj is Timestamp => {
  return (
    typeof obj.seconds === "number" &&
    typeof obj.nanoseconds === "number" &&
    typeof obj.toDate === "function" &&
    typeof obj.toMillis === "function"
  );
};

export const isHomeworkData = (obj): obj is HomeworkData => {
  return (
    typeof obj.title === "string" &&
    obj.title.length > 0 &&
    typeof obj.content === "string" &&
    obj.content.length > 0 &&
    typeof obj.startDate === "object" &&
    isTimestamp(obj.startDate) &&
    typeof obj.dueDate === "object" &&
    isTimestamp(obj.dueDate)
  );
};

export default interface HomeworkData {
  title: string;
  content: string;
  startDate: Timestamp;
  dueDate: Timestamp;
}
