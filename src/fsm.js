class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if(!config) {
            throw new Error("A config is missed");
        }

        this.config = config;
        this._state = this.config.initial;
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
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let currentState = this.getState(),
            newState = this.config.states[currentState].transitions[event];

        // console.log( '!!!!!!!!!!!! new State? ', currentState, newState )
        if(!newState) {
            throw new Error("An attempt to set illegal state has occured");
        }

        this.changeState(newState);
        // console.log(" new state set: " + this._state)
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if(!event) {
            return Object.keys(this.config.states);
        } 

        return [];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
