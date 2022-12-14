import React, {Component} from 'react';
import './charDetails.css';
import GoTService from "@services/GoTService.js";



export default class CharDetails extends Component {
    goTService = new GoTService();
    state =  {
        char: null
    }
    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        } 
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return null;
        }
        this.goTService.getCharacter(charId)
            .then((char) => {
                this.setState({char})
            })
        // Ошибка для теста
        // this.foo.bar = 0;
    }
    render() {
        if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }
        const {name, gender, born, died, culture} = this.state.char;
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}