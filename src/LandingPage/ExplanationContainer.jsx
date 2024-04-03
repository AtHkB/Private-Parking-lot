import explImage from "../assets/expl.png";

const ExplanationContainer = () => {
  return (
    <div className="relative z-10">
      <img
        src={explImage}
        alt="Explanation"
        className="w-100 h-auto ml-4"
        style={{ width: "200px", height: "auto", marginLeft: "1rem" }}
      />
    </div>
  );
};

export default ExplanationContainer;
