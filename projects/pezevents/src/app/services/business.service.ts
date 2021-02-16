import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Business } from '@pezetter/pezevents-lib'
import { AngularFireAuth } from '@angular/fire/auth';
import { UserBusiness } from '@pezetter/pezevents-lib'
import { AngularFireFunctions } from '@angular/fire/functions';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const ROOT_COLLECTION = 'businesses';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private addUserBusiness = this.functions.httpsCallable("addUserBusiness");
  private getBusinessesByUserId = this.functions.httpsCallable("getBusinessesByUserId", );
  private GET_BUSINESS_BY_ID = this.functions.httpsCallable("getBusinessById");

  constructor(private firestore: AngularFirestore, private functions: AngularFireFunctions) {

  }

  public addBusiness(business: Business): Observable<Business> {
    return this.addUserBusiness(business);
  }

  public getBusiness(id: string) {
    return this.firestore.collection(ROOT_COLLECTION).doc(id).get().pipe(
      map((resp) => {
        console.log("business service", resp.data())
        return resp.data() as Business;
      })
    )
  }
  public getBusinessById(id: string) {
    return this.GET_BUSINESS_BY_ID({id}).pipe(
      map(resp => {
        return resp as Business;
      })
    )
  }

  public getAllUserAddedBusinesses(uid: string) {
    return this.getBusinessesByUserId({ uid })
  }

}
