import express,{Application} from 'express';
import {createServer,Server} from 'http'
import path from 'node:path';
import logger from './libs/logger';
import config from 'config';
import swaggerUi from 'swagger-ui-express';
import { generateOpenAPIDocument } from './openapi.js';

import userRoutes from "../src/user/routes/userRoute";
import roleRoutes from "../src/role/routes/roleRoute"
import loginRoutes from "../src/login/routes/loginRoute"
import accessTypeRoutes from "../src/access/routes/accessTypeRoute"
import accessRoleRoutes from "../src/access/routes/accessRoleRoute"
import categoryRoutes from "../src/category/routes/categoryRoute"
import productRoutes from "../src/product/routes/productRoute"
import productImageRoutes from "../src/productImage/routes/productImageRoute"
import cartRoutes from "../src/cart/routes/cartRoute"
import orderRoutes from "../src/order/routes/orderRoute"
import reviewRoutes from "../src/review/routes/reviewRoute"
import inventoryRoutes from "../src/inventory/routes/inventoryRoute"
import { errorHandler } from './middleware/errorHandleMiddleware';
import { authenticateToken } from './middleware/authMiddleware';
import { rateLimiterMiddleware } from './middleware/rateLimiterMiddleware';
import cors from 'cors';
class App{

  private static server:Server;
  private static app:Application;

  private static async setupRoutes(){
    
    this.app.use(
      cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
      })
    );

    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(
        generateOpenAPIDocument(),
        config.get<object>('openApi.swagger')
      )
    );

    // this.app.use(rateLimiterMiddleware)
    
    this.app.use('/login', loginRoutes);
    this.app.use('/user', userRoutes); // Public routes for registration and verification, protected routes handled in route file
    this.app.use('/role', roleRoutes);
    this.app.use('/access/type', authenticateToken, accessTypeRoutes);
    this.app.use('/access/role', authenticateToken, accessRoleRoutes);
    this.app.use('/category', authenticateToken, categoryRoutes);
    this.app.use('/product', authenticateToken, productRoutes);
    this.app.use('/', authenticateToken, productImageRoutes);
    this.app.use('/cart', authenticateToken, cartRoutes);
    this.app.use('/order', authenticateToken, orderRoutes);
    this.app.use('/review', authenticateToken, reviewRoutes);
    this.app.use('/inventory', authenticateToken, inventoryRoutes);

    this.app.use(errorHandler);
  }

  public static async startServer(port:number){
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
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