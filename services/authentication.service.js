import jwt from "jsonwebtoken";

const secretKey = "kdg2g4kjhged8aw7e812@sdf12&$*dsjhg32123"

function generateToken(user) {
	const payload = {
		id: user._id,
		email: user.email,
		username: user.username,		
	};
	const token = jwt.sign(payload, secretKey, {expiresIn:'12h'});
	return token;
}

function validateToken(token) {
	if(!token){
		return null
	}
	const verified = jwt.verify(token, secretKey);
	return verified;
}

export {generateToken, validateToken};
