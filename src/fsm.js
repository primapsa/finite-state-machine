class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.und = [];
        this.rnd = [];
        this.indx = 0;
        if(this.config.initial !== 'normal'){
           
            this.config.initial = 'normal';
        }        
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      
        return this.config.initial;
    }
    getrndd ()
    {
        return this.rnd;
    }
    getInd ()
    {
        return this.indx;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        
        for(let key in this.config.states){
        
            if(key === state){
                this.und.push(this.config.initial);
                this.config.initial = state;
                this.rnd.push(state);
                return
            }
        }    
        
        throw new Error('Error');       
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      
      let state = this.config.initial;
      let current = this.config.states;

            for(let inside in current[state].transitions){
                    if(inside === event ){
                        this.und.push(state);                       
                        this.config.initial = current[state].transitions[inside];
                        this.rnd.push(this.config.initial);                    
                       
                        return;
                    }
            }
            throw Error();
        
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.config.initial = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {

        let result = [];
        for(let key in this.config.states){ 
            if(!event) {
                result.push(key);
                continue
            }
            for(let compare in this.config.states[key].transitions){
                if(compare == event){
                    result.push(key);
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
        
        if(this.und.length === 0) return false;
        let current = this.und.pop();      
        this.indx++;
        this.config.initial = current;      
        
        return true;        
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

        if((this.rnd.length === 0)) return false;
        if(this.rnd[this.rnd.length-1] === this.config.initial) return false;             
        let current = this.rnd.reverse();       
        this.config.initial = current[this.indx-1];      
        this.indx--;
        current = this.rnd.reverse();

        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.rnd = [];
        this.und = [];
    }
}


module.exports = FSM;

/** @Created by Uladzimir Halushka **/
