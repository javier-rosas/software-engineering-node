import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

export default class User {
   private id: string;
   private username: string;
   private password: string;
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string;
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;

   constructor(id: string, username: string, password: string, email: string) {
      this.id = id; 
      this.username = username; 
      this.password = password;
      this.email = email
  }
  
  public get uName() { return this.username; }
  public get pass() { return this.password; }
}