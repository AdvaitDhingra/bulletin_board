import firebase from "gatsby-plugin-firebase";
import { useAuthState as useRealAuthState } from 'react-firebase-hooks/auth'

export const useAuthState = () => {
    return useRealAuthState(firebase.auth ? firebase.auth() : null);
}
