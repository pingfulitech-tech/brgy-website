import barangaySeal from "../assets/seal.png";

export default function Seal({ size = 48 }) {
  return (
    <img
      src={barangaySeal}
      width={size}
      height={size}
      alt="Barangay San Isidro seal"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
      }}
    />
  );
}