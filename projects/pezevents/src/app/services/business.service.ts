import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Business } from '@pezetter/pezevents-lib'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const ROOT_COLLECTION = 'businesses';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private ADD_USER_BUSINESS = this.functions.httpsCallable("addUserBusiness");
  private GET_USERS_BUSINESSES = this.functions.httpsCallable("getUsersBusinesses");
  private GET_BUSINESS_BY_ID = this.functions.httpsCallable("getBusinessById");

  constructor(private firestore: AngularFirestore, private functions: AngularFireFunctions) {

  }

  public addBusiness(business: Business): Observable<Business> {
    return this.ADD_USER_BUSINESS(business);
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

  public getUsersBusinesses(businesses: DocumentReference<Business>[]) {
    return this.GET_USERS_BUSINESSES({ businesses }).pipe(
      tap(ok => {
        console.log("OK!")
        debugger;
      }),
      map(result => {
        return result.businesses
      })
    ) as Observable<Business[]>
  }

}
