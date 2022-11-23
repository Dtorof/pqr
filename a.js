
const limit = 10
const generatePlaces = value => {
    const arr1 = [...Array( value + 1 ).keys()].slice(1);
    return arr1
}

const fig = arr => arr.map((el,i) => ({
    id: i + 1, state: 'available'})
    )

    const limitN = num => {
        if(num > 260){
            return console.log('Capacity not allowed');
        } else {
            return num
        }
    }

let char = String.fromCharCode(position= 65);
