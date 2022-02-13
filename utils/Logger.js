/**
 * This is custom logger class.<br>
 * The purpose is to made debugging via console a little easier
 */
class Logger {
    #level = 0;
    #enters = 0;
    setLevel(level){
        this.#level = level;
    }

    /**
     * Returns a human-readable format of the current date and time
     * @returns {string} Dte and Time as dd/MM/yyyy HH:mm:ss
     */
    getCurrentDateTime(){
        const padding = (input) => {
            return (input < 10 ? '0' : '') + input;
        }
        let timestamp = new Date();
        return  padding(timestamp.getDate()) + "/"
            + padding(timestamp.getMonth()) + "/"
            + padding(timestamp.getFullYear()) + " "
            + padding(timestamp.getHours()) + ":"
            + padding(timestamp.getMinutes()) + ":"
            + padding(timestamp.getSeconds());
    }

    /**
     * Logs a message to the console with given level
     * @param message Message to be logged
     * @param level Level of the message
     */
    log(message, level){
        let datetime = this.getCurrentDateTime();
        if(level === DEBUG){
            console.debug("[DBG ] " + datetime + ":");
            console.debug(message);
        }else if(level === INFO){
            console.info("[INFO] " + datetime + ":");
            console.info(message);
        }else if(level === WARN){
            console.warn("[WARN] " + datetime + ":");
            console.warn(message);
        }else if(level === CRITICAL){
            console.error("[ERR ] " + datetime + ":");
            console.error(message);
        }else if(level === EXCEPTION){
            console.error(message);
        }
    }

    /**
     * States that a method was entered.<br>
     * Format is [INFO] dd/MM/yyyy HH:mm:ss: ENTER methodName#fileName. Entered amount.<br>
     * Increments a counter which displays how many method were entered.
     * @param methodName Name of the method
     * @param fileName Optional file name
     */
    enter(methodName, fileName){
        if(fileName === undefined || fileName === null){
            fileName = "";
        }else{
            fileName += "#";
        }
        this.info("ENTER " + fileName + methodName + ". Entered: " + this.#enters);
        this.#enters++;
    }

    /**
     * States that a method was left.<br>
     * Format is [INFO] dd/MM/yyyy HH:mm:ss: LEAVE methodName#fileName. Entered amount.<br>
     * Decrements a counter which displays how many method were left, any non-null amount states that a method wasn't finished
     * @param methodName Name of the method
     * @param fileName Optional file name
     */
    leave(methodName, fileName){
        if(fileName === undefined || fileName === null){
            fileName = "";
        }else{
            fileName += "#";
        }
        this.#enters--;
        this.info("LEAVE " + fileName + methodName + ". Left: " + this.#enters);
    }

    /**
     * States that a method was unexpected left.<br>
     * Format is [WARN] dd/MM/yyyy HH:mm:ss: UNEXPECTED methodName#fileName. Entered amount.
     * @param methodName Name of the method
     * @param fileName Optional file name
     */
    unexpectedLeft(methodName, fileName) {
        if(fileName === undefined || fileName === null){
            fileName = "";
        }else{
            fileName += "#";
        }
        this.warn("UNEXPECTED LEFT " + fileName + methodName);
    }

    /**
     * Prints a debug message, debug is the lowest level.
     * @param data Data to log
     */
    debug(data){
        this.log(data, DEBUG);
    }

    /**
     * Prints an info, this is the normal level.
     * @param data Data to log
     */
    info(data){
        this.log(data, INFO);
    }

    /**
     * Prints a warning, this should be used if a misbehaviour could occur or occurred but the application was recovered.
     * @param data Data to log
     */
    warn(data){
        this.log(data, WARN);
    }

    /**
     * Prints a critical message, this is the highest level and states that a non-recoverable state was entered.
     * @param data Data to log
     */
    critical(data){
        this.log(data, CRITICAL);
    }

    /**
     * Prints an exception
     * @param error Exception to print
     */
    exception(error) {
        this.log(error, EXCEPTION);
    }
}


const logger = new Logger();
export const DEBUG = 0;
export const INFO = 1;
export const WARN = 2;
export const CRITICAL = 3;
export const EXCEPTION = 3;
export default logger;