import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import UserI from "../interfaces/User"

export default class User {
  
	private _id?: string;
	private _username: string 
	private _password?: string 
	private _firstName?: string 
	private _lastName?: string
	private _email: string
	private _profilePhoto?: string 
	private _headerImage?: string 
	private _accountType?: AccountType = AccountType.Personal
	private _maritalStatus?: MaritalStatus = MaritalStatus.Single
	private _biography?: string
	private _dateOfBirth?: Date
	private _joined?: Date = new Date()
	private _location?: Location

	constructor({
		_id,
		_username,
		_email,
		_password,
		_firstName,
		_lastName,
		_profilePhoto,
		_headerImage,
		_accountType,
		_maritalStatus,
		_biography,
		_dateOfBirth,
		_joined,
		_location
	} : UserI) {
		this._id = _id
		this._username=  _username
		this._email = _email
		this._password = _password
		this._firstName = _firstName
		this._lastName = _lastName
		this._profilePhoto = _profilePhoto
		this._headerImage = _headerImage
		this._accountType = _accountType
		this._maritalStatus = _maritalStatus
		this._biography = _biography
		this._dateOfBirth = _dateOfBirth
		this._joined = _joined
		this._location = _location
	}

	
  public get id(): string | undefined {
    return this._id;
  }
  
  public set id(value: string | undefined) {
    this._id = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string | undefined {
    return this._password;
  }

  public set password(value: string | undefined) {
    this._password = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

	public get firstName(): string | undefined{
		return this._firstName;
	}
 
	public get lastName(): string | undefined{
		return this._lastName;
	}

	public get profilePhoto(): string | undefined {
		return this._profilePhoto;
	}

	public get headerImage(): string | undefined {
		return this._headerImage;
	}

	public get accountType(): AccountType | undefined {
		return this._accountType;
	}

	public get maritalStatus(): MaritalStatus | undefined {
		return this._maritalStatus;
	}

	public get biography(): string | undefined {
		return this._biography;
	}

	public get dateOfBirth(): Date | undefined {
		return this._dateOfBirth;
	}

	public get joined(): Date | undefined {
		return this._joined;
	}

	public get location(): Location | undefined {
		return this._location;
	}

	public set firstName(value: string | undefined) {
		this._firstName = value;
	}

	public set lastName(value: string | undefined) {
		this._lastName = value;
	}

	public set profilePhoto(value: string | undefined) {
		this._profilePhoto = value;
	}

	public set headerImage(value: string | undefined) {
		this._headerImage = value;
	}

	public set accountType(value: AccountType | undefined) {
		this._accountType = value;
	}

	public set maritalStatus(value: MaritalStatus | undefined) {
		this._maritalStatus = value;
	}

	public set biography(value: string | undefined) {
		this._biography = value;
	}

	public set dateOfBirth(value: Date | undefined) {
		this._dateOfBirth = value;
	}

	public set joined(value: Date | undefined) {
		this._joined = value;
	}

	public set location(value: Location  | undefined) {
		this._location = value;
	}
 
}
