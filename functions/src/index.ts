import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserBusiness, UserData, Business } from "@pezetter/pezevents-lib"
import { firestore } from "firebase-admin";

admin.initializeApp();
// https://firebase.google.com/docs/functions/typescript

export const getBusinessById = functions.https.onCall(async (data, ctx) => {
    functions.logger.info("getBusinessById Call!");
    try {
        const businessId = data.id;
        const business = await firestore().collection("businesses").doc(businessId as string).get();
        if (!business.exists || business == null) {
            functions.logger.info(`Business \'${businessId}\' could not be found `);
            throw new Error(`Business \'${businessId}\' could not be found `)
        } else {
            const result = business.data() as Business;
            functions.logger.info(`Business \'${businessId}\' could not be found `);
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
    const { owner, email, displayName, description } = snapshot.data();
    const business = {
        id: businessId,
        displayName,
        role: "Owner",
        description,
        business: db.doc(`businesses/${businessId}`)
    }
    functions.logger.info("onAddBusiness");
    functions.logger.info("business Name: ", name);
    functions.logger.info("business owner id: ", owner);
    functions.logger.info("business email: ", email);
    try {
        const value = await db.collection("users")
            .doc(owner)
            .collection("businesses")
            .doc(businessId)
            .set(business);
        functions.logger.info(`Business added to Owners businesses collection`);
        return value;
    } catch (err) {
        functions.logger.info(`Business could not be added to the Owners businesses collection:`, err);
        return err;
    }
});

export const addUserBusiness = functions.https.onCall(async (data: UserBusiness, ctx) => {

    try {
        const newBusinessDocRef = firestore().collection("businesses").doc();
        const business: UserBusiness = {
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

export const getBusinessesByUserId = functions.https.onCall(async (data, ctx) => {
    const uid = ctx?.auth?.uid || data.uid || null;
    try {
        const querySnapshot = await firestore().collection("businesses")
            .where("users", "array-contains", uid)
            .get();
        const result: Business[] = querySnapshot.docs.map(val => val.data() as Business);
        functions.logger.info("getBusinessesByUserId Call!", result);
        return result;
    } catch (error) {
        functions.logger.info("Error getting documents", error);
        return [];
    }
});

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

export const getUserData = functions.https.onCall(async (data, ctx) => {
    const uid = ctx?.auth?.uid || data.uid || null;
    try {
        const userData = await firestore().collection("users").doc(uid).get();
        const queryData = userData.data() as UserData;
        const businessesCollection = await userData.ref.collection('businesses').get()
        const businesses = businessesCollection.docs.map(val => val.data() as UserBusiness) || [];
        const result: UserData = {
            ...queryData,
            uid,
            businesses
        }
        functions.logger.info("getUserData Call!", result);
        return result;
    } catch (error) {
        functions.logger.info("Error getUserData", error);
        return {
            uid,
            businesses: []
        };
    }
    // return userData
});

// Get businesses from user doc -> businesses collection. Use 
export const getUserDataBusinesses = functions.https.onCall(async (data, ctx) => {
    const uid = ctx?.auth?.uid || data.uid || null;
    const db = admin.firestore();
    try {
        const querySnapshot = await db.collection("users").doc(uid).collection('businesses').get();
        const businesses = querySnapshot.docs.map(val => {
            const userBus = val.data() as UserBusiness;
            return {
                ...userBus,
                business: db.doc(`businesses/${userBus.id}`)
            }
        }) || [];
        functions.logger.info("getUserDataBusinesses Call!", businesses);
        return { businesses }
    } catch (error) {
        functions.logger.info("Error getUserDataBusinesses", error);
        return {
            businesses: []
        };
    }
});

export const onCreateUser = functions.auth.user().onCreate(async (user) => {
    return createUserDoc(user)
});

const createUserDoc = ({ uid, email, emailVerified, displayName, phoneNumber, photoURL, disabled, metadata }: functions.auth.UserRecord) => {
    // Extract user auth record data for firestore data
    const userData = {
        uid,
        email: email ?? null,
        emailVerified,
        displayName: displayName ?? null,
        phoneNumber: phoneNumber ?? null,
        photoURL: photoURL ?? null,
        disabled,
        lastSignInTime: metadata.lastSignInTime ?? null,
        creationTime: metadata.creationTime ?? null
    }

    functions.logger.info("User created... Adding to firestore Users collection", uid);
    // Create a user document withing the users collection.
    const userDoc = firestore().collection("users").doc(uid);

    // Initialize a businesses collection with the newly initialized user document.
    userDoc.collection("businesses");
    // OTHER SUB COLLECTIONS CAN BE INITIALIZED HERE (ie. messages, transaction references, ...)

    // Set the newly initialized user document, including businesses subcollection
    return userDoc.set(userData, { merge: true })
        .then((value) => {
            functions.logger.info(`User added to users collection:`);
            return value;
        }).catch(err => {
            functions.logger.info(`User could not be added:`, err);
            return err;
        });
}
