import { Document, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
	name: string
	email: string
	password: string
	comparePassword: (candidate: string) => Promise<boolean>
}

const UserSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, lowercase: true, trim: true, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
)

UserSchema.pre<IUser>('save', async function (next) {
	if (!this.isModified('password')) return next()
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
	next()
})

UserSchema.methods.comparePassword = async function (candidate: string) {
	return bcrypt.compare(candidate, this.password)
}

export default model<IUser>('User', UserSchema)
