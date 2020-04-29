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

  items: ProdutoDTO[]=[];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categoria_id = this.navParams.get('categoria_id')
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
    .subscribe(response => {
      this.items = this.items.concat(response['content']);
      loader.dismiss();
      console.log(this.page)
      console.log(this.items)
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


  doRefresh(refresher){
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000)
  }

  doInfinite(infiniteScroll){
    this.page++
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000)

  }
}
