import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default class User {
  
	constructor(
    private _id: string,
    private _username: string,
    private _email: string,
    private _password: string | null = null,
    private _firstName: string | null = null,
    private _lastName: string | null = null,
    private _profilePhoto: string | null = null,
    private _headerImage: string | null = null,
    private _accountType: AccountType = AccountType.Personal,
    private _maritalStatus: MaritalStatus = MaritalStatus.Single,
    private _biography: string | null = null,
    private _dateOfBirth: Date | null = null,
    private _joined: Date = new Date(),
    private _location: Location | null = null,
    ) {}

  public get id(): string {
    return this._id;
  }
  
  public set id(value: string) {
    this._id = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string | null{
    return this._password;
  }

  public set password(value: string | null) {
    this._password = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

	public get firstName(): string | null {
		return this._firstName;
	}
 
	public get lastName(): string | null {
		return this._lastName;
	}

	public get profilePhoto(): string | null {
		return this._profilePhoto;
	}

	public get headerImage(): string | null {
		return this._headerImage;
	}

	public get accountType(): AccountType  {
		return this._accountType;
	}

	public get maritalStatus(): MaritalStatus  {
		return this._maritalStatus;
	}

	public get biography(): string | null {
		return this._biography;
	}

	public get dateOfBirth(): Date | null {
		return this._dateOfBirth;
	}

	public get joined(): Date  {
		return this._joined;
	}

	public get location(): Location | null {
		return this._location;
	}

	public set firstName(value: string | null) {
		this._firstName = value;
	}

	public set lastName(value: string | null) {
		this._lastName = value;
	}

	public set profilePhoto(value: string | null) {
		this._profilePhoto = value;
	}

	public set headerImage(value: string | null) {
		this._headerImage = value;
	}

	public set accountType(value: AccountType ) {
		this._accountType = value;
	}

	public set maritalStatus(value: MaritalStatus ) {
		this._maritalStatus = value;
	}

	public set biography(value: string | null) {
		this._biography = value;
	}

	public set dateOfBirth(value: Date | null) {
		this._dateOfBirth = value;
	}

	public set joined(value: Date ) {
		this._joined = value;
	}

	public set location(value: Location  | null) {
		this._location = value;
	}
 
}
