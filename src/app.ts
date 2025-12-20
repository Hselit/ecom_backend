import express,{Application} from 'express';
import {createServer,Server} from 'http'
import logger from './libs/logger';

import userRoutes from "../src/user/routes/userRoute"
import { errorHandler } from './middleware/errorHandleMiddleware';
class App{

  private static server:Server;
  private static app:Application;

  private static async setupRoutes(){
    this.app.use('/user',userRoutes)

    //error handling middleware
    this.app.use(errorHandler);
  }

  public static async startServer(port:number){
    this.app = express();
    await this.setupRoutes();
    
    this.server = createServer(this.app);
    this.server.listen(port,()=>{
      logger.info(`Server is running on http://localhost:${port}`);
    })
  }

  public static async stopServer(){

  }
}

export default App;