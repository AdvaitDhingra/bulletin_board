import React from "react";

import firebase from "gatsby-plugin-firebase";

import useForceUpdate from "./useForceUpdate";
import Permissions from "../types/Permissions";

let permissionsCache: Permissions = null;
let unsub = null;
let lastUserID = null;
const allHooks: Set<() => any> = new Set();

/**
 * Forces re-download of permissions.
 */
const updatePermissions = () => {
  const user = firebase.auth().currentUser;
  if (user === null) return;

  const doc = firebase.firestore().collection("permissions").doc(user.uid);
  if (lastUserID !== user.uid && unsub !== null) {
    lastUserID = user.uid;
    unsub();
    unsub = doc.onSnapshot(updatePermissions);
  } 
  if(unsub === null) unsub = doc.onSnapshot(updatePermissions);
  doc
    .get()
    .then((d) => d.data())
    .then((permissions) => {
      permissionsCache = permissions as Permissions;
      allHooks.forEach((forceUpdate) => forceUpdate());
    });
};

updatePermissions();
firebase.auth().onAuthStateChanged(updatePermissions);

/**
 * Download and caches user permissions, and forces a rerender whenever permissions are updated.
 */
const usePermissions = (): Permissions => {
  const forceUpdate = useForceUpdate();
  React.useEffect(() => {
    allHooks.add(forceUpdate);
    return () => allHooks.delete(forceUpdate);
  }, []);
  return permissionsCache;
};

export default usePermissions;
