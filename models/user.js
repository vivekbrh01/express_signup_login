var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /@/,
		},
		password: {
			type: String,
			minlength: 3,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (this.password && this.isModified("password")) {
		// bcrypt.hash(this.password, 10, (err, hashed) => {
		// 	if (err) return next(err);
		// 	this.password = hashed;
		// 	return next();
		// });
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

userSchema.methods.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
