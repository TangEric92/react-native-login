const checkEmpty = (label, value, setErrorValue) => {
  console.log(value);
  if (value === "") {
    setErrorValue(`La champ ${label} est requis`);
  } else setErrorValue("");
};

export default checkEmpty;
