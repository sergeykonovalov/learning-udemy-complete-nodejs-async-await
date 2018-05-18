const users = [{
    id: 1,
    name: 'Sergey',
    schoolId: 101
}, {
    id: 2,
    name: 'Olga',
    schoolId: 301
}, {
    id: 3,
    name: 'Roman',
    schoolId: 201
}];

const grades = [{
    id: 1,
    schoolId: 101,
    points: 86
}, {
    id: 2,
    schoolId: 201,
    points: 99
}, {
    id: 3,
    schoolId: 101,
    points: 100
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    })
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => {
            return grade.schoolId === schoolId;
        }))
    });

};

getUser(1).then((user) => {
    console.log(user.name);
}).catch((e) => {
    console.log(e);
});

getGrades(101).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
})

const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.points).reduce((a, b) => a + b / grades.length);
        }
        return `${user.name} has an average of ${average} in the class`;
    });
};

getStatus(1).then((message) => console.log(message)).catch((e) => console.log(e));

// () => {
//     return new Promise((reject, resolve) => {
//         resolve('Roma');
//     });
// };

// NOTE: Async function returns a Promise!

const getFancyName = async () => {
    return 'Roma';
    // OR
    // throw new Error('This error equivalent to rejection of the Promise');
};

getFancyName().then((name) => {
    console.log(name);
}).catch((e) => {
    console.log(e);
});

let name = await getFancyName();
console.log(name);

const getStatusAlt2 = async (userId) => {
    const user = await getUser(userId);
    // ^^^ if Promise is rejected, returned value is undefined
}

// IMPORTANT: You have to use await inside of async function!