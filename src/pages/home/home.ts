import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider} from '../../providers/rest/rest';
import { DetailsPage } from '../details/details';
import { InfiniteScroll } from 'ionic-angular/components/infinite-scroll/infinite-scroll';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public countries:any = [];
  private start:number=0;
  public data;

  constructor(public navCtrl: NavController, public provide: RestProvider ) {
   //this.getCountryList();this.loadPeople();
   this.loadCountries();
  }

  loadCountries(){
    this.provide.load(this.start)
    .subscribe(res=>{
      this.data=res

      for(let country of res) {
       
        this.countries.push(country);
        console.log('inside load countries'+ this.countries);
      }
    }
  )
}
        

  /*getCountryList(){

      this.provide.getCountriesName()
      .subscribe(res=>{
          this.data = res;
      }
    )
  }*/

  doInfinite(infiniteScroll:any) {
    console.log('doInfinite, start is currently ' + this.start);
    this.start+=50;
    if(this.loadCountries()){
      infiniteScroll.complete();
    }
}
  
  itemTapped(event, item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  ionViewDidLoad() {
    this.doInfinite(InfiniteScroll);
  }

}
