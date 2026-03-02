let output = document.getElementById("output");

const handleSubmit = (e) => {
  e.preventDefault();
  const result = [];
  const formData = new FormData(e.target);
  let fname = formData.get("firstname");
  let age = formData.get("age");
  let gender = formData.get("gender");
  let skills = formData.getAll("skills");

  if (!fname || fname.trim() === "") {
    output.innerText = "Enter Name";
    return;
  }
  if (!age) {
    output.innerText = "Enter Age";
    return;
  }
  if (!gender) {
    output.innerText = "Enter gender";
    return;
  }
  if (skills.length == 0) {
    output.innerText = "Enter  skills";
    return;
  }
  const objform = Object.fromEntries(formData.entries());
  objform.skills = formData.getAll("skills");
  console.log(objform, "object form data");

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objform),
  })
    .then((res) => res.json())
    .then((data) => (output.innerText = JSON.stringify(data)))
    .catch((err) => {
      console.log("error:", err);
    });

  console.log(objform, "object form data");

  //   output.innerText = `Output:${result.join(", ")}`;
};
