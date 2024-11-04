function generateRandomId(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function deleteElementById(obj, id) {
    const newObj = { ...obj };
    const idsToDelete = new Set();

    function findChildren(parentId) {
        for (const key in newObj) {
            if (newObj[key].parentId === parentId) {
                idsToDelete.add(key);
                findChildren(key);
            }
        }
    }

    findChildren(id);
    idsToDelete.add(id);

    idsToDelete.forEach(id => {
        delete newObj[id];
    });

    return newObj;
}

function appendElementById(arr, id, newElement) {
    function recursiveAppend(arr) {
        for (let item of arr) {
          console.log(item)
            if (item.id === id) {
                if (!Array.isArray(item.value)) {
                    item.value = [];
                }
                item.value.push(newElement);
                return true;
            }
            if (item.value && recursiveAppend(item.value)) {
                return true;
            }
        }
        return false;
    }
    
    recursiveAppend(arr);
}

export { generateRandomId, deleteElementById, appendElementById }