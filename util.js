function getRandomValue(array){

}

function anyTask(){
    const ms = getRandomValue([100, 200, 3000]);
    const shouldThrowError = getRandomValue([1, 2, 3, 4]) === 4;
    if(shouldThrowError){
        const randomError = getRandomValue([
            "DB payment failure",
            "Access Denied"
        ]);

        throw new Error(randomError);

    }
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(ms), ms); // Resolve with `ms` after `ms` milliseconds
    });

}

module.exports = {anyTask};