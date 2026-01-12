// // src/libs/prisma.ts
// import { PrismaClient } from '@prisma/client'
// import { PrismaMysql } from '@prisma/adapter-mysql'
// import mysql from 'mysql2/promise'

// const pool = mysql.createPool({
//   uri: process.env.DATABASE_URL!,
// })

// const adapter = new PrismaMysql(pool)

// export const prisma = new PrismaClient({
//   adapter,
// })
