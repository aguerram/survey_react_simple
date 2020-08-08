import React, {useEffect, useRef, useState} from 'react';
import Carousel from '@brainhubeu/react-carousel';
import Question from "./components/Question";
import Container from "./components/Container";
// import config from "./config.json"

let prevButton, nextButton

function App({config,...props}) {
    const [pos, setPos] = useState(0)
    const [maxPos, setMaxPost] = useState(0)
    const [ready, setReady] = useState(false)
    const [answer, setAnswer] = useState({})
    const [selectedQst, setSelectedQst] = useState(0)
    const [start, setStart] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)
    const [welcomeMessage,setWelcomeMessage] = useState({})
    const nextRef = useRef()
    const prevRef = useRef()
    const submitText = useRef()
    const formRef = useRef()


    const setQstResponse = (qst, _answer) => {
        console.log(answer)
        setAnswer(old => ({
            ...old,
            [qst]: _answer
        }))
    }
    const checkRefs = (callback) => {
        if (nextRef.current && prevRef.current) {
            callback()
        } else {
            setTimeout(() => {
                checkRefs(callback)
            }, 100)
        }
    }
    const checkExistAnswer = (qstID) => {
        if (!qstID)
            return false
        return answer[qstID] != null
    }
    const disableNextButton = () => {
        if (!nextButton)
            return
        nextButton.setAttribute("disabled", "true")
    }
    const activateNextButton = () => {
        if (!nextButton)
            return
        nextButton.removeAttribute("disabled")
    }
    useEffect(() => {
        if (data) {
            if (pos > maxPos) {
                formRef.current.submit()
            }
            if (pos >= maxPos) {
                submitText.current.innerText = "Submit"
                nextRef.current.classList.add("submit")
            } else {
                if (submitText.current) {
                    submitText.current.innerText = "Next"
                    nextRef.current.classList.remove("submit")
                }
            }
        }

    }, [pos])
    useEffect(() => {
        fetch(`${config.JSON_LOCATION}/quiz_${config.LOCAL}.json`)
            .then(e=>e.json())
            .then(e=>{
                const _d = e.data
                const _w = e.welcome
                setWelcomeMessage(_w)
                setData(_d)
                setMaxPost(_d.length-1)
                setSelectedQst(_d[0])
            })
            .catch(ex => {
                setError(true)
            })
    }, [])
    useEffect(() => {
        if (ready && data) {
            prevRef.current.onclick = () => {
                setPos(pos - 1)
                setSelectedQst(data[pos - 1])
                activateNextButton()
            }
            nextRef.current.onclick = () => {
                if (!checkExistAnswer(data[pos + 1]?.qstID)) {
                    disableNextButton()
                }
                setSelectedQst(data[pos + 1])
                setPos(pos + 1)
            }
            if (pos === 0) {
                prevRef.current.setAttribute("disabled", "true")
            } else {
                prevRef.current.removeAttribute("disabled")
            }
            if (pos === maxPos - 1) {
                nextRef.current.setAttribute("disabled", "true")
            }
            if (checkExistAnswer(selectedQst?.qstID)) {
                nextRef.current.removeAttribute("disabled")
            }
        }
    })
    useEffect(() => {
        if (data) {
            if (pos >= maxPos)
                return
            if (checkExistAnswer(selectedQst?.qstID)) {
                activateNextButton()
            }
        }
    }, [answer])
    useEffect(() => {
        if (data) {
            checkRefs(() => {
                prevButton = prevRef.current
                nextButton = nextRef.current
                disableNextButton()
                setReady(true)
            })
        }
    }, [data])
    if (!data && !error) {
        return <Container>
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <div className="spinner">
                    <div className="double-bounce1"/>
                    <div className="double-bounce2"/>
                </div>
            </div>
        </Container>
    }
    if(error)
    {
        return <Container>
            <>
                <h3>Couldn't load content related to your local.</h3>
            </>
        </Container>
    }
    if (!start)
        return <div className="App">
            <div className="container vh-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="questions-container col-12 col-md-8">
                        <div className="question">
                            <div className="question-content">
                                <h3>{welcomeMessage.header}</h3>
                                <p className="p-4 text-justify">
                                    {welcomeMessage.content}
                                </p>
                                <p className="text-center counter-qst">
                                    <small>{data.length} {welcomeMessage.questions}</small>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <button onClick={() => {
                                setStart(true)
                            }} type="button" className={"col-12 btn prev"}>
                                GET FIT NOW
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    return (
        <div className="App">
            <div className="container vh-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <form ref={formRef} action={config.FORM_URL} method={"post"}
                          className="questions-container col-12 col-md-8">
                        <p className="step-counter">
                            {
                                pos <= maxPos ?
                                    <span><b>{pos + 1}</b> of <b>{maxPos + 1}</b></span> :
                                    <span>Submit</span>
                            }
                        </p>
                        <Carousel plugins={[
                            'arrows',
                            'clickToChange'
                        ]}
                                  value={pos}
                                  animationSpeed={500}
                                  draggable={false}>
                            {
                                data.map(e => (
                                    <Question
                                        key={e.qstID}
                                        setQstResponse={setQstResponse}
                                        {...e}
                                    />
                                ))
                            }
                        </Carousel>

                        <div className={"row"}>
                            <button ref={prevRef} type="button" className={"col-6 btn prev"}><i
                                className="icon-material-outline-keyboard-arrow-left"/> Previous
                            </button>
                            <button ref={nextRef} type="button" className={"col-6 btn next"}><span
                                ref={submitText}>Next</span> <i
                                className="icon-material-outline-keyboard-arrow-right"/></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
