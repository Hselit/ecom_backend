import { inject, injectable } from "inversify";
import TYPES from "../../dependencyManager/inversifyTypes";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../error/notFoundError";
import { DatabaseError } from "../../error/databaseError";
import { Prisma } from "@prisma/client";

@injectable()
export class LoginRepository {
    private readonly prisma: PrismaClient;
    
    constructor(@inject(TYPES.PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async findUserByIdentifier(identifier: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: identifier },
                        { name: identifier }
                    ]
                },
                include: {
                    role: true
                }
            });

            if (!user) {
                throw new NotFoundError('User not found');
            }

            return user;
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new DatabaseError(error.message);
            }
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new DatabaseError('Failed to find user');
        }
    }
}

