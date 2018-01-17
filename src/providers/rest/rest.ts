import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  perpage:number = 50;
  //private url = 'https://reqres.in/api/';
  private url1='https://restcountries.eu/rest/v2/all';
  

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  load(start:number=0) {    
          return this.http.get(this.url1)
          .map(this.extractData)
          .catch(this.handleError);

    }



  /* getCountriesName():Observable<string[]> {
    return this.http.get(this.url1)
    .map(this.extractData)
    .catch(this.handleError);
  }*/

  private extractData(res: Response) {
    let body = res;
    //console.log('res is' + res);
    //console.log('body is' + body);
    //console.log('Stringified is '+JSON.stringify(body));
    return body || [];
}

private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
