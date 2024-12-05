// Featured.js

import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { Link } from "react-router-dom";

const Featured = () => {
  // Fetch hotel count for different cities
  const { data, loading, error } = useFetch(
    "/hotels/countByProvince?provinces=phnompenh,Kondal,takeo,Kampot"
  );

  // Handle error fetching data
  if (error) return <div>Error fetching data: {error.message}</div>;

  const cities = [
    { name: "Phnom Penh", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/529234280.jpg?k=474b11a0f19ada6f117015ef94165bccb6d43ff35a9ca61fd0714f07156b9129&o=&hp=1" },
    { name: "Kondal", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/529234280.jpg?k=474b11a0f19ada6f117015ef94165bccb6d43ff35a9ca61fd0714f07156b9129&o=&hp=1" },
    { name: "takeo", image: "https://i0.wp.com/www.cambodialifestyle.com/wp-content/uploads/2024/04/Takeo-4.jpg?fit=1000%2C612&ssl=1" },
    { name: "Kampot", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/529234280.jpg?k=474b11a0f19ada6f117015ef94165bccb6d43ff35a9ca61fd0714f07156b9129&o=&hp=1" },
    { name: "SeimReap", image: "https://news.worldcasinodirectory.com/wp-content/uploads/2021/06/56541306-61706_F3529694617099241_5896354478549320831_N7.jpg" },
  ];

  return (
    <div className="featured">
      {loading ? (
        "Loading, please wait..."
      ) : (
        <>
          <div className="featuredTop">
            {cities.slice(0, 2).map((city, index) => (
              <Link to={`/city/${city.name.toLowerCase()}`} className="featuredItem" key={index}>
                <img src={city.image} alt={city.name} className="featuredImg" />
                <div className="featuredTitles">
                  <h1>{city.name}</h1>
                  <h2>{data && data[index]?.hotelCount ? data[index].hotelCount : 0} properties</h2>
                </div>
              </Link>
            ))}
          </div>

          <div className="featuredBottom">
            {cities.slice(2, 5).map((city, index) => (
              <Link to={`/city/${city.name.toLowerCase()}`} className="featuredItem" key={index}>
                <img src={city.image} alt={city.name} className="featuredImg" />
                <div className="featuredTitles">
                  <h1>{city.name}</h1>
                  <h2>{data && data[index + 2]?.hotelCount ? data[index + 2].hotelCount : 0} properties</h2>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
