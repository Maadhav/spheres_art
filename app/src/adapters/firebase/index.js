import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, getDoc, collection, getDocs, doc, addDoc, deleteDoc, updateDoc,query } from 'firebase/firestore';
import { v4 } from 'uuid';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_FIRE_ID,
    storageBucket: process.env.REACT_APP_FIRE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIRE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var StorageService = {
    storage: getStorage(app),

    /// StorageService.upload('test', event.currentTarget.files);
    /// Can Send object of file or objects of files
    upload: async function (path, object) {
        console.log("uploading file")
        var results = {};
        if (object instanceof FileList || object instanceof Array) {
            for (let index = 0; index < object.length; index++) {
                var file = object[index];
                var _storageRef = new ref(this.storage, (path ? (path + '/') : '') + file.name);
                var _uploadTask = await uploadBytes(_storageRef, file);
                var _downloadUrl = await getDownloadURL(_uploadTask.ref)
                results[index] = _downloadUrl;
            }
            return results;
        }
        else if (object instanceof File) {
            var _storageRef = new ref(this.storage, (path ? (path + '/') : '') + file.name);
            var _uploadTask = await uploadBytes(_storageRef, file);
            var _downloadUrl = await getDownloadURL(_uploadTask.ref)
            return _downloadUrl;
        }
        else {
            throw Error("Invalid object type");
        }
    },

    /// StorageService.delete('https://firebsase.storage.googleapis.com/test.png');

    /// url will passed as an parameter no need to split it
    delete: async function (url) {
        console.log("deleting file at url", url)
        var storageRef = ref(this.storage, url);
        deleteObject(storageRef);
    }
}

var DatabaseService = {
    database: getFirestore(app),

    /// DatabaseService.get('test').then(val => {
    ///     console.log(val)
    /// })

    /// col is a collection
    /// id is the id of the doc
    /// if id is null, it will return the collection documents as a list
    /// if id is not null, it will return the document with the id
    /// getDoc is is used when id is not null
    /// getDocs is is used when id is null

    get: async function ({ col,  id, query }) {
        var collectionRef = collection(this.database, col);
        if (id) {
            var docRef = doc(this.database, col, id)
            var snapshot = await getDoc(docRef)
            return {
                ...snapshot.data(),
                id: snapshot.id
            }
        }
        if (query) {
            // var queryBuilder = query(collectionRef, where,orderBy('timestamp', 'desc'), startAt(0), limit(10),);
            var queryBuilder = query(collectionRef);
            var snapshot = await getDocs(queryBuilder).catch(e => console.log(e));
            console.log(snapshot);
            return snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            });
        }
        var snapshots = await getDocs(collectionRef);
        return snapshots.docs.map(e => {
            return {
                ...e.data(),
                id: e.id
            }
        })
    },
    // DatabaseService.set('test', {
    //   name: 'test',
    //   age: 'test',
    //   address: 'test'
    // })
    set: async function (col, data) {
        var collectionRef = collection(this.database, col);
        return await addDoc(collectionRef, data);
    },

    // DatabaseService.update('test','EEujUPFb9QJbfZMf0DkP', {
    //   name: 'kunal',
    //   address: "ahmedabad",
    //   age: 21
    // })
    update: async function ({ col, id, data, where }) {
        if (where) {
            var collectionRef = collection(this.database, col);
            var _query = query(collectionRef, where);
            var snapshot = await getDocs(_query)
            await updateDoc(snapshot.docs[0].ref, data);
        }
        var docRef = doc(this.database, col, id);
        await updateDoc(docRef, data);
    },
    //     DatabaseService.delete('test', e.id)
    delete: async function (col, id) {
        var docRef = doc(this.database, col, id);
        await deleteDoc(docRef)
    },
}

export { StorageService, DatabaseService }
