import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { ProductRepository } from "../repository/productRepository";
import { CreateProductDto, UpdateProductDto } from "../dto/product.dto";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class ProductService {
    constructor(@inject(TYPES.ProductRepository) private productRepository: ProductRepository) {}

    private async checkSellerAdminOrSuperAdmin(userId: number) {
        const userRole = await this.productRepository.getUserRole(userId);
        const roleName = userRole.roleName.toLowerCase();
        
        if (roleName !== 'seller' && roleName !== 'admin' && roleName !== 'superadmin') {
            throw new UnauthorizedError('Only seller, admin, or superadmin users can perform this operation');
        }
    }

    async createProduct(userId: number, payload: CreateProductDto) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const product = await this.productRepository.createProduct(payload);
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getProductList(payload: { limit?: number; offset?: number; categoryId?: number }) {
        try {
            const products = await this.productRepository.getProductList(payload);
            return products;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getProductById(id: number) {
        try {
            const product = await this.productRepository.getProductById(id);
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateProduct(userId: number, id: number, payload: UpdateProductDto) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const product = await this.productRepository.updateProduct(id, payload);
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteProduct(userId: number, id: number) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const product = await this.productRepository.deleteProduct(id);
            return product;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

