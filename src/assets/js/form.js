/* eslint-disable no-unused-vars */
const newData = () => {
  let image = null;
  let type = null;

  const preview = event => {
    const files = event.target.files;
    const filename = files[0].name;
    if (filename.lastIndexOf(".") <= 0){
      return alert("Please add a valid file!");
    }
    const fileReader = new FileReader();
    fileReader.addEventListener("load",() => image = fileReader.result);
    fileReader.readAsDataURL(files[0]);
  };

  const handleSubmit = (isFormValid) => {
    if (!isFormValid) { return; }
    // state.type = isAppendType.value.toLowerCase()
    // emits("addPerk", state)
    // isAppendVisible.value = false
  };
};

export default newData;