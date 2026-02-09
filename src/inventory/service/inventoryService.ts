import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { InventoryRepository } from "../repository/inventoryRepository";
import { CreateInventoryDto, UpdateInventoryDto } from "../dto/inventory.dto";
import { UnauthorizedError } from "../../error/unAuthorizedError";

@injectable()
export class InventoryService {
    constructor(@inject(TYPES.InventoryRepository) private inventoryRepository: InventoryRepository) {}

    private async checkSellerAdminOrSuperAdmin(userId: number) {
        const userRole = await this.inventoryRepository.getUserRole(userId);
        const roleName = userRole.roleName.toLowerCase();
        
        if (roleName !== 'seller' && roleName !== 'admin' && roleName !== 'superadmin') {
            throw new UnauthorizedError('Only seller, admin, or superadmin users can perform this operation');
        }
    }

    async createInventory(userId: number, payload: CreateInventoryDto) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const inventory = await this.inventoryRepository.createInventory(payload);
            return inventory;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getInventoryList(userId: number, payload: { limit?: number; offset?: number; productId?: number }) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const inventories = await this.inventoryRepository.getInventoryList(payload);
            return inventories;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async getInventoryById(userId: number, id: number) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const inventory = await this.inventoryRepository.getInventoryById(id);
            return inventory;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async updateInventory(userId: number, id: number, payload: UpdateInventoryDto) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const inventory = await this.inventoryRepository.updateInventory(id, payload);
            return inventory;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }

    async deleteInventory(userId: number, id: number) {
        try {
            // Check if user has seller, admin, or superadmin role
            await this.checkSellerAdminOrSuperAdmin(userId);

            const inventory = await this.inventoryRepository.deleteInventory(id);
            return inventory;
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error(String(error));
            }
        }
    }
}

