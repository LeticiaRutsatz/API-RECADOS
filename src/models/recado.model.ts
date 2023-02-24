import { v4 as uuid } from "uuid";

export interface RecadoDTO {
  description: string;
  detail: string;
}

export class Recado {
  private _id: string;
  description: string;
  detail: string;
  arquivado: boolean;

  constructor(params: RecadoDTO) {
    this._id = uuid();
    this.description = params.description;
    this.detail = params.detail;
    this.arquivado = false;
  }

  get id() {
    return this._id;
  }

  handleProperties() {
    return {
      id: this.id,
      description: this.description,
      detail: this.detail,
      arquivado: this.arquivado,
    };
  }
}
