import React, { useState } from "react"; 
function Simplenew_form() { 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`The firstname you entered was: ${firstname}`)
    console.log(`The lastname you entered was: ${lastname}`)
    alert(`The name you entered was: ${firstname}`)
  }
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [place, setPlace] = useState("");
const [gender, setGender] = useState("");
const [age, setAge] = useState("");
const [language, setLanguage] = useState("");
const [description, setDescription] = useState("");

return ( 
<div classname="details"> 
<h1>Bio</h1>
<form onSubmit={handleSubmit}> 
<label for="fname">FirstName :</label>
<input  placeholder="Enter your firstname" type="text" 
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)} /> &nbsp; 
<label for="lname">LastName: </label> <input type="text" placeholder="Enter your lastname"           value={lastname}
          onChange={(e) => setLastname(e.target.value)} /> <br></br>
<div classname="dropdown"> <label for="places"> Places : </label> <select> <option value="place">Namakkal</option> 
<option value="place">Tgode</option> <option value="place">salem</option> <option value="place">rasi</option>
<option value="place">palani</option> </select> </div> <br></br> <div classname="radiog">
<label for="gender">Gender : </label> <input type="radio" name="gender" /> Male <input type="radio" name="gender" />
 Female <input type="radio" name="gender" /> Other </div> <br></br> <div classname="radioa">
 <label for="age"> Age : </label> <input type="radio" name="age" /> 10-20 <input type="radio" name="age" /> 20-30 <input type="radio" name="age" /> 30-40 & Above </div> <br></br>
 <div classname="lang"> <label for="Language"> Language : </label> <label for="language1"> Tamil </label>
 <input type="checkbox"></input> <label for="language2"> English </label> <input type="checkbox"></input>
 <label for="language3"> Hindi </label> <input type="checkbox"></input> {/* <label for="language1"> Others </label>
 <input type="checkbox"></input> */} </div> <br></br> <div classname="desc"> 
<label for="description "> Description : <textarea placeholder="Enter the description"/> </label>
 </div> 
 <input type="submit" />
</form>
</div> ); 
} 
export default Simplenew_form;