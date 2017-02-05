class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) {
            throw new Error("A config is missed");
        }

        // console.log("____________________________________________________");

        this.config = config;
        this._state = this.config.initial;
        this._history = [];
        this._historyNextStep = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(!this.config.states[state]) {
            throw new Error("An attempt to set unspecified state has occured");
        };

        this._state = state;
        this.pushEventToHistory(state);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let currentState = this.getState(),
            newState = this.config.states[currentState].transitions[event];

        // console.log('>>> Trigger', event, '. Was:', currentState, 'New:', newState);
        if(!newState) {
            throw new Error("An attempt to set illegal state has occured");
        }

        this.changeState(newState);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this.config.initial;
        this.clearHistory();
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];

        if(!event) {
            return Object.keys(this.config.states);
        } else {

            for(let state in this.config.states) {
                if(this.config.states[state].transitions[event] !== undefined) {
                    result.push(state);
                }
            }

        }

        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this._historyNextStep > 1) {
            this._historyNextStep--;
            this._state = this._history[this._historyNextStep - 1];

            return true;
        } else if (this._history.length > 0 && this._historyNextStep != 0) {
            this._state = this.config.initial;
            this._historyNextStep = 0;

            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this._history[this._historyNextStep + 1] !== undefined) {
            this._historyNextStep++;
            this._state = this._history[this._historyNextStep];
            return true;
        }

        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._history = [];
        this._historyNextStep = 0;
    }

    pushEventToHistory(state) {
        // this._history = this._history.slice(0, this._historyNextStep - 1);

        this._history[this._historyNextStep] = state;
        this._historyNextStep = this._history.length;
        // console.log("History updated: ", this._history, this._historyNextStep);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
