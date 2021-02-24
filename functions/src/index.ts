import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Business, User } from '@pezetter/pezevents-lib';
import { firestore } from "firebase-admin";

admin.initializeApp();
// https://firebase.google.com/docs/functions/typescript


//#region   businesses
export const getBusinessById = functions.https.onCall(async (data: { id: string }, ctx) => {
    functions.logger.info("getBusinessById Call!");
    try {
        const { id } = data;
        const business = await firestore().collection("businesses").doc(id).get();
        if (!business.exists || business == null) {
            functions.logger.info(`Business \'${id}\' could not be found `);
            throw new Error(`Business \'${id}\' could not be found `)
        } else {
            const result = business.data() as Business;
            functions.logger.info(`Business \'${id}\' could not be found `);
            return result;
        }

    } catch (error) {
        return {
            errorCode: 'internal',
            message: error.message
        }
    }
});

export const onAddBusiness = functions.firestore.document('businesses/{businessId}').onCreate(async (snapshot, ctx) => {
    const db = firestore();
    const { businessId } = ctx.params;
    const { owner } = snapshot.data() as Business;
    functions.logger.info("onAddBusiness");
    functions.logger.info("business Name: ", name);
    functions.logger.info("business owner id: ", owner);
    // functions.logger.info("business email: ", email);
    try {
        const userDoc = db.collection("users").doc(owner);
        userDoc.update({
            businesses: firestore.FieldValue.arrayUnion(db.doc(`businesses/${businessId}`))
        });
        functions.logger.info(`Business added to Owners businesses collection`);
        return userDoc;
    } catch (err) {
        functions.logger.info(`Business could not be added to the Owners businesses collection:`, err);
        return err;
    }
});

export const addUserBusiness = functions.https.onCall(async (data: Partial<Business>, ctx) => {

    try {
        const newBusinessDocRef = firestore().collection("businesses").doc();
        const business: Partial<Business> = {
            ...data,
            id: newBusinessDocRef.id
        };
        const { writeTime } = await newBusinessDocRef.set(business);
        return {
            business,
            writeTime
        }
    } catch (error) {
        return {
            errorCode: 'aborted',
            message: error.message
        }
    }
});

// export const getBusinessesByUserId = functions.https.onCall(async (data, ctx) => {
//     const uid = ctx?.auth?.uid || data.uid || null;
//     try {
//         const querySnapshot = await firestore().collection("businesses").
//             .where("users", "array-contains", uid)
//             .get();
//         const result: Business[] = querySnapshot.docs.map(val => val.data() as Business);
//         functions.logger.info("getBusinessesByUserId Call!", result);
//         return result;
//     } catch (error) {
//         functions.logger.info("Error getting documents", error);
//         return [];
//     }
// });

// Add a user to a business. If.z
// export const addUserToBusiness = functions.https.onCall(async (data, ctx) => {
//     const uid = ctx?.auth?.uid || data.uid || null;
//     let { email, displayName, role, businessId, newUserId, phoneNumber } = data;
//     if (!newUserId) {
//         const userCreated = await admin.auth().createUser({
//             displayName,
//             email,
//             emailVerified: false,
//             phoneNumber,
//             password: "password123"
//         });
//         newUserId = userCreated.uid;
//     }
//     try {
//         const querySnapshot = await firestore().collection("businesses").doc(businessId).collection("users").doc(newUserId).set({
//             role, 
//             uid: newUserId, 
//             displayName,
//             user: firestore().doc(`users/${newUserId}`),
//             email,
//         })
//             .where("users", "array-contains", uid)
//             .get();
//         const result: Business[] = querySnapshot.docs.map(val => val.data() as Business);
//         functions.logger.info("getBusinessesByUserId Call!", result);
//         return result;
//     } catch (error) {
//         functions.logger.info("Error getting documents", error);
//         return [];
//     }
// });


// Get businesses from user doc -> businesses collection. Use 
export const getUsersBusinesses = functions.https.onCall(async (busRefs: Array<firestore.DocumentReference>, ctx) => {
    const uid = ctx?.auth?.uid;
    if (!uid) {
        throw new Error("User ID not provided");
    }
    try {
        const result: Business[] = (await firestore().getAll(...busRefs)).map(b => b.data() as Business);
        functions.logger.info("getUserData Call!", result);
        return result;
    } catch (error) {
        functions.logger.info("Error getUserData", error);
        return {
            user: {
                id: uid
            },
            businesses: []
        };
    }
    // return userData
});
//#endregion


//#region users

export const getUserData = functions.https.onCall(async (data: { id: string}, ctx) => {
    const uid = ctx?.auth?.uid || data.id;
    try {
        const userData = await firestore().collection("users").doc(uid).get();
        const queryData = userData.data() as User;
        const result: User = {
            ...queryData,
            id: uid
        }
        functions.logger.info("getUserData Call!", result);
        return result;
    } catch (error) {
        functions.logger.info("Error getUserData", error);
        return {
            id: uid
        };
    }
    // return userData
});

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
    return createUserDoc(user)
});

const createUserDoc = ({ uid, email, emailVerified, displayName, phoneNumber, photoURL, disabled, metadata, providerData }: functions.auth.UserRecord) => {
    // Extract user auth record data for firestore data
    const userData: Partial<User> = {
        id: uid,
        photoUrl: photoURL ?? null,
        created: new Date(metadata.creationTime) ?? null,
        email: email ?? "",
        phoneNumber: phoneNumber ?? "",
        lastSignIn: new Date(metadata.lastSignInTime) ?? null,
        providerId: providerData.length ? providerData[0].providerId : "",
        businesses: [], // TODO: get all assigned businesses
        transactions: [],
        notifications: [{
            id: "init",
            label: "Welcome to sezzion!",
            value: "Thanks for signing up. Go ahead and dive in. Search for a business, add a businesses, create a business, and subscribe to events.",
            created: new Date(),
            viewed: false
        }], // TODO: create initial signup notification
        displayName: displayName ?? "",
        isAnonymous: false,
        emailVerified,
        // disabled
    }

    functions.logger.info("User created... Adding to firestore Users collection", uid);
    // Create a user document withing the users collection.
    return firestore().collection("users").doc(uid).set(userData, { merge: true })
        .then((value) => {
            functions.logger.info(`User added to users collection:`);
            return value;
        }).catch(err => {
            functions.logger.info(`User could not be added:`, err);
            return err;
        });
}


//#endregion