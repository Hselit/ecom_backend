import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { ProductImageRepository } from "../repository/productImageRepository";
import { CreateProductImageDto, UpdateProductImageDto } from "../dto/productImage.dto";

@injectable()
export class ProductImageService {
    constructor(@inject(TYPES.ProductImageRepository) private productImageRepository: ProductImageRepository) {}

    async createProductImage(productId: number, payload: CreateProductImageDto) {
        try {
            const productImage = await this.productImageRepository.createProductImage(productId, payload);
            return productImage;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getProductImagesByProduct(productId: number) {
        try {
            const productImages = await this.productImageRepository.getProductImagesByProduct(productId);
            return productImages;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getProductImageById(id: number) {
        try {
            const productImage = await this.productImageRepository.getProductImageById(id);
            return productImage;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateProductImage(id: number, payload: UpdateProductImageDto) {
        try {
            const productImage = await this.productImageRepository.updateProductImage(id, payload);
            return productImage;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteProductImage(id: number) {
        try {
            const productImage = await this.productImageRepository.deleteProductImage(id);
            return productImage;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

