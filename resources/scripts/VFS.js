//Assisted by ChatGPT to understand how to build it so it reuses
//the onsuccess result rather than trying to reset onsuccess each time
//Because I'm still learning

class VFS {
    /**
     * Creates a new Virtual File System in IndexedDB
     * @param {string} directory
     */
    constructor(directory = "userFiles") {
        this.request = indexedDB.open("orionVFS", 1);

        this.directory = directory;
        this.db = null;


        this.request.onupgradeneeded = (event) => {
            const db = event.target.result;

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

        this.request.onsuccess = (event) => {
            this.db = event.target.result;
            console.log(`File system open and ready: ${this.directory}`);
        }

        this.request.onerror = () => { throw new Error(`Database error: ${this.request.error}`) };
    }


    /**
     * Creates a new file in the IndexedDB Virtual File System
     * @param {string} p_filename
     * @param {string} p_fileExtension
     */
    createFile(p_filename, p_fileExtension) {
        const db = this.db;

        const transaction = db.transaction(this.directory, "readwrite");
        const store = transaction.objectStore(this.directory);

        const file = {
            filename: p_filename + "." + p_fileExtension, //required for keyPath
            contents: ""
        };

        const createRequest = store.add(file);

        createRequest.onsuccess = () => { console.log("File created successfully"); alert("File created successfully"); }
        createRequest.onerror = () => { throw new Error(`Error creating new file: ${createRequest.error}`); }
    }


    /**
     * Deletes a file from the IndexedDB Virtual File System
     * @param {string} filename
     */
    deleteFile(filename) {
        const db = this.db;
    }


    /**
     * Reads a file from the IndexedDB Virtual File System (private method)
     * @param {string} file
     * @return {Promise<string>} The contents of the file
     */

    //function corrected by AI
    async #read(file) {
            return new Promise((resolve, reject) => {
                const db = this.db;

                const transaction = db.transaction(this.directory, "readonly");
                const store = transaction.objectStore(this.directory);

                const readRequest = store.get(file);

                readRequest.onsuccess = () => {
                    console.log(`File read successfully: ${file}`);
                    resolve(readRequest.result.contents);
                }
                readRequest.onerror = () => { reject(new Error(`Error reading file: ${readRequest.error}`)); }
            });
    }

    /**
     * Also assisted by AI (my use of Promises wasn't quite correct before)
     * Publicly accessible method to read from a file
     * @param {string} file
     * @returns {string} The contents of the file (when awaited)
     */
    async readFile(file) {
        try {
            const content = await this.#read(file);
            console.log("readFile", content);
            return content;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Writes to a file in the IndexedDB Virtual File System
     * @param {string} file
     * @param {string} _data
     */
    writeFile(file, _data) {
        const db = this.db;

        const transaction = db.transaction(this.directory, "readwrite");
        const store = transaction.objectStore(this.directory);

        const data = {
            filename: file,
            contents: _data
        };

        const writeRequest = store.put(data);

        writeRequest.onsuccess = () => { console.log(`File written successfully: ${file}`); }
        writeRequest.onerror = () => { throw new Error(`Error writing to file: ${writeRequest.error}`); }
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

    /**
     * Gets all files in the current directory (defined by this.directory)
     */
    getAllFiles() {
        return new Promise((resolve, reject) => {
            const db = this.db;

            const transaction = db.transaction(this.directory, "readonly");
            const store = transaction.objectStore(this.directory);

            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                console.log("Entries", getAllRequest.result);
                resolve(getAllRequest.result);
            }
        });

        //return getAllRequest;
    }
}
