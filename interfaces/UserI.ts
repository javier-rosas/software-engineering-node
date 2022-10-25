/**
 * @file Declares User interface
 */

import AccountType from "../models/AccountType"
import MaritalStatus from "../models/MaritalStatus"
import Location from "../models/Location"


 /**
  * @class User interface defines fields for User object
  * @property {string} _id unique user id 
  * @property {string} _username username 
	* @property {string} _password password
	* @property {string} _firstName firstname
	* @property {string} _lastName lastname
	* @property {string} _email email
	* @property {string} _profilePhoto profile photo
	* @property {string} _headerImage header image
	* @property {AccountType} _accountType type of account 
	* @property {MaritalStatus} _maritalStatus marital status
	* @property {string} _dateOfBirth date of birth 
	* @property {Date} _joined date joined 
	* @property {Location} _location location
	**/
export default interface UserI {
  _id?: string,
  _username: string,
  _password?: string,
  _firstName?: string,
  _lastName?: string,
  _email: string,
  _profilePhoto?: string,
  _headerImage?: string,
  _accountType?: AccountType,
  _maritalStatus?: MaritalStatus,
  _biography?: string,
  _dateOfBirth?: Date,
  _joined?: Date,
  _location?: Location,
}