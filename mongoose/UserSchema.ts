import mongoose from "mongoose";

/**
 * @file Implements mongoose schema for the User collection
 */
const UserSchema = new mongoose.Schema({
   _username: { type: String, required: true },
   _password: { type: String, required: true },
   _firstName: {type: String},
   _lastName: {type: String},
   _email: {type: String},
   _profilePhoto: {type: String},
   _headerImage: {type: String},
   _accountType: { type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL'] },
   _maritalStatus: { type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED'] },
   _biography: {type: String},
   _dateOfBirth: {type: Date},
   _joined: { type: Date, default: Date.now },
   _location: {
     latitude: { type: Number, default: 0.0 },
     longitude: { type: Number, default: 0.0 },
   }
}, { collection: 'users' });

export default UserSchema;