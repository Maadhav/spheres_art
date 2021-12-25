import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, getDoc, collection, getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDNJnAow9jz30FJHE_d5oXgra19iZxCgZM",
    authDomain: "sphere-art.firebaseapp.com",
    projectId: "sphere-art",
    storageBucket: "sphere-art.appspot.com",
    messagingSenderId: "793318234525",
    appId: "1:793318234525:web:1db9dec4899d22b475f774"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

var StorageService = {
    storage: getStorage(app),

    /// StorageService.upload('test', event.currentTarget.files);
    /// Can Send object of file or objects of files
    upload: async function (path, object) {
        console.log("uploading file")
        var results = [];
        if (object instanceof FileList) {
            for (const key in object) {
                var file = object[key];
                var _storageRef = new ref(this.storage, (path ? (path + '/') : '') + file.name);
                var _uploadTask = await uploadBytes(_storageRef, file);
                var _downloadUrl = await getDownloadURL(_uploadTask.ref)
                results.push(_downloadUrl);
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

    get: async function (col, id) {
        var collectionRef = collection(this.database, col);
        if (id) {
            var docRef = doc(this.database, col, id)
            var snapshot = await getDoc(docRef)
            return {
                ...snapshot.data(),
                id: snapshot.id
            }
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
        await addDoc(collectionRef, data);
    },

    // DatabaseService.update('test','EEujUPFb9QJbfZMf0DkP', {
    //   name: 'kunal',
    //   address: "ahmedabad",
    //   age: 21
    // })
    update: async function (col, id, data) {
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
