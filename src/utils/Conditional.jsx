const Conditional = ({ props }) => {
  const arePropsOdd = () => props.length % 2 !== 0;

  if (props.length < 4 || arePropsOdd()) {
    throw new Error(
      "Conditional component must have at least 2 (boolean) conditions and 2 possible results, and must receive an even number of conditions and results."
    );
  }

  for (let i = 0; i <= props.length; i += 2) {
    if (props[i]) {
      return props[i + 1];
    }
  }
};

export default Conditional;
