import { useEffect, useState } from "react";
import "./Watchlist.scss";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../10_firebase/firebase.config";
import { type FilterMovieData } from "@/types";
import WatchList__Card from "./watchlist__card/Watchlist__Card";
import { Loader } from "@export";
function Watchlist() {
  const currentUser = auth?.currentUser?.uid;
  const [myDataisLoading, setMyDataisLoading] = useState(true);
  const [myMovieData, setmyMovieData] = useState<FilterMovieData[] | null>(
    null
  );
  const fetchWatchListData = async () => {
    try {
      const MovieRefData = collection(db, "movie");
      const response = await getDocs(MovieRefData);
      setMyDataisLoading(false);
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
      setMyDataisLoading(false);
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
      {!myDataisLoading ? (
        <section className="all__movies__container">
          {myMovieData?.length === 0 || undefined ? (
            <div className="noresult__found">! No Result Found</div>
          ) : (
            myMovieData?.map((movieData) => (
              <div key={movieData?.id} className="moviecard__grid">
                <WatchList__Card movieData={movieData} />
              </div>
            ))
          )}
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Watchlist;
