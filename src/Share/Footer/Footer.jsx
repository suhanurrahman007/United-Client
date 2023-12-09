import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Footer = () => {
    const pages = [1,2,3,"...",100]
    return (
      <footer className="footer items-center p-4 bg-[#150F2D] text-neutral-content">
        <aside className="items-center grid-flow-col">
          <p>Showing 1-10 of 1000</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <div className="flex justify-center items-center">
            <button className="border px-4 font-bold py-4">
              <FaAngleDoubleLeft></FaAngleDoubleLeft>
            </button>

            {pages.map((page) => (
              <button className="border px-4 font-bold py-3" key={page}>
                {page}
              </button>
            ))}
            <button className="border px-4 font-bold py-4">
              <FaAngleDoubleRight></FaAngleDoubleRight>
            </button>
          </div>
        </nav>
      </footer>
    );
};

export default Footer;