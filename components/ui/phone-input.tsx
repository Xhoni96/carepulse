import "react-international-phone/style.css";

import { PhoneInput as PhoneInputCmp, type PhoneInputProps } from "react-international-phone";

export const PhoneInput = (props: PhoneInputProps) => {
  return (
    <PhoneInputCmp
      className="!border-0 !h-11"
      countrySelectorStyleProps={{
        buttonStyle: {
          height: "2.75rem",
          paddingLeft: "0.4rem",
          background: "transparent",
          borderRight: 0,
          borderColor: "#363A3D",
          opacity: props.disabled ? 0.5 : 1,
          cursor: props.disabled ? "not-allowed" : "auto",
        },
      }}
      inputClassName="w-full !bg-transparent !text-dark-700 !border-l-0 !border-dark-500 !h-11 focus-visible:outline-none focus-visible:ring-2 border-dark-500 bg-dark-400 disabled:opacity-50 disabled:cursor-not-allowed"
      placeholder="(555) 123-4567"
      {...props}
    />
  );
};
