const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Home" element={<Home />} />
      
      <Route path="About" element={<About />} />
      <Route path="Reels" element={< Reels/>} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
import { render } from "@testing-library/react";
import React,{Component} from "react";

class App extends React.Component{
  constructor(props){
    super(props)

    this.state={
      isLoggedIn:false

    }

  }

render(){
  if(this.state.isLoggedIn){
    return <div>Logged in</div>
  }else{
    return <div>Guest Acc</div>
  }
}
}
export default App;

import { render } from "react-dom";
import React,{useEffect, useState} from  "react";
import Home from "./Home";
import story  from "./About";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


/*  function App(){
//   return(
//     <>
      
//        <Router>
        

//                <Route path="/" component={Home}/>
//                <Route path="about" component={story}/>

          
//        </Router>
    
    
    
//     </>
//   )
// }

// export default App;












/*function App(){

  const [display,setdisplay]=useState(0);
  const [item,setItem]=useState([]);

  
useEffect(()=>{
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => console.log(json))
});


  return(
    <>
    <div>
       
       <button onClick={()=>setdisplay('post')}>post</button>
       <button onClick={()=>setdisplay('user')}>user</button>
       <button onClick={()=>setdisplay('commends')}>commends</button>
       </div>
       
        <h1>{display}</h1>
        {item.map(()=><pre>{JSON.stringify()}</pre>)}
      
       </>
  );

}
export default App;*/

// export default function App(){
//   const [width,setwidth]=useState(window.innerWidth);
//   const handlesize=()=>{
//     setwidth(window.innerWidth);
//   }
//   useEffect(()=>{
//     window.addEventListener('resize',handlesize);

//   })
//   return(
//     <div>{width}</div>

//   );
// }










// function App(){
      
//   const [count,setCount]=useState(0);

//   useEffect(() => {
//     setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//   });


//   return(
//     <>
// <h1>{count}</h1>
    
//     </>

//   )
// }
// export default App;


// function App(props){
//   const {name}=props;
//   return(
//     <div>{name}</div>

//   )
// }
// export default App;

/*----State-----class App extends Component {

  constructor(props) {

    super(props);

     this.state = {

      make: "Yamaha",

      model: "R15",

      color: "blue"

    };

  }

  changeBikeColor = () => {

    this.setState({color: "black"});

  }

  render() {

    return (

      <div>

        <h2>My {this.state.make}</h2>

        <p>

          It is a {this.state.color}

          {this.state.model}.

        </p>

        <button

          type="button"

          onClick={this.changeBikeColor}

        >Change color</button>

      </div>

    );

  }

}
export default App;*/


/*function App(){
  const games=[{id:1,name:"cricket"},{id:2,name:"football"},{id:3,name:"vollyball"},{id:4,name:"carram"}]

  return(
    <div>
    <h1>List of Games</h1>
    <ul>
      {
      games.map(data=>(
        <li>{data.id}{data.name}</li>
      ))
}
      </ul>
      </div>
  )
}
export default App;*/




//  function App(){
//   const players=[{id:1,name:"cricket"},{id:2,name:"football"},{id:3,name:"vollyball"},{id:4,name:"carram"}];
//   return(
//   <div>
//    {players.map((players)=>(
//     <h1>{players.name}</h1>

//    ))}

//   </div>
//   )
// }
// export default App;





// -------------------Post Method--------------

// function App(){
//   const [name,setName]=useState("");
//   useEffect(()=>{
//       Axios.get('https://jsonplaceholder.typicode.com/posts')
//      .then(res=> console.log(res.data))
//   })
  
//   const postuser=()=>{
//       Axios.post('https://jsonplaceholder.typicode.com/posts',{name:name})
//       .then(res=> console.log(res.data))

//   }

//   return(
//       <div>
//            <label>
//               Username
//               <input type="text"
//               value={name}
//               onChange={(e)=>setName(e.target.value)}

             
                
//               />
//             </label>
//             <button onClick={postuser}>Register</button>
     
//       </div>
//   )
// }
// export default App;






















