import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";
import Sound from "../Assets/sound.mp3";
import setting_icon from "../Assets/setting.svg";
import { NoneEmpty } from "../utility/NoneEmpty";
import { playClickSound } from "../utility/playClickSound";

let data = ["","","","","","","","",""]

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [matchWin, setMatchWin] = useState(false);
  let [autoPlay, setAutoPlay] = useState(false);
  let [sound, setSound] = useState(true);
  let titleRef = useRef(null);
  const { width, height } = useWindowSize();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let audio = new Audio(Sound);

  let boardRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]


  useEffect(() => {
    handleShow();
  },[])
  
  const toggle = (e, num) => {
    if(lock){
      return 0
    }

    if(count%2===0){
      e.target.innerHTML = `<img src='${cross_icon}' />`;
      data[num] = "x";
      setCount(++count);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' />`;
      data[num] = "o";
      setCount(++count);
    }

    e.target.classList.add('active');

    checkWin();

    if(sound){
      playClickSound();
    }

    if(autoPlay && e.isTrusted){
      boardRef.current.classList.add("pe-none")
      setTimeout(autoPlayHandler,1000)
    }
  }

  function autoPlayHandler(){
    if(!NoneEmpty(data)){

      const emptyIndexes = data.reduce((acc, curr, index) => {
        if (curr === '') {
          acc.push(index);
        }
        return acc;
      }, [])
      
      const random = Math.floor(Math.random() * emptyIndexes.length);
      const randomIndex = emptyIndexes[random];
      
      if(emptyIndexes?.length > 0 && !matchWin){
        box_array.map((e,i) => {
          if(i === randomIndex){
            e.current.click();
          }
          return true;
        })

        boardRef.current.classList.remove("pe-none")
      }
    }
  }

  const checkWin = () => {
    if(data[0]===data[1] && data[1]===data[2] && data[2]!==""){
      won(data[2], [0,1,2])
    } else if(data[3]===data[4] && data[4]===data[5] && data[5]!=="") {
      won(data[5], [3,4,5])
    } else if(data[6]===data[7] && data[7]===data[8] && data[8]!=="") {
      won(data[8], [6,7,8])
    } else if(data[0]===data[3] && data[3]===data[6] && data[6]!=="") {
      won(data[6], [0,3,6])
    } else if(data[1]===data[4] && data[4]===data[7] && data[7]!=="") {
      won(data[7], [1,4,7])
    } else if(data[2]===data[5] && data[5]===data[8] && data[8]!=="") {
      won(data[8], [2,5,8])
    } else if(data[0]===data[4] && data[4]===data[8] && data[8]!=="") {
      won(data[8], [0,4,8])
    } else if(data[2]===data[4] && data[4]===data[6] && data[6]!=="") {
      won(data[6], [2,4,6])
    } else {
      if(NoneEmpty(data)) {
        titleRef.current.innerHTML = `Match is Draw`
      }
    }    
  }

  const won = (winner, arr) => {
    setLock(true);
    setMatchWin(true);
    
    if(sound){
      audio.play();    
    }
    
    if(winner === "x") {
      titleRef.current.innerHTML = `Congratulations: <img src='${cross_icon}'/> wins`
    } else {
      titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}'/> wins`
    }   

    box_array.map((e,i) => {
      if(arr.includes(i)){
        e.current.classList.add('active', 'win');
      } else {
        e.current.classList.add("pe-none");
      }
      return true;
    });
  }

  const reset = () => {
    setLock(false);
    setMatchWin(false);
    data = ["","","","","","","","",""]
    titleRef.current.innerHTML = 'Tic Tac Toe Game in <span>React</span>';
    boardRef.current.classList.remove("pe-none");

    box_array.map((e) => {
      e.current.innerHTML = "";
      e.current.classList.remove('active', 'win', 'pe-none');
      return true;
    })
  }

  const checkboxChangeHandler = () => {
    setAutoPlay(!autoPlay);
  }

  const soundChangeHandler = () => {
    setSound(!sound);
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    
    if(e.target.elements.autoplay.checked){
      setAutoPlay(true);
    }

    if(e.target.elements.sound.checked){
      setSound(true);
    }
    
    handleClose();
  }

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe Game in <span>React</span>
      </h1>
      
      <div ref={boardRef} className='board'>
        <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
        <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
        <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>       
        <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
        <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
        <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>        
        <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
        <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
        <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>        
      </div>
      <button className="reset" onClick={() => reset()}>Reset</button>
      <button onClick={handleShow} className='setting_btn'><img src={setting_icon} alt='setting' width={20} height={20} /></button>
      
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Setting</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formSubmitHandler}>
          <Row>
            <Col>
              <strong>AutoPlay</strong>
            </Col>
            <Col xs="auto">
              <label className="switch">
                <input name='autoplay' type="checkbox" onChange={checkboxChangeHandler} checked={autoPlay} />
                <span className="slider round"></span>
              </label>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <strong>Sound</strong>
            </Col>
            <Col xs="auto">
              <label className="switch">
                <input name='sound' type="checkbox" onChange={soundChangeHandler} checked={sound} />
                <span className="slider round"></span>
              </label>
            </Col>
            <Col xs={12} className='text-center border-top mt-3 pt-3'><Button type='submit' variant="primary">Save</Button></Col>
          </Row>
          </form>
        </Modal.Body>
      </Modal>

      {matchWin && <Confetti width={width} height={height} numberOfPieces={500} />}
    </div>
  )
}

export default TicTacToe
