import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import 'dotenv/config'

console.log(process.env.DATABASE_HOST)
console.log(process.env.DATABASE_PORT)
console.log(process.env.POSTGRES_USER)
console.log(process.env.POSTGRES_PASSWORD)
console.log(process.env.POSTGRES_DB)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Product],
      synchronize: true, // Set to false in production
    }),
    ProductsModule,
  ],
})
export class AppModule {}