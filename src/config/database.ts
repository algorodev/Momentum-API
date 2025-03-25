import * as mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
	try {
		const uri = process.env.MONGO_URI || ''
		await mongoose.connect(uri)
	} catch (error: any) {
		console.error(`Error: ${error.message}`)
		process.exit(1)
	}
}

export default connectDB
