import { Component } from "@angular/core";
import { NavController, IonicPage, MenuController } from "ionic-angular";
import { CredenciasDTO } from "../../models/credencias.dto";
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  creds: CredenciasDTO = {
    email: "",
    senha: "",
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService
  ) {}

  login() {
    this.auth.authenticate(this.creds).subscribe(
      (response) => {
        this.auth.successfulLogin(response.headers.get("Authorization"));
        this.navCtrl.push("CategoriaPage");
      },
      (error) => {}
    );
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe((response) => {
      this.auth.successfulLogin(response.headers.get("Authorization"));
      this.navCtrl.setRoot('CategoriaPage');
    },
      error =>{}
    );
  }

  signup(){
    this.navCtrl.setRoot('SignupPage')
  }
}
