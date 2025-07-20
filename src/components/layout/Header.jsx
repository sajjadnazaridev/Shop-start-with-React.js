import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const state = useSelector((state) => state.cart);

  return (
    <header className="flex justify-between items-center m-4 p-2 text-light rounded-lg bg-primary">
      <h1 className="font-bold">
        <Link to="/">Star Shop</Link>
      </h1>

      <div>
        <Link to="/checkout">
          <div className="flex flex-row-reverse py-1 mr-2">
            <div className="relative">
              {!!state.itemsCounter && (
                <span className="text-xs px-1 bg-dark rounded-full text-light absolute -top-1 -left-1.5">
                  {state.itemsCounter}
                </span>
              )}
            </div>
            <div className="p-1 rounded-md bg-light">
              <FaCartShopping size={20} className="text-primary" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
