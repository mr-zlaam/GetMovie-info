import { useEffect, useState } from "react";
import "./Watchlist.scss";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../10_firebase/firebase.config";
import { type FilterMovieData } from "@/types";
function Watchlist() {
  const currentUser = auth?.currentUser?.uid;
  const [myMovieData, setmyMovieData] = useState<FilterMovieData[] | null>(
    null
  );
  const fetchWatchListData = async () => {
    try {
      const MovieRefData = collection(db, "movie");
      const response = await getDocs(MovieRefData);
      const watchlistData: FilterMovieData[] = [];
      response.forEach((docs) => {
        watchlistData.push({ id: docs.id, ...docs.data() });
      });
      const filteredData: FilterMovieData[] = watchlistData.filter(
        (item) => item["uploadedBy"] === currentUser
      );
      setmyMovieData(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveWatchListData = async () => {};
  useEffect(() => {
    handleRemoveWatchListData();
    if (currentUser === localStorage.getItem("uid")) {
      fetchWatchListData();
    }
  }, [handleRemoveWatchListData]);
  return (
    <>
      <section className="">
        {myMovieData?.map((movie) => {
          return (
            <div key={movie?.id} className="watch-card">
              {movie?.title}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Watchlist;
