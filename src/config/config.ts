export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10) || 5432,
		type: process.env.DB_TYPE as any,
		user: process.env.DB_USER,
		pass: process.env.DB_PASSWORD,
		name: process.env.DB_NAME
	}
})
