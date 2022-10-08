import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   _username: { type: String, required: true },
   _password: { type: String, required: true },
   _firstName: String,
   _lastName: String,
   _email: String,
   _profilePhoto: String,
   _headerImage: String,
   _accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
   _maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
   _biography: String,
   _dateOfBirth: Date,
   _joined: { type: Date, default: Date.now },
   _location: {
     latitude: { type: Number, default: 0.0 },
     longitude: { type: Number, default: 0.0 },
   }
}, { collection: 'users' });

export default UserSchema;