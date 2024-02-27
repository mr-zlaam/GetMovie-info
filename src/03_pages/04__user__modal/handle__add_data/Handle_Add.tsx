import { MoviesData } from "@/types";
import { auth, db } from "../../../10_firebase/firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react"; // Import useState if you need to manage state

export const useSubmit = () => {
  const currentUser = auth?.currentUser;
  const [submitStatus, setSubmitStatus] = useState<string | boolean | null>(
    null
  );
  const [handleLoading, sethandleLoading] = useState<boolean>(false);

  const handleSubmit = async (movie: MoviesData) => {
    console.log("hello");
    const MovieRef = collection(db, "movie");
    const q = query(MovieRef, where("id", "==", movie?.id));
    let docExists = false;
    sethandleLoading(true);
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          docExists = true;
        }
      });
      sethandleLoading(false);
    } catch (error) {
      sethandleLoading(true);
      !handleLoading && setSubmitStatus("! ❌error: bad request");
      sethandleLoading(false);
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
    }

    if (!docExists) {
      sethandleLoading(true);
      try {
        // Add the current user's ID to the movie data
        const movieDataWithUser = { ...movie, uploadedBy: currentUser?.uid };
        await addDoc(MovieRef, movieDataWithUser);
        !handleLoading &&
          setSubmitStatus("Added to watchlist successfully ✔️ ");
        setTimeout(() => {
          setSubmitStatus("");
        }, 3000);
        sethandleLoading(false);
      } catch (error) {
        sethandleLoading(true);
        !handleLoading && setSubmitStatus("!❌Bad Request");
        sethandleLoading(false);
        setTimeout(() => {
          setSubmitStatus("");
        }, 3000);
      }
    } else {
      sethandleLoading(true);
      !handleLoading && setSubmitStatus("Already  Added ❌");
      sethandleLoading(false);
      setTimeout(() => {
        setSubmitStatus("");
      }, 3000);
    }
  };

  return { handleSubmit, submitStatus, handleLoading };
};
