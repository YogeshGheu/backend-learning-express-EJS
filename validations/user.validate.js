import { User } from "../models/user.model.js";

export async function validateUserBYEmail(email) {
	const user = await User.findOne({ email });
	return user
}
