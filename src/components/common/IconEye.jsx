import PropTypes from "prop-types";
import iconEyeVisible2 from "../../assets/iconEyeVisible2.svg";
import iconEyeInvisible2 from "../../assets/iconEyeInvisible2.svg";

export const IconEye = ({ showPassword, togglePasswordVisibility }) => {
  return (
    <span onClick={togglePasswordVisibility}>
      {showPassword ? (
        <img
          src={iconEyeVisible2}
          className="h-6 w-6  cursor-pointer"
          alt="Password Visible"
        />
      ) : (
        <img
          src={iconEyeInvisible2}
          className="h-6 w-6 cursor-pointer"
          alt="Password Invisible"
        />
      )}
    </span>
  );
};

IconEye.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
};
