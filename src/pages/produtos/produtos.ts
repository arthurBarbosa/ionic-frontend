import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from "./../../models/produto.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html",
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {}

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id')
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
    .subscribe(response => {
      this.items = response['content'];
      loader.dismiss();
    },
    error => {}
    )
  }

  showProdutcDetail(product_id: string){
    this.navCtrl.push('ProdutoDetailPage', {product_id: product_id})
  }

  presentLoading(){
    let loader = this.loadingController.create({
      content: 'Aguarde'
    })
    loader.present();
    return loader;
  }
}
