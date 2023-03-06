import { v4 as uuid } from "uuid";
import { Errand } from "./errand.model";

export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export class User {
  private _id: string;
  public name: string;
  public email: string;
  private _password: string;
  public errands: Errand[];

  constructor(paramns: UserDTO) {
    this._id = uuid();
    this.name = paramns.name;
    this.email = paramns.email;
    this._password = paramns.password;
    this.errands = [];
  }

  get id() {
    return this._id;
  }

  get password() {
    return this._password;
  }

  handleProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      errands: this.errands,
    };
  }
}
