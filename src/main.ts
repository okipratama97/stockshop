import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { report } from './middlewares/report.middleware'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true
		})
	)
	// possible approach for global middleware. but only takes function middleware
	// app.use(report)
	await app.listen(process.env.PORT || 3000)
}
bootstrap()
