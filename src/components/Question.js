import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const Question = ({qstID, qstText, type, suggestions, setQstResponse, size, ...props}) => {

    useEffect(() => {
    }, [])
    const onChange = (answer) => {
        setQstResponse(qstID, answer)
    }
    const Suggestions = () => {
        switch (type) {
            case "radio":
                return suggestions.map(e => (
                    <SuggestionRadio
                        key={e.value}
                        onChange={onChange}
                        answerID={e.value}
                        answerText={e.label}
                        qstID={qstID}
                        size={size}
                        img={e.img}
                    />
                ))
            case "checkbox":
                return suggestions.map(e => (
                    <SuggestionCheckbox
                        key={e.value}
                        onChange={onChange}
                        answerID={e.value}
                        answerText={e.label}
                        qstID={qstID}
                        size={size}
                        img={e.img}
                    />
                ))
            default:
                return <p>Not set</p>
        }
    }
    return (
        <div className="question">
            <div className="question-content">
                <h3>{qstText}</h3>
                <div className="row justify-content-between an-container">
                    {Suggestions()}
                </div>
            </div>
        </div>
    );
}

const SuggestionRadio = ({qstID, answerID, answerText, img, onChange, size, ...props}) => {
    const inputRef = useRef()
    useEffect(() => {
    },[])
    const handleChange = (value) => {

    }

    return <div className={`col-${size}`}>
        <div className="answer-container">
            <label className={`answer radio-answer ${inputRef.current?.checked ? "active" : ""}`}>
                <input ref={inputRef} onChange={(e) => {
                    onChange(e.target.value)
                }} value={answerID} name={`qst_${qstID}`} type="radio"/>
                {
                    img ? <div className={"img-desc-container"}>
                            <img alt={answerText} src={img}/><br/>
                            <p className="img-desc">{answerText}</p>
                        </div>
                        :
                        <span>{answerText}</span>
                }

            </label>
        </div>
    </div>
}
const SuggestionCheckbox = ({qstID, answerID, img, answerText, onChange, size, ...props}) => {
    const inputRef = useRef()
    useEffect(() => {

    }, [])
    const handleChange = (value) => {
        console.log(value)
    }
    return <div className={`col-${size}`}>
        <div className="answer-container">
            <label className={`answer radio-answer ${inputRef.current?.checked ? "active" : ""}`}>
                <input ref={inputRef} onChange={(e) => {
                    onChange(e.target.value)
                }} value={answerID} name={`qst_${qstID}`} type="checkbox"/>
                {
                    img ? <div className={"img-desc-container"}>
                            <img alt={answerText} src={img}/><br/>
                            <p className="img-desc">{answerText}</p>
                        </div>
                        :
                        <span>{answerText}</span>
                }

            </label>
        </div>
    </div>
}

Question.propTypes = {};

export default Question;