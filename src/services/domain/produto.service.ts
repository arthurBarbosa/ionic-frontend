import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

import { ProdutoDTO} from '../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {}

  findById(product_id: string): Observable<ProdutoDTO>{
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${product_id}`);
  }

  findByCategoria(categoria_id: string) {
    return this.http.get(
      `${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`
    );
  }
}
