import { Link } from "react-router-dom";

const Productitem = ({ id, image, name, price, des }) => {

  // const { currency } = useContext(ShopContext);
  return (
    <>
      <div
        className="text-gray-300  cursor-pointer w-fit h-fit"

      >
        <div className="overflow-hidden">
          <div className="card">
            <img
              src={image[0]}
              className="hover:scale-110 transition ease-in-out duration-300 card-img-top"
              alt="..."
            />
          </div>
        </div>
        <div className="card-body">
          <h5 className="pt-3 pb-1 text-sm card-title">{name}</h5>
          <h5 className="pt-3 pb-1 text-sm card-title">{des}</h5>
          <p className="text-sm mb-3 font-medium card-text">₹{price}</p>

          <Link
            to={`/admin/update-foods/${id}`}
            className="mt-3 py-1 text-center hover:scale-103 hover:bg-amber-700 transition-all duration-300 rounded w-[100%] ml-2 px-2 bg-transparent border"
          >
            Update
          </Link>
          <Link

            to={`/deletefood/${id}`}
            className="mt-3 py-1 text-center hover:scale-103 hover:bg-red-700 transition-all duration-300 rounded w-fit-content ml-2 px-2 bg-transparent border"
          >
            Remove
          </Link>
        </div>
        {/* <div className="overflow-hidden">
          <img
            className="hover:scale-110 translate ease-in-out"
            src={image[0]}
            alt=""
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p> */}
      </div>
    </>
  );
};
export default Productitem;
