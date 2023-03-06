import { v4 as uuid } from "uuid";

export interface ErrandDTO {
  name: string;
  detail: string;
}

export class Errand {
  private _id: string;
  name: string;
  detail: string;
  filed: boolean;
  changeIcon: number;

  constructor(params: ErrandDTO) {
    this._id = uuid();
    this.name = params.name;
    this.detail = params.detail;
    this.filed = false;
    this.changeIcon = Math.random();
  }

  get id() {
    return this._id;
  }

  handleProperties() {
    return {
      id: this._id,
      name: this.name,
      detail: this.detail,
      filed: this.filed,
      changeIcon: this.changeIcon,
    };
  }
}
