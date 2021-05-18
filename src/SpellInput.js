import React, { useState, useEffect } from "react";
import firebase from './firebase';
import { MenuItem,  FormControl,  Select,  Card,  CardContent } from "@material-ui/core";

const SpellInput = ({ spell }) => {

    var textBox = {
        margin: '15px 0 5px 0'
    }

    var buttons = {
        margin: '-15px 5px 10px 0',
        float: 'right'
    }

    var show = {
      padding: '35px 0 10px 10px',
      lineHeight: '30px'
    }


  const [name, setName] = useState(spell.name);
  const [secondName, setsecondName] = useState(spell.secondName);
  const [email, setemail] = useState(spell.email);
  const [edit, setEdit] = useState(false);
  const [swap, setSwap] = useState(false);
  
  // const [spells, setSpells] = useState([]);

  // const fetchData = async () => {
  //   const db = firebase.firestore();
  //   const data = await db.collection("spells").get();
  //   setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  // };
 
  //   useEffect(() => {
  //   fetchData();
    
  // });
  
  const onEdit = () => {
    setEdit(true);
  }

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('spells').doc(spell.id).set({...spell, name, secondName, email});
    setEdit(false);
    //alert('The data has been updated')
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('spells').doc(spell.id).delete();
    // var deleted = document.getElementById(spell.id);
    // deleted.remove();
  }

  var count = localStorage.getItem('swapCount');

  const onSwap = () => {

     if(count == null || count == 0 ){

      localStorage.setItem('swapCount',1);
      localStorage.setItem('spellId', spell.id);
      localStorage.setItem('firstName',spell.name);
      localStorage.setItem('lastName',spell.secondName);
      localStorage.setItem('email',spell.email);
      setSwap(true);

    }else if(count == 1){

      localStorage.setItem('swapCount',2);
      localStorage.setItem('swapspellId', spell.id);
      localStorage.setItem('swapfirstName',spell.name);
      localStorage.setItem('swaplastName',spell.secondName);
      localStorage.setItem('swapemail',spell.email);

      setSwap(true);

      var id1 = localStorage.getItem('spellId');
      var name1 = localStorage.getItem('firstName');
      var lastname1 = localStorage.getItem('lastName');
      var email1 = localStorage.getItem('email');
      
      var id2 = localStorage.getItem('swapspellId');
      var name2 = localStorage.getItem('swapfirstName');
      var lastname2 = localStorage.getItem('swaplastName');
      var email2 = localStorage.getItem('swapemail');

      const db = firebase.firestore()

      db.collection('spells').doc(id2).set({...spell, 'name':name1, 'secondName':lastname1, 'email':email1});
      db.collection('spells').doc(id1).set({...spell, 'name':name2, 'secondName':lastname2, 'email':email2});

      localStorage.clear();
      localStorage.setItem('swapCount',0);

    }else{
      setSwap(false);
    }  

  }

  var test = {
    backgroundColor: 'white',
    width: '100%'
  }

  return (
    <>
    <div>
    <div style={buttons}>
      {
        edit ? 
        <button className='btn btn-info' id={'update'+ spell.id} onClick={onUpdate} style={buttons}>Update</button> 
        :
        <button className='btn btn-info' id={'edit'+ spell.id} onClick={onEdit} style={buttons}> <i class="glyphicon glyphicon-edit"></i></button>
      }
       
      <button className='btn btn-danger' onClick={onDelete} style={buttons}><i class="glyphicon glyphicon-trash"></i></button>
      {
        swap
        ?
        <button className='btn btn-success' style={buttons}><i class="glyphicon glyphicon-refresh"></i></button>
         :
         <button className='btn btn-warning' onClick={onSwap} style={buttons}><i class="glyphicon glyphicon-refresh"></i></button>
      }
      

     
      </div>
      {
        edit ?  <div classname='edit'>
        <div>
          <input value={name} class="form-control" style={textBox} onChange={e => {setName(e.target.value); }} />
          </div>
          <div>
          <input value={secondName} class="form-control" style={textBox} onChange={e => {setsecondName(e.target.value); }} />
        </div>
        <div>
          <input value={email} class="form-control" style={textBox} onChange={e => { setemail(e.target.value); }}/>
        </div>
        </div> : 
        <div className='show' style={show}>
        <div>
          <label>{name}</label>
          </div>
          <div>
          <label>{secondName}</label>
        </div>
        <div>
        <label>{email}</label>
        </div>
        </div>
      }
     
    </div>
    </>
  );
};

export default SpellInput;
