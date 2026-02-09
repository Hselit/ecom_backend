import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { CategoryRepository } from "../repository/categoryRepository";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto";

@injectable()
export class CategoryService {
    constructor(@inject(TYPES.CategoryRepository) private categoryRepository: CategoryRepository) {}

    async createCategory(payload: CreateCategoryDto) {
        try {
            const category = await this.categoryRepository.createCategory(payload);
            return category;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getCategoryList(payload: { limit?: number; offset?: number }) {
        try {
            const categories = await this.categoryRepository.getCategoryList(payload);
            return categories;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getCategoryById(id: number) {
        try {
            const category = await this.categoryRepository.getCategoryById(id);
            return category;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateCategory(id: number, payload: UpdateCategoryDto) {
        try {
            const category = await this.categoryRepository.updateCategory(id, payload);
            return category;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteCategory(id: number) {
        try {
            const category = await this.categoryRepository.deleteCategory(id);
            return category;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

