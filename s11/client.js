let axios = require("axios");

axios.post("http://127.0.0.1:8037/x", {
    firstName: 'Morteza',
    lastName: 'Sahami'
  })
  .then(function (response) {
    console.log("SUCCESS status:", response.status);
    console.log("SUCCESS headers:", response.headers);
    console.log("SUCCESS data:", response.data);
    console.log("proccess is successfull")
  })
  .catch(function (error) {
    console.log("ERROR:", error);
  })