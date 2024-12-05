import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByProvince?provinces=kompongcham,phnompenh,takeo"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredTop">
            <div className="featuredItem">
              <img
                id="featuredImg1"
                src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/529234280.jpg?k=474b11a0f19ada6f117015ef94165bccb6d43ff35a9ca61fd0714f07156b9129&o=&hp=1"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Phnom Penh </h1>
                <h2>{data[0]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                id="featuredImg2"
                src="https://res.klook.com/image/upload/q_85/c_fill,w_750/v1595073485/blog/ettrlbht3ppoffkqci27.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Siem Reap</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </div>
          </div>
          <div className="featuredBottom">
            <div className="featuredItem">
              <img
                id="featuredImg3"
                src="https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Takeo-4.jpg?fit=1000%2C612&ssl=1"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Takeo</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                id="featuredImg4"
                src="https://www.travelauthenticasia.com/photos/tours/cambodia/gallery/koh-kong/koh-kong-2.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>kos kong</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                id="featuredImg5"
                src="https://news.worldcasinodirectory.com/wp-content/uploads/2021/06/56541306-61706_F3529694617099241_5896354478549320831_N7.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Sihanoukville</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
