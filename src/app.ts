import express,{Application} from 'express';
import {createServer,Server} from 'http'
import logger from './libs/logger';
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPIDocument } from './openapi.js';

import userRoutes from "../src/user/routes/userRoute";
import roleRoutes from "../src/role/routes/roleRoute"
import loginRoutes from "../src/login/routes/loginRoute"
import accessTypeRoutes from "../src/access/routes/accessTypeRoute"
import accessRoleRoutes from "../src/access/routes/accessRoleRoute"
import { errorHandler } from './middleware/errorHandleMiddleware';
import { authenticateToken } from './middleware/authMiddleware';

class App{

  private static server:Server;
  private static app:Application;

  private static async setupRoutes(){
    
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(
        generateOpenAPIDocument(),
        config.get<object>('openApi.swagger')
      )
    );
    
    this.app.use('/login', loginRoutes);
    this.app.use('/user', authenticateToken, userRoutes);
    this.app.use('/role', authenticateToken, roleRoutes);
    this.app.use('/access/type', authenticateToken, accessTypeRoutes);
    this.app.use('/access/role', authenticateToken, accessRoleRoutes);

    this.app.use(errorHandler);
  }

  public static async startServer(port:number){
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
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