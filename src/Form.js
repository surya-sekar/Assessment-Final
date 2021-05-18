import React, {useState, useEffect} from "react";
import "./App.css";
import firebase from "./firebase";
import SpellInput from "./SpellInput";

function Form() {

  var container = {
    backgroundColor: '#cad5e3',
    width: '100%',
    borderRadius: '5px',
    marginTop: '5%',
    borderStyle: 'dashed',
    borderColor: '#5b5bde',
    padding: '5%'
}

var button = {
  backgroundColor: '#4a32a8',
  borderColor: '#4a32a8',
  marginTop: '5%',
  float: 'left',
  width: '30%',
  padding: '9px',
  color: 'white',
  borderRadius: '1%'
}

var label = {
    float: 'left',
    marginLeft: '2%',
    color: 'black',
    fontSize: '20px',
    marginRight: '8px'
}

var textBox = {
  width: '80%',
}

var result = {
  padding: '1%',
  marginLeft: '7%',
  backgroundColor: 'black',
  marginBottom: '2%',
  marginTop: '2%',
  borderRadius: '5%',
  color: 'white'
}

var i = 0;

  const [spells, setSpells] = useState([]);
  const [newSpellName, setNewSpellName] = useState();
  const [secondSpellName, setsecondSpellName] = useState();
  const [email, setemail] = useState();


  const onCreate = () => {
    const db = firebase.firestore();

    if(newSpellName.length > 45){
      alert('First Name exceeding 45 characters');
      setNewSpellName('');
      setsecondSpellName('');
      setemail('');
    }else if(secondSpellName.length > 45){
      alert('Second Name exceeding 45 characters');
      setNewSpellName('');
      setsecondSpellName('');
      setemail('');
    }else if(email.length > 45){
      alert('Email address exceeding 45 characters');  
      setNewSpellName('');
      setsecondSpellName('');
      setemail('');    
    }else{
      db.collection("spells").add({ name: newSpellName , secondName: secondSpellName , email: email});
      alert('New data has been inserted');
      setNewSpellName('');
      setsecondSpellName('');
      setemail('');
    }

  };

  const fetchData = async () => {
    const db = firebase.firestore();
    const data = await db.collection("spells").get();
    setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };
 
    useEffect(() => {
    fetchData();
    
  });



  return (
    <>
    <div className="container" style={container}>
    <div className="row">
      <div className="col">
            <label style={label}>First Name</label>
            <input class="form-control" style = {textBox} value={newSpellName} onChange={e => setNewSpellName(e.target.value)} />
            </div>
            <div className="col">
            <label style={label}>Last Name</label>
            <input class="form-control" style = {textBox} value={secondSpellName} onChange={e => setsecondSpellName(e.target.value)} />
            </div>
            <div className="col">
            <label style={label}>Email</label>
            <input class="form-control" type='email' style = {textBox} value={email} onChange={e => setemail(e.target.value)} />
            </div>
            <div className="col">
            <button style={button} onClick={onCreate}>Create</button>
            </div>
            </div>
    </div>
    <div className="row">
      <div className="col-sm-12">   
      {spells.map(spell => (
        <div className="col-sm-2" id={spell.id} style={result} key={spell.id}>
        <label>#{++i}</label>    
          <SpellInput spell={spell} />
        </div>
      ))}
      
      </div>
      </div>
    </>
    
  );
}

export default Form;