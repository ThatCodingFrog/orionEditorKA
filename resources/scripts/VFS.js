class VFS {
    /**
     * Creates a new Virtual File System in IndexedDB
     * @param {string} directory
     */
    constructor(directory = "userFiles") {
        this.request = indexedDB.open("orionVFS", 1);

        this.directory = directory;

        this.request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("editorFiles")) {
                db.createObjectStore("editorFiles", {
                    keyPath: "filename"
                });
            }
            if (!db.objectStoreNames.contains("userFiles")) {
                db.createObjectStore("userFiles", {
                    keyPath: "filename"
                });
            }
            if (!db.objectStoreNames.contains(this.directory)) {
                db.createObjectStore(this.directory, {
                    keyPath: "filename"
                });
            }
        }

        this.request.onerror = () => { throw new Error(`Database error: ${this.request.error}`) };
    }


    /**
     * Creates a new file in the IndexedDB Virtual File System
     * @param {string} p_filename
     * @param {string} p_fileExtension
     */
    createFile(p_filename, p_fileExtension) {
        this.request.onsuccess = (event) => {
            const db = event.target.result;

            const transaction = db.transaction(this.directory, "readwrite");
            const store = transaction.objectStore(this.directory);

            const file = {
                filename: p_filename + "." + p_fileExtension, //required for keyPath
                contents: ""
            };

            const createRequest = store.add(file);

            createRequest.onsuccess = () => { console.log("File created successfully"); alert("File created successfully"); }
            createRequest.onerror = () => { throw new Error(`Error creating new file: ${createRequest.error}`); }

            transaction.oncomplete = () => {
                db.close();
            }
        }
    }


    /**
     * Deletes a file from the IndexedDB Virtual File System
     * @param {string} filename
     */
    deleteFile(filename) {
        
    }


    /**
     * Reads a file from the IndexedDB Virtual File System
     * @param {string} file
     * @return {string} The contents of the file
     */
    static readFile(file) {
        let returnVal = "";
        this.request.onsuccess = (event) => {
            const db = event.target.result;

            const transaction = db.transaction(this.directory, "readonly");
            const store = transaction.objectStore(this.directory);

            const readRequest = store.get(file);

            readRequest.onsuccess = () => {
                console.log(`File read successfully: ${file}`);
                console.log(readRequest.result.contents);
                returnVal = readRequest.result.contents;
            }
            readRequest.onerror = () => { throw new Error(`Error reading file: ${readRequest.error}`); }

            transaction.oncomplete = () => {
                db.close();
            }
        }
        return returnVal;
    }


    /**
     * Writes to a file in the IndexedDB Virtual File System
     * @param {string} file
     * @param {string} _data
     */
    writeFile(file, _data) {
        this.request.onsuccess = (event) => {
            const db = event.target.result;

            const transaction = db.transaction(this.directory, "readwrite");
            const store = transaction.objectStore(this.directory);

            const data = {
                filename: file,
                contents: _data
            };

            const writeRequest = store.put(data);

            writeRequest.onsuccess = () => { console.log(`File written successfully: ${file}`); }
            writeRequest.onerror = () => { throw new Error(`Error writing to file: ${writeRequest.error}`); }

            transaction.oncomplete = () => {
                db.close();
            }
        }
    }


    /**
     * Returns a URL to access the file for links
     * @param {string} file
     * @return {url} The URL created from Blob of file contents
     */
    getFileURL(file) {
        const url = URL.createObjectURL(new Blob([]));
        return url;
    }
}
