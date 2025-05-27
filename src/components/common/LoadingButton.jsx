import PropTypes from "prop-types";
import IconLoading from "../../assets/IconLoading.svg";

export function LoadingButton({ isLoading, children }) {
  return (
    <button
      type="submit"
      className="flex justify-center items-center w-full md:w-1/2 lg:w-1/2 bg-sky-800 font-semibold shadow-md hover:brightness-110 ease-in-out duration-200 text-white rounded-md px-1 py-2 mt-4"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="relative w-6 h-6 flex items-center justify-center animate-spin">
          <img
            src={IconLoading}
            alt="Cargando..."
            className="w-6 h-6 text-white drop-shadow-md"
          />
          <span className="absolute w-8 h-8 rounded-full border-2 border-white opacity-30 animate-ping"></span>
        </span>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}

LoadingButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
