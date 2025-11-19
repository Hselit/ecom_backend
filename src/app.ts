import express,{Application} from 'express';
import {createServer,Server} from 'http'

class App{

  private static server:Server;
  private static app:Application;

  private static async setupRoutes(){
    
  }

  public static async startServer(port:number){
    this.app = express();
    await this.setupRoutes();
    
    this.server = createServer(this.app);
    this.server.listen(port,()=>{
      
    })
  }

  public static async stopServer(){

  }
}
