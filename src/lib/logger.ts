/**
 * Initialize a new log object with a custom debug level
 * 
 * ---
 * @param head Default log section heading
 * @param debug Default log level. Logs lower than this number will not be displayed
 * 
 * @example
 * let log = new Log({
 *     head: 'controller.ts',
 *     debug: 4,
 * })
 */
class Log {
    debug: number;
    defaultHead: string;
  
    constructor(config: {head?: string; debug?: number;}){
      this.debug = config.debug ?? 4
      this.defaultHead = config.head ?? '||||||||||||||||||||'
    }

    /**
     * create a single log in a standalone group
     * 
     * ---
     * @param head log heading text
     * @param details details appended to heading
     * @param loc - file / line of origin
     * 
     * 
     * @example
     * log.main({
     *     head: 'runInit',
     *     details: 'Initialize the controller state',
     *     loc: '/src/store/controller.ts | 133'
     * })
     */
    main = (config: {head?: string; details?: string | string[]; loc?: string;}) => {
        console.groupCollapsed(config.head ?? this.defaultHead)
    
        if(config.details && Array.isArray(config.details))
          config.details.forEach((x:any) => this.dark(x))
          
        if(config.details)
          this.dark(config.details)
        
        config.loc && this.dark(config.loc)
        console.groupEnd()
    }

    /**
     * Open a nested log group
     * 
     * ---
     * @param head log heading text
     * @param details details appended to heading
     * @param loc - file / line of origin
     * 
     * 
     * @example
     * log.open({
     *     head: 'runInit',
     *     details: 'Initialize the controller state',
     *     loc: '/src/store/controller.ts | 133'
     * })
     * // logs...
     * log.close()
     */
    open = (config: {head?: string; details?: string | string[]; loc?: string;}) => {
      console.groupCollapsed(config.head ?? this.defaultHead)
  
      if(config.details && Array.isArray(config.details))
      config.details.forEach((x:any) => this.dark(x))
      
      if(config.details)
        this.dark(config.details)
      
      config.loc && this.dark(config.loc)
      if(config.details || config.loc)
        console.log()
    }
    
    /**
     * Log plain data
     * 
     * ---
     * @param data 
     * 
     * @example
     * log.text('Hello, World')
     */
    text = (data?: any) => {
        if(this.debug < 4) return
        console.log(data)
    }

    /**
     * Log a table
     * 
     * ---
     * @param data 
     * 
     * @example
     * log.table([1,2,3,4])
     * log.table([{n: 1},{n: 2},{n: 3}])
     */
    table = (data?: any) => {
        if(this.debug < 4) return
        console.table(data)
    }

    /**
     * Log information
     * 
     * ---
     * @param data 
     * 
     * @example
     * log.info('This should return a number')
     */
    info = (data?: any) => {
        if(this.debug < 3) return
        console.info(data)
    }

    /**
     * Log a warning
     * 
     * ---
     * @param data 
     * 
     * @example
     * log.warn('This might fail!')
     */
    warn = (data?: any) => {
        if(this.debug < 2) return
        console.warn(data)
    }

    /**
     * Log an error
     * 
     * ---
     * @param data 
     * 
     * @example
     * log.error('This failed!')
     */
    error = (data?: any) => {
        if(this.debug < 1) return
        console.error(data)
    }

    /**
     * Close a log group
     * 
     * ---
     * @example
     * log.close()
     */
    close = () => {
        if(this.debug == 0) return
        console.groupEnd()
    }

    /**
     * Close all log groups
     * 
     * ---
     * @example
     * log.info('This should return a number')
     */
    closeAll = ()  => {
      console.log('----------------------------')
      for(let i = 0; i < 50; i++){ console.groupEnd() }
    } 

    dark = (data: any) => console.log(`%c${data}`, "color: #888");
  }
  
export default Log