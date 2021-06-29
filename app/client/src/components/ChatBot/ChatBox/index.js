/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { APl } from '../../../constant';
import { Card } from 'reactstrap';
import people2 from '../../../assets/images/stock-logos/airbnb.svg';
import people1 from '../../../assets/images/stock-logos/airbnb.svg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../../../assets/images/logo.png';
import './ChatBox.css';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { useSelector } from 'react-redux'

import 'animate.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    borderRadius: '20%',
    backgroundColor: '#EAECEE'
  },
  container: {
    // border: "2px solid red",
    // minHeight: "89vh"
  },
  item: {
    // border: "2px solid black",
    padding: '0.2rem'
  },
  mainDiv: {
    minHeight: '84vh',
    // border: "2px solid black",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  userMessageBox: {
    // overflowY: "hidden",
    // whiteSpace: "wrap",
    maxWidth: '40rem',
    borderRadius: '30px 0px 30px 30px', // optimised for large messages
    padding: '0.9rem',
    backgroundColor: '#EAECEE',
    fontSize: '1.1rem',
    position: ' relative',
    '&::before': {
      content: "''",
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      borderTop: '15px solid #EAECEE',
      borderBottom: '15px solid transparent',
      right: '-13px',
      top: '0px'
    }
  },
  serverMessageBox: {
    maxWidth: '40rem',
    borderRadius: '0px 30px 30px 30px', // optimised for large messages
    padding: '0.9rem',
    backgroundColor: '#EAECEE',
    fontSize: '1.1rem',
    position: ' relative',
    '&::before': {
      content: "''",
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      borderTop: '15px solid #EAECEE',
      borderBottom: '15px solid transparent',
      left: '-13px',
      top: '0px'
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '1.5rem'
    },
    marginLeft: '0.2rem'
  },
  logo: {
    // border:"2px solid red",
    width: '51px',
    height: '51px',
    marginLeft: '1rem'
  },
  logoDiv: {}
}));
const randomNumber = Math.round(Math.random() * 10000000);
const ChatBox = () => {
  const { isAuth, user, country } = useSelector(state => state.appReducer);
  const classes = useStyles();
  const params = useParams();
  const { msg } = params;
  const [messages, setMessages] = useState([]);
  // const [serverMessages, setServerMessages] = useState([]);
  const text = msg ? msg : '';
  const [textField, setTextField] = useState(text);
  const [isThinking, setIsThinking] = useState(false);
  const [disableInput, setdisableInput] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }

    if (isListening) {
      // play start sound
    } else {
      // play end sound
    }

    function regEvent(event) {
      if (event.code === 'Space') {
        // console.log("Space is pressed : ", onFocus, onBlur)
        console.log('isListening...', isListening);

        if (!textField.trim() && !isListening) {
          console.log('start Listening');
          runSpeechRecognition();
        }
      }
    }

    window.addEventListener('keypress', regEvent);

    return () => {
      window.removeEventListener('keypress', regEvent);
    };
  }, [messages, textField, isListening]);

  // console.log('textfiel', textField)


  const handleSubmit = (e, button = false, title = "") => {
    e.preventDefault();
    let ccode = "";
    if (country) {
      ccode = country.country_code;
    }

    let email = "anonymus" + "_" + randomNumber + "_" + ccode;
    if (isAuth) {
      email = user.email + "_" + ccode
    }

    if (button) {
      setIsThinking(true);

      setMessages((previousValue) =>
        previousValue.concat([{ message: title, from: 'user' }])
      );

      setTextField('');
      axios({
        method: 'post',
        url: `api/bot`,
        // url: `http://45.79.126.207/webhooks/rest/webhook`
        data: {
          message: button,
          from: email
        },
        // data: {
        //   message: textField,
        //   sender: 'abc@abc.com'
        // },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache', // required for safari to behave normally
          Expires: '0'
        }
      })
        .then((res) => {
          // console.log("response", res)
          // console.log("messages: ======================= ", messages);

          // // example response
          // [
          //     {
          //         "recipient_id": "test_user",
          //         "text": "hello"
          //     },
          //     {
          //         "recipient_id": "test_user",
          //         "text": "how are you doing today"
          //     }
          // ]

          // let respData = res.data.map(eachItem=>{
          //     return {
          //         from: "chatbot",
          //         message: eachItem.text
          //     }
          // })
          // setMessages(previousValue => previousValue.concat(respData))
          // let respData = res.data.map((eachItem) => {
          //   return {
          //     from: 'chatbot',
          //     message: eachItem.text
          //   };
          // });
          // setMessages((previousValue) => previousValue.concat(respData));
          if (res.data[0] && res.data[0].buttons) {
            setdisableInput(true);
          } else {
            setdisableInput(false);
          }
          setMessages((previousValue) => previousValue.concat(res.data));
          setIsThinking(false);
        })
        .catch((err) => {
          // console.log("Error", err)
        });
    } else {
      setIsThinking(true);
      setMessages((previousValue) =>
        previousValue.concat([{ message: textField, from: 'user' }])
      );

      setTextField('');
      axios({
        method: 'post',
        url: `api/bot`,
        data: {
          message: textField,
          from: email
        },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache', // required for safari to behave normally
          Expires: '0'
        }
      })
        .then((res) => {
          if (res.data[0] && res.data[0].buttons) {
            setdisableInput(true);
          } else {
            setdisableInput(false);
          }
          setMessages((previousValue) => previousValue.concat(res.data));
          setIsThinking(false);
        })
        .catch((err) => {
          // console.log("Error", err)
        });
    }
  };
  const handleChange = (e) => {
    setTextField(e.target.value);
  };

  function runSpeechRecognition() {
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function () {
      setIsListening(true);
    };

    // This runs when the speech recognition service stops
    recognition.onspeechend = function () {
      setIsListening(false);
      recognition.stop();
    };

    // This runs when the speech recognition service returns result
    recognition.onresult = function (event) {
      var transcript = event.results[0][0].transcript;
      var confidence = event.results[0][0].confidence;

      setMessages((previousValue) =>
        previousValue.concat([{ message: transcript, from: 'user' }])
      );
      axios({
        method: 'post',
        url: `http://localhost:3001/api/bot`,
        data: {
          message: transcript,
          from: `abc123@abc.com`
        },
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache', // required for safari to behave normally
          Expires: '0'
        }
      })
        .then((res) => {
          // console.log("response", res)
          // console.log("messages: ======================= ", messages);
          setMessages((previousValue) => previousValue.concat([res.data]));
          // setIsThinking(false)
        })
        .catch((err) => {
          // console.log("Error", err)
        });
    };
    // start recognition
    recognition.start();
  }

  return (
    <div className={classes.mainDiv}>
      {/* Messages container */}
      <Grid
        container
        className={classes.container}
        style={{ paddingBottom: '4.6rem' }}>
        <img
          src={logo}
          alt=""
          className={
            classes.logo +
            ' animate__animated animate__shakeY animate__infinite animate__delay-5s'
          }
        />

        <Grid
          item
          xs={12}
          className={classes.item}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            textAlign: 'right',
            paddingLeft: '0.7rem'
          }}>
          <div className={classes.serverMessageBox}>How can i help you today with services that you need ?</div>
        </Grid>

        {messages.map((eachMessage, ind) => {
          return eachMessage.from !== 'chatbot' ? (
            <Grid
              ref={scrollRef}
              item
              xs={12}
              key={ind}
              className={classes.item}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                textAlign: 'right',
                paddingRight: '1.5rem'
              }}>
              <div className={classes.userMessageBox}>
                {eachMessage.message}
              </div>
              {/* <p className={classes.messageParagraph} style={{}}>{eachMessage.message}</p> */}
            </Grid>
          ) : (
            <Grid
              ref={scrollRef}
              item
              xs={12}
              key={ind}
              className={classes.item}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                textAlign: 'right',
                paddingLeft: '0.7rem'
              }}>
              <div className={classes.serverMessageBox}>
                {eachMessage.message}
                {eachMessage.buttons && (
                  <Card className="mt-3 mb-2 pt-2 pb-2 text-center">
                    <div>
                      {eachMessage.buttons.map((s) => (
                        <Button
                          type="submit"
                          disabled={ind == (messages.length - 1) ? false : true}
                          onClick={(e) => handleSubmit(e, s.payload, s.title)}
                          className="rounded m-1 shadow-sm">
                          {s.title}
                        </Button>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </Grid>
          );
        })}

        {/* TODO: please add this animation only on chatbot each new message: https://codepen.io/clemens/pen/kXZWOK */}
        <div
          style={{
            display: `${isThinking ? 'flex' : 'none'}`,
            justifyContent: 'flex-start',
            alignitems: 'center',
            marginBottom: '0.45rem',
            marginLeft: '0.25rem'
          }}
          className="">
          <img
            src={logo}
            alt=""
            className={
              classes.logo +
              ' animate__animated animate__shakeY animate__infinite animate__faster'
            }
          />
          <span
            style={{
              border: '1px solid #EAECEE',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '2rem',
              paddingRight: '0.5rem',
              paddingLeft: '0.5rem',
              marginBottom: '0.5rem',
              marginTop: '0.5rem'
            }}
            className="span">
            <Brightness1Icon className="material-icon animate__animated animate__shakeY animate__infinite animate__faster"></Brightness1Icon>
            <Brightness1Icon className="material-icon animate__animated animate__shakeY animate__infinite animate__delay-2s animate__faster"></Brightness1Icon>
            <Brightness1Icon className="material-icon animate__animated animate__shakeY animate__infinite animate__delay-3s animate__faster"></Brightness1Icon>
          </span>
        </div>
      </Grid>

      {/* footer */}
      <form
        style={{
          position: 'fixed'
        }}
        onSubmit={(e) => handleSubmit(e)}
        className="forForm">
        <Grid
          container
          style={{
            borderTop: '1px solid #BFBFBF',
            backgroundColor: 'white'
          }}>
          <Grid
            item
            xs={10}
            md={11}
            style={{
              paddingLeft: '3rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              paddingRight: '1rem'
            }}>
            <TextField
              required
              id="output"
              disabled={disableInput}
              style={{ width: '100%' }}
              value={textField}
              onChange={handleChange}
              placeholder={`Say "Hi" to Chatbot`}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                disableUnderline: true
              }}></TextField>
          </Grid>
          <Grid
            item
            xs={2}
            md={1}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignitems: 'center'
            }}>
            <span id="action"></span>
            <Button id="form-button" style={{ width: '100%' }}>
              {textField.trim() ? (
                <SendIcon
                  onClick={(e) => handleSubmit(e)}
                  style={{ color: '#3F51B5', fontSize: '2.3rem' }}
                />
              ) : !isListening ? (
                <MicIcon
                  onClick={() => runSpeechRecognition()}
                  style={{ color: '#3F51B5', fontSize: '2.3rem' }}
                />
              ) : (
                <p onClick={() => setIsListening(false)}>listening</p>
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default ChatBox;
